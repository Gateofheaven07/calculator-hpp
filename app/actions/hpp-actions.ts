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

export async function createHppCalculation(data: HppInputData) {
  try {
    const calculation = await prisma.hppCalculation.create({
      data: {
        name: data.name,
        userId: data.userId,
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

export async function getHppCalculations(userId: string) {
  try {
    const calculations = await prisma.hppCalculation.findMany({
      where: { userId },
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
