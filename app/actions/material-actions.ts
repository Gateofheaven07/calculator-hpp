"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_key_change_me"
);

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export async function createMaterial(data: {
  name: string;
  category: string;
  unit: string;
  price: number;
}) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.material.create({
      data: {
        ...data,
        userId,
      },
    });

    revalidatePath("/dashboard/materials");
    return { success: true };
  } catch (error) {
    console.error("Create material error:", error);
    return { success: false, error: "Failed to create material" };
  }
}

export async function deleteMaterial(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify ownership
    const material = await prisma.material.findUnique({
      where: { id },
    });

    if (!material || material.userId !== userId) {
      return { success: false, error: "Unauthorized or material not found" };
    }

    await prisma.material.delete({
      where: { id },
    });

    revalidatePath("/dashboard/materials");
    return { success: true };
  } catch (error) {
    console.error("Delete material error:", error);
    return { success: false, error: "Failed to delete material" };
  }
}

export async function getMaterials() {
  try {
    const userId = await getUserId();
    if (!userId) return [];

    const materials = await prisma.material.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return materials;
  } catch (error) {
    console.error("Get materials error:", error);
    return [];
  }
}
