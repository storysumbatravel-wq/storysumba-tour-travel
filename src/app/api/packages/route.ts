import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { saveImage } from "@/lib/upload";

type PriceInput = {
  pax: number;
  price: number;
};

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// ==============================
// GET ALL PACKAGES
// ==============================
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        options: {
          orderBy: { pax: "asc" },
        },
      },
    });

    return NextResponse.json(packages);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}

// ==============================
// CREATE PACKAGE
// ==============================
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const duration = Number(formData.get("duration"));
    const durationText = formData.get("durationText") as string;

    const itinerary = formData.get("itinerary") as string;
    const include = formData.get("include") as string;
    const exclude = formData.get("exclude") as string;

    // ✅ HANDLE CHECKBOX (IMPORTANT)
    const isHighlighted = formData.get("isHighlighted") === "true";

    const imageFile = formData.get("image") as File | null;

    const pricesJson = formData.get("prices") as string;
    const prices: PriceInput[] = pricesJson ? JSON.parse(pricesJson) : [];

    if (!title || !duration || prices.length === 0) {
      return NextResponse.json(
        { error: "Title, duration and prices are required" },
        { status: 400 },
      );
    }

    const slug = generateSlug(title) + "-" + Date.now();

    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      imageUrl = await saveImage(imageFile);
    } else {
      imageUrl =
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop";
    }

    // ==============================
    // CREATE PACKAGE WITH OPTIONS
    // ==============================
    const newPackage = await prisma.package.create({
      data: {
        title,
        slug,
        description,
        duration,
        durationText,
        imageUrl,
        itinerary,
        include,
        exclude,
        isHighlighted, // ✅ SIMPAN KE DATABASE
        options: {
          createMany: {
            data: prices.map((p) => ({
              pax: p.pax,
              pricePerPax: p.price,
              totalCost: p.pax * p.price,
            })),
          },
        },
      },
      include: { options: true },
    });

    return NextResponse.json(newPackage);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create package" },
      { status: 500 },
    );
  }
}
