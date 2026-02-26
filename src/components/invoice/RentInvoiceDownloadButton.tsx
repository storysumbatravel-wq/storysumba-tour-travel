"use client";

import { Button } from "@/components/ui/button";
import { generateRentCarInvoice } from "@/lib/pdf";
import { useState } from "react";

interface RentInvoiceBooking {
  id: string;
  customerName: string;
  phone: string;
  startDate: Date | string;
  duration: number;
  totalAmount: number;
  status: string;
  createdAt: Date | string;
  invoiceNumber?: string | null;
  car: {
    name: string;
    pricePerDay: number;
  };
}

interface Props {
  booking: RentInvoiceBooking;
}

export default function RentInvoiceDownloadButton({ booking }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      // 🔥 Generate / confirm invoice number dari server
      const res = await fetch(`/api/rents/${booking.id}/generate-invoice`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to generate invoice");
      }

      const updated: RentInvoiceBooking = await res.json();

      // Gunakan invoice number dari server atau fallback
      const invoiceNumber =
        updated.invoiceNumber ??
        `RC-${updated.id.substring(0, 8).toUpperCase()}`;

      // Generate PDF
      const doc = generateRentCarInvoice(updated);
      doc.save(`Invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error("DOWNLOAD INVOICE ERROR:", error);
      alert("Failed to generate invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="bg-amber-500 hover:bg-amber-600 text-white"
    >
      {loading ? "Processing..." : "Download PDF"}
    </Button>
  );
}
