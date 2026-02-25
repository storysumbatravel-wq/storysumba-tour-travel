import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Plane, Car, Wallet } from "lucide-react";

export default async function ReportsPage() {
  const trips = await prisma.tripBooking.findMany({
    include: {
      package: true,
    },
  });

  const rents = await prisma.rentBooking.findMany();

  const tripRevenue = trips.reduce((sum, t) => sum + t.totalAmount, 0);
  const tripCost = trips.reduce((sum, t) => sum + (t.totalCost ?? 0), 0);
  const tripProfit = tripRevenue - tripCost;

  const rentRevenue = rents.reduce((sum, r) => sum + r.totalAmount, 0);

  const totalRevenue = tripRevenue + rentRevenue;

  const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Financial Reports</h2>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <Wallet className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {formatRupiah(totalRevenue)}
          </CardContent>
        </Card>

        {/* Trip Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Trip Revenue</CardTitle>
            <Plane className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatRupiah(tripRevenue)}
          </CardContent>
        </Card>

        {/* Trip Profit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Trip Profit</CardTitle>
            <DollarSign className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent
            className={`text-2xl font-semibold ${
              tripProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatRupiah(tripProfit)}
          </CardContent>
        </Card>

        {/* Rent Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Rent Revenue</CardTitle>
            <Car className="w-5 h-5 text-orange-500" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatRupiah(rentRevenue)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
