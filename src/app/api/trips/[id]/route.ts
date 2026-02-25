import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET Single Trip by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await params sebelum digunakan
    const { id } = await params;

    const trip = await prisma.tripBooking.findUnique({
      where: { id },
      include: { package: true },
    });

    if (!trip) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const result = {
      ...trip,
      packageName: trip.packageName || trip.package?.title || "Custom Package",
      startDate: trip.startDate.toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch trip" },
      { status: 500 },
    );
  }
}

// UPDATE Status Trip
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // Await params
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["PENDING", "PAID", "CANCEL"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedTrip = await prisma.tripBooking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTrip);
  } catch {
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 },
    );
  }
}

// DELETE Trip
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // Await params

    await prisma.tripBooking.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Trip deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete trip" },
      { status: 500 },
    );
  }
}
