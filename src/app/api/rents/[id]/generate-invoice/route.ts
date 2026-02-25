import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateRentInvoiceNumber } from "@/lib/invoice-number";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const booking = await prisma.rentBooking.findUnique({
    where: { id: params.id },
    include: { car: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  let invoiceNumber = booking.invoiceNumber;

  if (!invoiceNumber) {
    invoiceNumber = await generateRentInvoiceNumber();
  }

  const updated = await prisma.rentBooking.update({
    where: { id: params.id },
    data: {
      status: "CONFIRMED",
      invoiceNumber,
    },
    include: { car: true },
  });

  return NextResponse.json(updated);
}
