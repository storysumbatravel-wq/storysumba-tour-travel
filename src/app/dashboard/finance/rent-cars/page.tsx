import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ListRentCarsPage() {
  const rents = await prisma.rentBooking.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-3xl font-bold">Rent Car Bookings</h2>
        <Link href="/dashboard/finance/rent-cars/add">
          <Button className="bg-primary text-white">Add Rent Booking</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-stone-50">
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Car</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rents.map((rent) => (
              <TableRow key={rent.id}>
                <TableCell className="font-medium">
                  {rent.customerName}
                </TableCell>
                <TableCell>{rent.car.name}</TableCell>
                <TableCell>
                  {new Date(rent.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{rent.duration} Days</TableCell>
                <TableCell>
                  Rp {rent.totalAmount.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/dashboard/finance/rent-cars/invoice/${rent.id}`}
                  >
                    <Button size="sm" variant="outline">
                      Invoice
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
