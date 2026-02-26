export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import PublicBookingForm from "./BookingForm";
import { Check, X } from "lucide-react";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const pkg = await prisma.package.findUnique({
    where: { slug },
    include: {
      options: {
        orderBy: { pax: "asc" },
      },
    },
  });

  if (!pkg) return notFound();

  const lowestPrice = pkg.options.length > 0 ? pkg.options[0].pricePerPax : 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* HERO PREMIUM */}
      <div className="relative h-[55vh] w-full">
        <Image
          src={pkg.imageUrl}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12 px-4 text-white">
            <p className="text-sm uppercase tracking-[3px] text-amber-400 font-semibold">
              {pkg.durationText ??
                `${pkg.duration} ${pkg.duration > 1 ? "Days" : "Day"}`}
            </p>

            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-3 max-w-3xl leading-tight">
              {pkg.title}
            </h1>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container py-16 px-4 grid lg:grid-cols-3 gap-12">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-10 border border-slate-100">
            <h2 className="font-serif text-2xl font-bold mb-6">
              About This Trip
            </h2>
            <p className="whitespace-pre-line text-slate-600 leading-relaxed text-[15px]">
              {pkg.description}
            </p>
          </div>

          {/* Itinerary */}
          {pkg.itinerary && (
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-10 border border-slate-100">
              <h2 className="font-serif text-2xl font-bold mb-6">
                Trip Itinerary
              </h2>
              <div className="whitespace-pre-line text-slate-600 leading-relaxed text-[15px]">
                {pkg.itinerary}
              </div>
            </div>
          )}

          {/* Include & Exclude */}
          {(pkg.include || pkg.exclude) && (
            <div className="grid md:grid-cols-2 gap-8">
              {pkg.include && (
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 bg-emerald-100 rounded-full">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">
                      Included
                    </h3>
                  </div>
                  <div className="whitespace-pre-line text-sm text-slate-600 leading-relaxed">
                    {pkg.include}
                  </div>
                </div>
              )}

              {pkg.exclude && (
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 border border-slate-100">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 bg-rose-100 rounded-full">
                      <X className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">
                      Excluded
                    </h3>
                  </div>
                  <div className="whitespace-pre-line text-sm text-slate-600 leading-relaxed">
                    {pkg.exclude}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT BOOKING CARD */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
            <div className="mb-8">
              <p className="text-slate-500 text-sm">Starting from</p>
              <p className="text-4xl font-bold text-slate-900 mt-1">
                Rp {lowestPrice.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-slate-400 mt-1">per person</p>
            </div>

            <PublicBookingForm
              packageId={pkg.id}
              options={pkg.options}
              title={pkg.title}
            />

            <p className="text-xs text-slate-400 mt-6 text-center">
              Final price will be confirmed after booking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
