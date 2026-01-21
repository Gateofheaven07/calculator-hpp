export const dynamic = "force-dynamic";

import { getHppCalculations } from "@/app/actions/hpp-actions";
import { ReportsTable } from "@/components/dashboard/reports-table";

export default async function ReportsPage() {
  const result = await getHppCalculations();
  const calculations = result.success ? result.data || [] : [];

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
            Laporan Keuangan
            </h2>
            <p className="text-sm text-gray-400 mt-1">
            Analisis detail performa produksi dan biaya
            </p>
        </div>
        {/* Placeholder for future filter controls */}
      </header>

      <ReportsTable calculations={calculations} />
    </div>
  );
}
