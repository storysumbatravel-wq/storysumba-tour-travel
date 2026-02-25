"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, Trash2 } from "lucide-react";

type Trip = {
  id: string;
  customerName: string;
  packageName: string;
  startDate: Date | string;
  status: string;
  totalAmount: number;
};

export default function TripTableRow({ trip }: { trip: Trip }) {
  const router = useRouter();
  const [status, setStatus] = useState(trip.status);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handler untuk Update Status
  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus); // Optimistic update

    try {
      await fetch(`/api/trips/${trip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      router.refresh(); // Refresh data di server component
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(trip.status); // Revert jika error
    }
  };

  // Handler untuk Delete
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setIsDeleting(true);
      try {
        await fetch(`/api/trips/${trip.id}`, { method: "DELETE" });
        router.refresh();
      } catch (error) {
        console.error("Failed to delete", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Warna badge status
  const statusColor =
    {
      PENDING: "text-yellow-600 bg-yellow-50",
      PAID: "text-green-600 bg-green-50",
      CANCEL: "text-red-600 bg-red-50",
    }[status] || "text-stone-600";

  return (
    <TableRow>
      <TableCell className="font-medium">{trip.customerName}</TableCell>
      <TableCell>{trip.packageName}</TableCell>
      <TableCell>
        {new Date(trip.startDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </TableCell>
      <TableCell>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-30 h-8 text-xs font-semibold border-none ${statusColor}`}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING" className="text-yellow-600">
              Pending
            </SelectItem>
            <SelectItem value="PAID" className="text-green-600">
              Paid
            </SelectItem>
            <SelectItem value="CANCEL" className="text-red-600">
              Cancel
            </SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="font-medium">
        Rp {trip.totalAmount.toLocaleString("id-ID")}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDeleting}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/dashboard/finance/trips/invoice/${trip.id}`}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" /> Invoice
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
