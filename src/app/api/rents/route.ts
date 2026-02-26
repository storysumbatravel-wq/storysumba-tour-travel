import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/* ======================
   GET: Ambil Semua Rent Booking
   Endpoint: /api/rents
====================== */
export async function GET() {
  try {
    const rents = await prisma.rentBooking.findMany({
      include: {
        car: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rents);
  } catch (error) {
    console.error("GET RENTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch rent bookings" },
      { status: 500 },
    );
  }
}

/* ======================
   POST: Tambah Rent Booking Baru
   Endpoint: /api/rents
====================== */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, startDate, duration, carId } = body;

    // Validasi basic
    if (!customerName || !phone || !startDate || !duration || !carId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Ambil data mobil
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const totalAmount = car.pricePerDay * Number(duration);

    const newRent = await prisma.rentBooking.create({
      data: {
        customerName,
        phone,
        startDate: new Date(startDate),
        duration: Number(duration),
        totalAmount,
        status: "PENDING", // default status
        carId,
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json(newRent, { status: 201 });
  } catch (error) {
    console.error("CREATE RENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create rent booking" },
      { status: 500 },
    );
  }
}
