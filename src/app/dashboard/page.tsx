import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, DollarSign, Car } from "lucide-react";

export default async function DashboardPage() {
  // Ambil data statistik dari database
  const packageCount = await prisma.package.count();
  const blogCount = await prisma.blog.count();
  const tripCount = await prisma.tripBooking.count();
  const rentCount = await prisma.rentBooking.count();

  return (
    <div className="space-y-8 ">
      <div>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome back! Here is a summary of your business.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card Total Packages */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">
              Total Packages
            </CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">
              {packageCount}
            </div>
          </CardContent>
        </Card>

        {/* Card Total Blogs */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">
              Total Blogs
            </CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">{blogCount}</div>
          </CardContent>
        </Card>

        {/* Card Trip Bookings */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">
              Trip Bookings
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">{tripCount}</div>
          </CardContent>
        </Card>

        {/* Card Rent Cars */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-stone-600">
              Rent Car Bookings
            </CardTitle>
            <Car className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-stone-900">{rentCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
        <h3 className="font-serif text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <a
            href="/dashboard/packages/add"
            className="text-primary hover:underline text-sm"
          >
            + Add New Package
          </a>
          <a
            href="/dashboard/blogs/add"
            className="text-primary hover:underline text-sm"
          >
            + Write New Blog
          </a>
        </div>
      </div>
    </div>
  );
}
