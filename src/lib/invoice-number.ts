import { prisma } from "@/lib/db";

export async function generateRentInvoiceNumber() {
  const year = new Date().getFullYear();

  const count = await prisma.rentBooking.count({
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
      invoiceNumber: {
        not: null,
      },
    },
  });

  const nextNumber = (count + 1).toString().padStart(4, "0");

  return `RC-${year}-${nextNumber}`;
}
