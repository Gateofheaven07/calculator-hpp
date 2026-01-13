"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function saveCalculation(data: any) {
  try {
    // Verify session
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "default_secret_key_change_me"
    );
    const { payload } = await jwtVerify(session, secret);
    const userId = payload.userId as string;

    // Sanitize helper
    const sanitizeNumber = (val: any) => {
      if (!val || val === "") return 0;
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    // Create HPP Calculation
    const result = await prisma.hppCalculation.create({
      data: {
        name: data.productName,
        userId: userId,
        product: {
          create: {
            name: data.productName,
            sellingPrice: sanitizeNumber(data.sellingPrice),
          }
        },
        materialCosts: {
          create: data.materials
            .map((m: any) => ({
              name: m.name || "Bahan",
              quantity: sanitizeNumber(m.quantity),
              price: sanitizeNumber(m.price),
            }))
            .filter((m: any) => m.quantity > 0 && m.price > 0),
        },
        directLaborCosts: {
          create: data.labor
            .map((l: any) => ({
              role: l.role || "Pekerja",
              hours: sanitizeNumber(l.hours),
              rate: sanitizeNumber(l.rate),
              days: 1, 
              workersCount: 1, 
            }))
            .filter((l: any) => l.hours > 0 && l.rate >= 0),
        },
        overheadCosts: {
          create: data.overhead
            .map((o: any) => ({
              name: o.name || "Biaya",
              amount: sanitizeNumber(o.amount),
            }))
            .filter((o: any) => o.amount > 0),
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true, id: result.id };

  } catch (error: any) {
    console.error("Save error:", error);
    return { success: false, error: error.message || "Failed to save calculation" };
  }
}
