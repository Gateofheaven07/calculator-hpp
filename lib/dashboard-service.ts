import { prisma } from "@/lib/db";

export type Period = "daily" | "weekly" | "monthly" | "yearly";

export async function getChartData(period: Period, productName?: string) {
  const whereClause: any = {};
  if (productName && productName !== "all") {
    whereClause.name = productName;
  }

  // Fetch calculations with products
  const calculations = await prisma.hppCalculation.findMany({
    where: whereClause,
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Grouping Logic
  const groupedData: Record<string, { total: number; count: number }> = {};

  calculations.forEach((calc) => {
    const date = new Date(calc.createdAt);
    let key = "";

    switch (period) {
      case "daily":
        // Group by Day Name (Senin - Minggu)
        key = date.toLocaleDateString("id-ID", { weekday: 'long' });
        break;
      case "weekly":
        // Group by Week of Month (Minggu 1 - 4)
        const weekOfMonth = Math.ceil(date.getDate() / 7);
        key = `Minggu ${weekOfMonth}`;
        break;
      case "monthly":
        key = date.toLocaleDateString("id-ID", { month: 'short', year: 'numeric' });
        break;
      case "yearly":
        key = date.getFullYear().toString();
        break;
    }

    const value = calc.product?.sellingPrice || 0;
    
    if (!groupedData[key]) {
      groupedData[key] = { total: 0, count: 0 };
    }
    groupedData[key].total += value;
    groupedData[key].count += 1;
  });

  // Transform to array for Recharts
  return Object.entries(groupedData).map(([name, data]) => ({
    name,
    total: data.total,
    pv: data.total, // Just mapping for the chart key
    amt: data.total
  }));
}

export async function getProductNames() {
  const products = await prisma.hppCalculation.findMany({
    select: { name: true },
    distinct: ['name'],
  });
  return products.map(p => p.name);
}

// Helper for week number
function getWeekNumber(d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    return weekNo;
}
