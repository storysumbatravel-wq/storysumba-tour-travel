import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type OptionInput = {
  pax: number;
  price: number;
};

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: params.id },
      include: {
        options: true, // ✅ sesuai schema
      },
    });

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch package" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const duration = Number(formData.get("duration"));
    const itinerary = formData.get("itinerary") as string;
    const include = formData.get("include") as string;
    const exclude = formData.get("exclude") as string;

    const isHighlighted = formData.get("isHighlighted") === "true";

    const optionsRaw = formData.get("prices") as string | null;
    const options: OptionInput[] = optionsRaw ? JSON.parse(optionsRaw) : [];

    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadPath = `./public/uploads/${fileName}`;

      const fs = await import("fs");
      await fs.promises.writeFile(uploadPath, buffer);

      imageUrl = `/uploads/${fileName}`;
    }

    await prisma.package.update({
      where: { id: params.id },
      data: {
        title,
        description,
        duration,
        itinerary,
        include,
        exclude,
        isHighlighted,
        ...(imageUrl && { imageUrl }),

        // ✅ SESUAI SCHEMA: options bukan prices
        options: {
          deleteMany: {},
          create: options.map((opt) => ({
            pax: Number(opt.pax),
            pricePerPax: Number(opt.price),
            totalCost: Number(opt.pax) * Number(opt.price),
          })),
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update package" },
      { status: 500 },
    );
  }
}
