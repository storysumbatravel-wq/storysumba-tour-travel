// src/app/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Crown, ShieldCheck, Star } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function HomePage() {
  const featuredPackages = await prisma.package.findMany({
    where: { isHighlighted: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero1.jpg"
          alt="Luxury travel destination"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 text-center text-white px-6 space-y-8 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Curated Luxury <br /> Travel Experiences
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Exclusive journeys crafted with elegance, comfort, and unforgettable
            moments.
          </p>

          <div className="flex justify-center gap-6 pt-6 flex-wrap">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg rounded-full shadow-lg"
              asChild
            >
              <Link href="/packages">Explore Packages</Link>
            </Button>

            {/* <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg rounded-full"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-28 px-6 md:px-16 bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Crafted For Discerning Travelers
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in premium travel experiences, delivering
              personalized adventures across the world. Every journey is
              thoughtfully curated to reflect sophistication and comfort.
            </p>

            <Button className="rounded-full px-8 py-5 shadow-md" asChild>
              <Link href="/about">Discover Our Story</Link>
            </Button>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about-1.jpg"
              alt="Beautiful beach"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Featured Experiences
          </h2>

          <p className="text-muted-foreground mb-16 text-lg">
            Handpicked luxury destinations crafted for extraordinary journeys.
          </p>

          {featuredPackages.length === 0 ? (
            <p className="text-muted-foreground">
              No featured packages available yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-12">
              {featuredPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition duration-500 rounded-3xl bg-white"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={pkg.imageUrl || "/images/placeholder.jpg"}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    <span className="absolute top-4 left-4 bg-primary text-white px-4 py-1 text-xs rounded-full shadow">
                      Featured
                    </span>
                  </div>

                  <CardContent className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold">{pkg.title}</h3>

                    <p className="text-muted-foreground line-clamp-2">
                      {pkg.description}
                    </p>

                    <Button
                      variant="link"
                      className="p-0 text-primary font-semibold"
                      asChild
                    >
                      <Link href={`/packages/${pkg.id}`}>View Details →</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-28 px-6 md:px-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16">
            Why Travel With Us
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[Crown, Plane, ShieldCheck, Star].map((Icon, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition space-y-4"
              >
                <Icon className="mx-auto w-10 h-10 text-primary" />
                <h4 className="text-xl font-semibold">
                  {
                    [
                      "Premium Service",
                      "Exclusive Destinations",
                      "Trusted & Secure",
                      "5-Star Experience",
                    ][i]
                  }
                </h4>
                <p className="text-muted-foreground text-sm">
                  {
                    [
                      "Personalized attention with refined standards.",
                      "Access to rare and extraordinary destinations.",
                      "Safe journeys with expert travel handling.",
                      "Rated excellence by our valued travelers.",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-36 px-6 text-center text-white overflow-hidden">
        <Image
          src="/images/hero2.jpg"
          alt="Luxury background"
          fill
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Ready For Your Next Journey?
          </h2>

          <p className="text-lg text-white/80">
            Let us design a seamless luxury experience tailored exclusively for
            you.
          </p>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 px-12 py-6 rounded-full text-lg shadow-xl"
            asChild
          >
            <Link href="/contact">Start Planning</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
