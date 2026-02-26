import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File | null;

    let imageUrl: string | undefined;

    if (image && image.size > 0) {
      // Simpan file sesuai sistem upload kamu
      imageUrl = `/uploads/${image.name}`;
    }

    await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        author,
        content,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json({ message: "Updated successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
