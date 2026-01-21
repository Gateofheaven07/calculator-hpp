import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || "default_secret_key_change_me"
  );

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, phoneNumber: true, image: true },
    });

    return user;
  } catch {
    return null;
  }
}
