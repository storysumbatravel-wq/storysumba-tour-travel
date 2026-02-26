export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-white flex flex-col text-stone-800">
      {/* ================= HERO ================= */}
      <section className="relative h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/component-hero.jpg"
          alt="Travel journal"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative z-10 px-6 text-white max-w-3xl space-y-6">
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight">
            Travel Journal
          </h1>
          <p className="text-lg text-white/80">
            Stories, insights, and inspiration from our luxury journeys around
            the world.
          </p>
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <main className="container py-24 px-6 flex-1">
        {blogs.length === 0 ? (
          <div className="text-center text-stone-500 py-20">
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className="group">
                <Card className="overflow-hidden bg-white border-none shadow-md hover:shadow-2xl transition duration-500 rounded-3xl flex flex-col h-full">
                  {/* Image */}
                  <div className="relative w-full h-60 overflow-hidden">
                    <Image
                      src={
                        blog.imageUrl ||
                        "https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                      }
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* Content */}
                  <CardHeader className="pb-2">
                    <p className="text-xs text-stone-400 uppercase tracking-widest mb-2">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    <CardTitle className="font-serif text-2xl leading-snug group-hover:text-primary transition">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <span className="text-sm font-semibold text-primary tracking-wide group-hover:underline">
                      Read Article →
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
