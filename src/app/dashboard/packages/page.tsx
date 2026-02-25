import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";

export default async function DashboardPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      options: {
        orderBy: { pax: "asc" },
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900">
            Packages
          </h2>
          <p className="text-muted-foreground">
            Manage your travel packages here.
          </p>
        </div>

        <Link href="/dashboard/packages/add">
          <Button className="bg-primary hover:bg-primary/90 text-white gap-1">
            <Plus className="h-4 w-4" /> Add Package
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-stone-50 hover:bg-stone-50">
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Starting Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {packages.map((pkg) => {
              const lowestOption =
                pkg.options.length > 0 ? pkg.options[0] : null;

              return (
                <TableRow key={pkg.id}>
                  {/* Image */}
                  <TableCell>
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-stone-100">
                      {pkg.imageUrl ? (
                        <Image
                          src={pkg.imageUrl}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-stone-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-medium">{pkg.title}</TableCell>

                  {/* Duration */}
                  <TableCell>{pkg.duration}</TableCell>

                  {/* Price */}
                  <TableCell>
                    {lowestOption ? (
                      <div>
                        <div className="font-semibold">
                          Rp {lowestOption.pricePerPax.toLocaleString("id-ID")}
                        </div>
                        <div className="text-xs text-stone-500">
                          {lowestOption.pax} Pax
                        </div>
                      </div>
                    ) : (
                      <span className="text-stone-400 text-xs">
                        No Price Set
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/packages/edit/${pkg.id}`}
                            className="w-full"
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                          <form
                            action={`/api/packages/delete/${pkg.id}`}
                            method="POST"
                            className="w-full"
                          >
                            <button type="submit" className="w-full text-left">
                              Delete
                            </button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}

            {packages.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-stone-500"
                >
                  No packages found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
