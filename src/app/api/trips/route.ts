import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      phone,
      startDate,
      pax,
      pricePerPax,
      totalAmount,
      packageId,
    } = body;

    if (
      !customerName ||
      !phone ||
      !startDate ||
      !pax ||
      !pricePerPax ||
      !totalAmount ||
      !packageId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newTrip = await prisma.tripBooking.create({
      data: {
        customerName,
        phone,
        startDate: new Date(startDate),
        pax: Number(pax),
        pricePerPax: Number(pricePerPax),
        totalAmount: Number(totalAmount),
        totalCost: Number(totalAmount), // 🔥 WAJIB
        packageId,
      },
    });

    return NextResponse.json(newTrip);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create trip booking" },
      { status: 500 },
    );
  }
}
