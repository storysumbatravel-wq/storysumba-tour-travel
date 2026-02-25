import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { saveImage } from "@/lib/upload";

export async function POST(req: Request) {
  // Optional: Check if user is admin
  // const session = await getSession();
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl =
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop";

    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
    }

    const newBlog = await prisma.blog.create({
      data: { title, content, author, imageUrl },
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
