// src/lib/pdf.ts

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ========================================
// TYPE DEFINITIONS
// ========================================

// Type for jsPDF with autoTable plugin
type jsPDFWithAutoTable = jsPDF & {
  lastAutoTable: {
    finalY: number;
  };
};

// Trip Booking Type
interface TripData {
  id: string;
  customerName: string;
  phone: string;
  packageName: string;
  startDate: Date | string;
  totalAmount: number;
  status: string;
  createdAt?: Date | string;
}

// Rent Car Booking Type
interface RentBookingDetail {
  id: string;
  customerName: string;
  phone: string;
  startDate: string | Date;
  duration: number;
  totalAmount: number;
  status: string;
  createdAt: string | Date;
  car: {
    name: string;
    pricePerDay: number;
  };
}

// ========================================
// TRIP INVOICE GENERATOR
// ========================================

export const generateTripInvoice = (data: TripData): jsPDF => {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Header Background
  doc.setFillColor(28, 25, 23); // Stone-900
  doc.rect(0, 0, pageWidth, 40, "F");

  // Logo Text
  doc.setTextColor(184, 134, 11); // Primary Gold
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Aurora Sumba", 14, 18);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.text("Tour & Travel", 14, 25);

  // Invoice Title
  doc.setTextColor(184, 134, 11);
  doc.setFontSize(22);
  doc.text("INVOICE", pageWidth - 14, 18, { align: "right" });

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(10);
  doc.text(`#${data.id.substring(0, 8).toUpperCase()}`, pageWidth - 14, 25, {
    align: "right",
  });

  // 2. Bill To & Dates
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);

  const startY = 55;

  // Left side
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 14, startY);
  doc.setFont("helvetica", "normal");
  doc.text(data.customerName, 14, startY + 6);
  doc.text(data.phone, 14, startY + 12);

  // Right side
  const dateStr = new Date(data.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const invDateStr = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("id-ID")
    : new Date().toLocaleDateString("id-ID");

  doc.setFont("helvetica", "bold");
  doc.text("INVOICE DATE:", pageWidth - 14, startY, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(invDateStr, pageWidth - 14, startY + 6, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.text("TRIP DATE:", pageWidth - 14, startY + 14, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(dateStr, pageWidth - 14, startY + 20, { align: "right" });

  // 3. Items Table
  autoTable(doc, {
    startY: startY + 35,
    head: [["Description", "Amount"]],
    body: [
      [data.packageName, `Rp ${data.totalAmount.toLocaleString("id-ID")}`],
    ],
    theme: "plain",
    styles: { fontSize: 11, cellPadding: 5 },
    headStyles: {
      fillColor: [245, 245, 244],
      textColor: [120, 113, 108],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { halign: "right" },
    },
  });

  // 4. Total Section
  const finalY = doc.lastAutoTable?.finalY || 100;

  doc.setFillColor(28, 25, 23);
  doc.roundedRect(pageWidth - 80, finalY + 10, 66, 30, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Grand Total", pageWidth - 76, finalY + 18);

  doc.setTextColor(184, 134, 11);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Rp ${data.totalAmount.toLocaleString("id-ID")}`,
    pageWidth - 76,
    finalY + 32,
  );

  // 5. Footer Info
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Instructions:", 14, finalY + 20);
  doc.setFont("helvetica", "normal");
  doc.text("Bank Central Asia (BCA) - 123-456-7890", 14, finalY + 26);
  doc.text("a.n Aurora Sumba Tour & Travel", 14, finalY + 31);

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Aurora Sumba Tour & Travel", 14, doc.internal.pageSize.height - 10);
  doc.text(
    "Thank you for your business",
    pageWidth - 14,
    doc.internal.pageSize.height - 10,
    { align: "right" },
  );

  return doc;
};

// ========================================
// RENT CAR INVOICE GENERATOR (PREMIUM)
// ========================================

export function generateRentCarInvoice(booking: RentBookingDetail): jsPDF {
  const doc = new jsPDF() as jsPDFWithAutoTable;
  const pageWidth = doc.internal.pageSize.getWidth();

  // ========================================
  // HEADER (Same style as Trip)
  // ========================================

  doc.setFillColor(28, 25, 23); // stone-900
  doc.rect(0, 0, pageWidth, 40, "F");

  // Logo text
  doc.setTextColor(184, 134, 11); // gold
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Aurora Sumba", 14, 18);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.text("Tour & Travel", 14, 25);

  // Invoice title
  doc.setTextColor(184, 134, 11);
  doc.setFontSize(22);
  doc.text("INVOICE", pageWidth - 14, 18, { align: "right" });

  const invoiceNumber = `RC-${booking.id.substring(0, 8).toUpperCase()}`;

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(10);
  doc.text(invoiceNumber, pageWidth - 14, 25, {
    align: "right",
  });

  // ========================================
  // BILL TO & DATES
  // ========================================

  const startY = 55;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);

  // Left
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 14, startY);

  doc.setFont("helvetica", "normal");
  doc.text(booking.customerName, 14, startY + 6);
  doc.text(booking.phone, 14, startY + 12);

  // Right
  const rentalDate = new Date(booking.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const invoiceDate = new Date(booking.createdAt).toLocaleDateString("id-ID");

  doc.setFont("helvetica", "bold");
  doc.text("INVOICE DATE:", pageWidth - 14, startY, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.text(invoiceDate, pageWidth - 14, startY + 6, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.text("RENTAL DATE:", pageWidth - 14, startY + 14, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.text(rentalDate, pageWidth - 14, startY + 20, {
    align: "right",
  });

  // ========================================
  // ITEMS TABLE
  // ========================================

  autoTable(doc, {
    startY: startY + 35,
    head: [["Description", "Days", "Price/Day", "Amount"]],
    body: [
      [
        booking.car.name,
        `${booking.duration} Day(s)`,
        `Rp ${booking.car.pricePerDay.toLocaleString("id-ID")}`,
        `Rp ${booking.totalAmount.toLocaleString("id-ID")}`,
      ],
    ],
    theme: "plain",
    styles: { fontSize: 11, cellPadding: 5 },
    headStyles: {
      fillColor: [245, 245, 244],
      textColor: [120, 113, 108],
      fontStyle: "bold",
    },
    columnStyles: {
      3: { halign: "right" },
    },
  });

  const finalY = doc.lastAutoTable?.finalY || 100;

  // ========================================
  // TOTAL BOX (Luxury Style)
  // ========================================

  doc.setFillColor(28, 25, 23);
  doc.roundedRect(pageWidth - 90, finalY + 15, 76, 32, 3, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Grand Total", pageWidth - 86, finalY + 23);

  doc.setTextColor(184, 134, 11);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(
    `Rp ${booking.totalAmount.toLocaleString("id-ID")}`,
    pageWidth - 86,
    finalY + 37,
  );

  // ========================================
  // PAYMENT INFO
  // ========================================

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Instructions:", 14, finalY + 25);

  doc.setFont("helvetica", "normal");
  doc.text("Bank Central Asia (BCA) - 123-456-7890", 14, finalY + 31);
  doc.text("a.n Aurora Sumba Tour & Travel", 14, finalY + 36);

  // ========================================
  // FOOTER
  // ========================================

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Aurora Sumba Tour & Travel", 14, doc.internal.pageSize.height - 10);

  doc.text(
    "Thank you for your business",
    pageWidth - 14,
    doc.internal.pageSize.height - 10,
    { align: "right" },
  );

  return doc;
}
