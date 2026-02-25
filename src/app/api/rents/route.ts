import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: Ambil semua transaksi sewa
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const booking = await prisma.rentBooking.findUnique({
      where: { id },
      include: { car: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 },
    );
  }
}

// POST: Tambah sewa baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, startDate, duration, carId } = body;

    // Ambil harga mobil
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car)
      return NextResponse.json({ error: "Car not found" }, { status: 404 });

    const totalAmount = car.pricePerDay * Number(duration);

    const newRent = await prisma.rentBooking.create({
      data: {
        customerName,
        phone,
        startDate: new Date(startDate),
        duration: Number(duration),
        totalAmount,
        carId,
      },
    });

    return NextResponse.json(newRent);
  } catch {
    return NextResponse.json(
      { error: "Failed to create rent booking" },
      { status: 500 },
    );
  }
}
