import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // Hapus package berdasarkan ID
    await prisma.package.delete({
      where: { id: params.id },
    });

    // Redirect kembali ke halaman list packages
    // Karena ini form action, kita bisa return redirect atau response biasa
    // Namun untuk handler API, biasanya return JSON atau Redirect menggunakan NextResponse.redirect
    // Di sini kita return success response, tapi karena ini form submit browser akan stay di halaman itu.
    // Alternatif terbaik adalah redirect.

    return NextResponse.redirect(new URL("/dashboard/packages", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete package" },
      { status: 500 },
    );
  }
}
