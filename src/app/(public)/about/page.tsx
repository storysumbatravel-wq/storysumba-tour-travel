import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Gem, ShieldCheck, Headphones } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
          alt="Nature background"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            About LuxeVoyage
          </h1>
          <p className="mt-6 text-lg md:text-xl text-stone-200 leading-relaxed">
            Crafting unforgettable journeys with elegance, precision, and
            personalized luxury since 2015.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="container py-24 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6">
            <h2 className="font-serif text-4xl font-bold">
              Crafting Dreams Since 2015
            </h2>

            <Separator className="w-24 h-1 bg-primary rounded-full" />

            <p className="text-stone-600 leading-relaxed text-lg">
              LuxeVoyage was founded with a singular vision: to transform
              ordinary trips into extraordinary memories. Travel is not just
              movement — it is emotion, culture, and refined experience.
            </p>

            <p className="text-stone-600 leading-relaxed text-lg">
              Based in Indonesia, we curate seamless luxury travel experiences
              across the archipelago and beyond. Every detail is thoughtfully
              designed for comfort, safety, and unforgettable moments.
            </p>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-md"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-112.5 w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=2072&auto=format&fit=crop"
              alt="Planning travel"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="bg-linear-to-b from-stone-50 to-white py-24">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold">
              Why Choose LuxeVoyage
            </h2>
            <p className="text-stone-600 mt-4 text-lg">
              Excellence is not an option — it is our standard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* CARD 1 */}
            <Card className="group border-none shadow-md hover:shadow-xl transition rounded-2xl bg-white">
              <CardContent className="p-10 text-center space-y-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full group-hover:scale-110 transition">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  Premium Service
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Exclusive itineraries and hand-picked accommodations tailored
                  for refined travelers.
                </p>
              </CardContent>
            </Card>

            {/* CARD 2 */}
            <Card className="group border-none shadow-md hover:shadow-xl transition rounded-2xl bg-white">
              <CardContent className="p-10 text-center space-y-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full group-hover:scale-110 transition">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  Trusted & Safe
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  We collaborate only with certified partners and maintain the
                  highest safety standards.
                </p>
              </CardContent>
            </Card>

            {/* CARD 3 */}
            <Card className="group border-none shadow-md hover:shadow-xl transition rounded-2xl bg-white">
              <CardContent className="p-10 text-center space-y-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full group-hover:scale-110 transition">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  24/7 Support
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Our travel consultants are always available to assist you
                  before, during, and after your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-28 text-white text-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/component-hero.jpg"
          alt="Beach sunset"
          fill
          className="object-cover scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 container px-6 space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            Ready for Your Next Adventure?
          </h2>

          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Let us design a seamless luxury experience tailored exclusively for
            you.
          </p>

          <div className="flex justify-center gap-6 flex-wrap pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 shadow-lg"
              asChild
            >
              <Link href="/packages">View Packages</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary rounded-full px-10"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
