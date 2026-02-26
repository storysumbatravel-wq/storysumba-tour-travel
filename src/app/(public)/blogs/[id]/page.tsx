export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Next 15: params harus di-await
  const { id } = await params;

  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) return notFound();

  return (
    <div className="min-h-screen bg-white flex flex-col text-stone-800">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={
            blog.imageUrl ||
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828"
          }
          alt={blog.title}
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-white font-serif text-4xl md:text-6xl font-bold leading-tight">
              {blog.title}
            </h1>

            <p className="text-white/80 text-sm md:text-base tracking-wide">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {blog.author && ` • By ${blog.author}`}
            </p>
          </div>
        </div>
      </section>

      {/* ================= ARTICLE CONTENT ================= */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <article className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-relaxed">
            <div className="whitespace-pre-line text-stone-700">
              {blog.content}
            </div>
          </article>

          {/* Divider */}
          <div className="mt-16 border-t border-stone-200 pt-10 text-center">
            <Link
              href="/blogs"
              className="inline-block text-primary font-semibold tracking-wide hover:underline transition"
            >
              ← Back to Travel Journal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
