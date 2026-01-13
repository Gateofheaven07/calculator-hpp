"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface DashboardFilterProps {
  products: string[];
}

export function DashboardFilter({ products }: DashboardFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentProduct = searchParams.get("product") || "all";
  const currentPeriod = searchParams.get("period") || "monthly";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
        params.delete(key);
    } else {
        params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h3 className="text-lg font-bold text-white">Tren Analisis Biaya</h3>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Product Dropdown */}
        <select 
          className="bg-[#0B0E14] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50"
          value={currentProduct}
          onChange={(e) => handleFilterChange("product", e.target.value)}
        >
          <option value="all" className="bg-[#0B0E14] text-white">Semua Perhitungan</option>
          {products.map((p) => (
            <option key={p} value={p} className="bg-[#0B0E14] text-white">{p}</option>
          ))}
        </select>

        {/* Period Tabs */}
        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
          {(["daily", "weekly", "monthly", "yearly"] as const).map((period) => (
            <button
              key={period}
              onClick={() => handleFilterChange("period", period)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all
                ${currentPeriod === period 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {period === "daily" ? "Harian" : 
               period === "weekly" ? "Mingguan" : 
               period === "monthly" ? "Bulanan" : "Tahunan"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
