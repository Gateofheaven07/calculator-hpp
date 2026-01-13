"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteEntry(id: string, type: 'material' | 'labor' | 'overhead') {
  try {
    if (type === 'material') {
      await prisma.materialCost.delete({ where: { id } });
    } else if (type === 'labor') {
      await prisma.directLaborCost.delete({ where: { id } });
    } else if (type === 'overhead') {
        await prisma.overheadCost.delete({ where: { id } });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/entries");
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete entry" };
  }
}

export async function updateEntry(id: string, type: 'material' | 'labor' | 'overhead', data: any) {
    try {
        if (type === 'material') {
            await prisma.materialCost.update({
                where: { id },
                data: {
                    name: data.name,
                    price: parseFloat(data.price),
                    quantity: parseFloat(data.quantity),
                }
            });
        } else if (type === 'labor') {
            await prisma.directLaborCost.update({
                where: { id },
                data: {
                    role: data.name, // Mapping 'name' to 'role' for labor
                    rate: parseFloat(data.price),
                    hours: parseFloat(data.quantity),
                }
            });
        } else if (type === 'overhead') {
            await prisma.overheadCost.update({
                where: { id },
                data: {
                    name: data.name,
                    amount: parseFloat(data.price), // Mapping 'price' to 'amount'
                }
            });
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/entries");
        return { success: true };
    } catch (error) {
        console.error("Update error:", error);
        return { success: false, error: "Failed to update entry" };
    }
}
