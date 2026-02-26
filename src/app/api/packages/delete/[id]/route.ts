import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/* ======================
   DELETE PACKAGE (POST STYLE)
====================== */
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    // ✅ Next 15: params harus di-await
    const { id } = await context.params;

    // Hapus package berdasarkan ID
    await prisma.package.delete({
      where: { id },
    });

    // Redirect kembali ke halaman dashboard packages
    return NextResponse.redirect(new URL("/dashboard/packages", req.url));
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 },
    );
  }
}
