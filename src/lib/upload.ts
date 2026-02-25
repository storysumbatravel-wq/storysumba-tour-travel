import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function saveImage(file: File): Promise<string> {
  // Validasi tipe file
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  // Validasi ukuran (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image size must be less than 5MB");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Buat nama file unik
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const extension = path.extname(file.name);
  const filename = `package-${uniqueSuffix}${extension}`;

  // Path penyimpanan di folder public/uploads
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filepath = path.join(uploadDir, filename);

  // Pastikan folder uploads ada
  await mkdir(uploadDir, { recursive: true });

  // Tulis file ke disk
  await writeFile(filepath, buffer);

  // Kembalikan path publik untuk disimpan di database
  return `/uploads/${filename}`;
}
