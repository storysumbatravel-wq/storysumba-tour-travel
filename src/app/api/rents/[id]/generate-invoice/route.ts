import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRentInvoiceNumber } from "@/lib/invoice-number";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    // ✅ WAJIB await params di Next 15
    const { id } = await context.params;

    // Cari booking berdasarkan ID
    const booking = await prisma.rentBooking.findUnique({
      where: { id },
      include: { car: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    let invoiceNumber = booking.invoiceNumber;

    // Jika belum ada invoice number, generate baru
    if (!invoiceNumber) {
      invoiceNumber = await generateRentInvoiceNumber();
    }

    // Update booking
    const updatedBooking = await prisma.rentBooking.update({
      where: { id },
      data: {
        status: "CONFIRMED",
        invoiceNumber,
      },
      include: { car: true },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("GENERATE INVOICE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 },
    );
  }
}
