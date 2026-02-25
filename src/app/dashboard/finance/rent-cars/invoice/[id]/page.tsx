import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import RentInvoiceDownloadButton from "@/components/invoice/RentInvoiceDownloadButton";

interface Props {
  params: { id: string };
}

export default async function RentCarInvoicePage({ params }: Props) {
  const booking = await prisma.rentBooking.findUnique({
    where: { id: params.id },
    include: { car: true },
  });

  if (!booking) return notFound();

  const invoiceNumber = `RC-${booking.id.substring(0, 8).toUpperCase()}`;

  const rentalDate = new Date(booking.startDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const invoiceDate = new Date(booking.createdAt).toLocaleDateString("id-ID");

  return (
    <div className="max-w-5xl mx-auto p-8 bg-stone-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-xl border border-stone-200 overflow-hidden">
        {/* HEADER */}
        <div className="bg-stone-900 text-white p-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-500">
              Aurora Sumba
            </h1>
            <p className="text-stone-300 text-sm">Tour & Travel</p>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-bold text-amber-500">INVOICE</h2>
            <p className="text-stone-300 text-sm">{invoiceNumber}</p>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-10">
          {/* BILL TO & DATES */}
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-stone-500 font-semibold">BILL TO</p>
              <p className="text-lg font-semibold">{booking.customerName}</p>
              <p className="text-stone-500">{booking.phone}</p>
            </div>

            <div className="text-right space-y-2">
              <div>
                <p className="text-sm text-stone-500 font-semibold">
                  INVOICE DATE
                </p>
                <p>{invoiceDate}</p>
              </div>

              <div>
                <p className="text-sm text-stone-500 font-semibold">
                  RENTAL DATE
                </p>
                <p>{rentalDate}</p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-stone-100 text-stone-600">
                <tr>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Days</th>
                  <th className="text-left p-4">Price/Day</th>
                  <th className="text-right p-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-semibold">{booking.car.name}</td>
                  <td className="p-4">{booking.duration} Day(s)</td>
                  <td className="p-4">
                    Rp {booking.car.pricePerDay.toLocaleString("id-ID")}
                  </td>
                  <td className="p-4 text-right font-semibold">
                    Rp {booking.totalAmount.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div className="flex justify-end">
            <div className="bg-stone-900 text-white p-6 rounded-lg w-72">
              <p className="text-stone-400 text-sm">Grand Total</p>
              <p className="text-2xl font-bold text-amber-500">
                Rp {booking.totalAmount.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* PAYMENT INFO */}
          <div className="border-t pt-6">
            <p className="font-semibold mb-2">Payment Instructions</p>
            <p className="text-stone-600 text-sm">Bank Central Asia (BCA)</p>
            <p className="text-stone-600 text-sm">
              Account Number: 123-456-7890
            </p>
            <p className="text-stone-600 text-sm">
              Account Name: Aurora Sumba Tour & Travel
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <RentInvoiceDownloadButton
              booking={booking}
              invoiceNumber={invoiceNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
