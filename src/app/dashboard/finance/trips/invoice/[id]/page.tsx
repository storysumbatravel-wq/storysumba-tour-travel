"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { generateTripInvoice } from "@/lib/pdf";
import { FileDown, MessageCircle, Plane, Phone } from "lucide-react";

// Definisikan tipe data
type BookingDetail = {
  id: string;
  customerName: string;
  phone: string;
  packageName: string;
  startDate: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function InvoicePage() {
  const params = useParams();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null); // Ref untuk menangkap area HTML

  useEffect(() => {
    fetch(`/api/trips/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBooking({
          ...data,
          status: data.status || "PENDING",
          createdAt: data.createdAt || new Date().toISOString(),
        });
      });
  }, [params.id]);

  // Fungsi Download PDF menggunakan html2canvas (DENGAN FIX ERROR LAB & TYPESCRIPT)
  const handleDownload = () => {
    if (!booking) return;
    // Panggil fungsi dari lib/pdf.ts
    const doc = generateTripInvoice(booking);
    doc.save(`invoice-${booking.id}.pdf`);
  };

  const handleWhatsapp = () => {
    if (!booking) return;

    // 1. Generate & Download PDF otomatis
    const doc = generateTripInvoice(booking);
    doc.save(`invoice-${booking.id}.pdf`);

    // 2. Siapkan pesan dan buka WhatsApp
    const text = `Halo ${booking.customerName}, berikut saya lampirkan Invoice perjalanan Anda.\n\nTotal: Rp ${booking.totalAmount.toLocaleString("id-ID")}\nStatus: ${booking.status}\n\nMohon konfirmasi kembali. Terima kasih telah memilih LuxeVoyage.`;

    // 3. Format Nomor Telepon (Auto convert 08xx -> 628xx)
    let phone = booking.phone.replace(/[^0-9]/g, ""); // Hapus karakter non-digit
    if (phone.startsWith("081246994982")) {
      phone = "62" + phone.substring(1); // Ganti 08 jadi 628
    }

    // 4. Buka Tab WhatsApp
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
    );

    // Note: Admin perlu melampirkan file PDF yang baru terdownload secara manual ke chat yang terbuka.
  };

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  const invoiceDate = new Date(booking.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dueDate = new Date(booking.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4">
      {/* Container Utama - maxWidth disesuaikan agar mirip kertas A4 proporsional */}
      <div
        ref={invoiceRef}
        className="max-w-200 mx-auto bg-white shadow-2xl border border-stone-200 rounded-none overflow-hidden"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-8 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-sm">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight">
                LuxeVoyage
              </h1>
              <p className="text-stone-400 text-xs">Luxury Travel Agency</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="font-serif text-4xl font-bold text-primary">
              INVOICE
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              #{booking.id.substring(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Status Badge & Actions */}
        {/* Tambahkan class 'action-buttons' untuk disembunyikan saat download */}
        <div className="action-buttons bg-stone-50 border-b px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone-500">Status:</span>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                booking.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "CANCEL"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleWhatsapp}
              variant="outline"
              className="gap-2 text-green-600 border-green-600 hover:bg-green-50"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button
              onClick={handleDownload}
              className="gap-2 bg-stone-900 hover:bg-stone-800"
            >
              <FileDown className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12">
          {/* Bill To & Dates Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                Bill To
              </h3>
              <p className="font-serif text-xl font-semibold text-stone-900">
                {booking.customerName}
              </p>
              <p className="text-stone-600 flex items-center gap-2 mt-1">
                <Phone className="h-3 w-3" /> {booking.phone}
              </p>
            </div>
            <div className="md:text-right">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
                Details
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between md:justify-end gap-4">
                  <span className="text-stone-500">Invoice Date:</span>
                  <span className="font-medium text-stone-800">
                    {invoiceDate}
                  </span>
                </div>
                <div className="flex justify-between md:justify-end gap-4">
                  <span className="text-stone-500">Trip Date:</span>
                  <span className="font-medium text-stone-800">{dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-stone-200 rounded-sm overflow-hidden mb-10">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="px-6 py-6">
                    <p className="font-semibold text-stone-900">
                      {booking.packageName}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Travel Package
                    </p>
                  </td>
                  <td className="px-6 py-6 text-right font-medium text-stone-800">
                    Rp {booking.totalAmount.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="flex justify-end mb-12">
            <div className="bg-stone-900 text-white p-6 rounded-sm w-full md:w-1/2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-stone-300 text-sm">Subtotal</span>
                <span>Rp {booking.totalAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-stone-300 text-sm">Tax & Fees</span>
                <span>Rp 0</span>
              </div>
              <div className="border-t border-stone-700 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Grand Total</span>
                <span className="font-bold text-2xl text-primary">
                  Rp {booking.totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="border-t border-stone-200 pt-8 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-stone-900 mb-2">
                Payment Instructions
              </h4>
              <p className="text-sm text-stone-600">
                Please transfer payment to Bank Central Asia (BCA)
                <br />
                Account Number: 123-456-7890
                <br />
                Account Name: LuxeVoyage Official
              </p>
            </div>
            <div className="md:text-right">
              <h4 className="font-semibold text-stone-900 mb-2">Need Help?</h4>
              <p className="text-sm text-stone-600">
                <a
                  href="mailto:billing@luxevoyage.com"
                  className="text-primary hover:underline"
                >
                  billing@luxevoyage.com
                </a>
                <br />
                +62 21 1234 5678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
