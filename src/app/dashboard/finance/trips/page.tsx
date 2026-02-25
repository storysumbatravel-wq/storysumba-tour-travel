import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell, // Tambahkan import ini
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TripTableRow from "./TripTableRow"; // Import komponen client

export default async function ListTrips() {
  const trips = await prisma.tripBooking.findMany({
    include: { package: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl font-bold">Trip Bookings</h2>
        <Link href="/dashboard/finance/trips/add">
          <Button className="bg-primary text-white">Manual Booking</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-stone-50">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.map((trip) => (
              <TripTableRow key={trip.id} trip={trip} />
            ))}
            {trips.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-stone-500"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
