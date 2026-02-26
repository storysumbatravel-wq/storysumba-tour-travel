import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function PublicPackages() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      options: {
        orderBy: { pricePerPax: "asc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-white text-stone-800">
      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/placeholder.jpg"
          alt="Luxury travel packages"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative z-10 text-white px-6 max-w-3xl space-y-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            Travel Packages
          </h1>
          <p className="text-lg text-white/80">
            Curated journeys crafted for unforgettable experiences.
          </p>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="container py-24 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {packages.map((pkg) => {
            const lowestPrice =
              pkg.options.length > 0 ? pkg.options[0].pricePerPax : 0;

            return (
              <Card
                key={pkg.id}
                className="group overflow-hidden border-none shadow-md hover:shadow-2xl transition duration-500 rounded-3xl bg-white flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* Soft overlay hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
                </div>

                {/* Header */}
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-2xl group-hover:text-primary transition">
                    {pkg.title}
                  </CardTitle>

                  <CardDescription className="text-stone-500 text-sm tracking-wide">
                    {pkg.durationText
                      ? pkg.durationText
                      : `${pkg.duration} ${pkg.duration > 1 ? "Days" : "Day"}`}
                  </CardDescription>
                </CardHeader>

                {/* Description */}
                <CardContent className="flex-1">
                  <p className="text-stone-600 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-between items-center pt-4">
                  <div>
                    {lowestPrice > 0 ? (
                      <>
                        <span className="text-xs text-stone-400 block">
                          Starting from
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          Rp {lowestPrice.toLocaleString("id-ID")}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-semibold text-stone-400">
                        Contact Us
                      </span>
                    )}
                  </div>

                  <Link href={`/packages/${pkg.slug}`}>
                    <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-md">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
