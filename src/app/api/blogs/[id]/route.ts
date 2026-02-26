import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/* ======================
   GET BLOG BY ID
====================== */
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const blog = await prisma.blog.findUnique({
    where: { id },
  });

  if (!blog) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

/* ======================
   UPDATE BLOG
====================== */
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();

  try {
    const updated = await prisma.blog.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl,
        author: body.author,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 },
    );
  }
}

/* ======================
   DELETE BLOG
====================== */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
