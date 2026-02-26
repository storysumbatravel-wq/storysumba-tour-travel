import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/* ======================
   GET BOOKING BY ID
====================== */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    // ✅ Next.js 15 wajib await params
    const { id } = await context.params;

    const booking = await prisma.rentBooking.findUnique({
      where: { id },
      include: {
        car: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("GET BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 },
    );
  }
}

/* ======================
   DELETE BOOKING
====================== */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    await prisma.rentBooking.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BOOKING ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 },
    );
  }
}
