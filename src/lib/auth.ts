import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
export const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);

export const signToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);

export const getSession = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    return verifyToken(token) as { id: string; email: string; role: string };
  } catch {
    return null;
  }
};
