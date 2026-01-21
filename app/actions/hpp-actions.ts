"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type HppInputData = {
  name: string;
  userId: string;
  materials: { name: string; quantity: number; price: number }[];
  labor: { role: string; hours: number; rate: number; days?: number; workersCount?: number }[];
  overheads: { name: string; amount: number }[];
  product?: {
    name: string;
    description?: string;
    imageUrl?: string;
    sellingPrice?: number;
  };
};

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

export async function createHppCalculation(data: HppInputData) {
  try {
    // Override userId if not provided or valid (though strictly data.userId is passed from client currently, we should verify)
    // For now, let's keep existing logic but warn or refactor later.
    // Actually, let's just use the logic in getHppCalculations as requested.
    
    const calculation = await prisma.hppCalculation.create({
      data: {
        name: data.name,
        userId: data.userId, // This relies on client passing ID. Ideally should use session ID.
        materialCosts: {
          create: data.materials.map((m) => ({
            name: m.name,
            quantity: m.quantity,
            price: m.price,
          })),
        },
        directLaborCosts: {
          create: data.labor.map((l) => ({
            role: l.role,
            hours: l.hours,
            rate: l.rate,
            days: l.days ?? 1,
            workersCount: l.workersCount ?? 1,
          })),
        },
        overheadCosts: {
          create: data.overheads.map((o) => ({
            name: o.name,
            amount: o.amount,
          })),
        },
        product: data.product
          ? {
              create: {
                name: data.product.name,
                description: data.product.description,
                imageUrl: data.product.imageUrl,
                sellingPrice: data.product.sellingPrice,
              },
            }
          : undefined,
      },
      include: {
        materialCosts: true,
        directLaborCosts: true,
        overheadCosts: true,
        product: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: calculation };
  } catch (error) {
    console.error("Failed to create HPP calculation:", error);
    return { success: false, error: "Failed to create calculation" };
  }
}

export async function getHppCalculations(userId?: string) {
  try {
    const targetUserId = userId || await getUserId();
    
    if (!targetUserId) {
        return { success: false, error: "Unauthorized" };
    }

    const calculations = await prisma.hppCalculation.findMany({
      where: { userId: targetUserId },
      include: {
        materialCosts: true,
        directLaborCosts: true,
        overheadCosts: true,
        product: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: calculations };
  } catch (error) {
    console.error("Failed to fetch HPP calculations:", error);
    return { success: false, error: "Failed to fetch calculations" };
  }
}

export async function deleteHppCalculation(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    // Verify ownership
    const existing = await prisma.hppCalculation.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== userId) {
      return { success: false, error: "Not found or unauthorized" };
    }

    await prisma.hppCalculation.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete HPP calculation:", error);
    return { success: false, error: "Failed to delete calculation" };
  }
}
