import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET: Ambil daftar mobil
export async function GET() {
  const cars = await prisma.car.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(cars);
}
