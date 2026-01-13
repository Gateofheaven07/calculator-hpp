import { CostChart } from "@/components/dashboard/cost-chart";
import { HPPInputForm } from "@/components/dashboard/hpp-input-form";
import { KPIStats } from "@/components/dashboard/kpi-stats";
import { RecentEntriesTable } from "@/components/dashboard/recent-entries";
import { DashboardFilter } from "@/components/dashboard/dashboard-filter";
import { getChartData, getProductNames, Period } from "@/lib/dashboard-service";

interface DashboardPageProps {
  searchParams: Promise<{
    product?: string;
    period?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const product = params.product || "all";
  const period = (params.period as Period) || "monthly";

  // Fetch Data
  const chartData = await getChartData(period, product);
  const products = await getProductNames();

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Ringkasan Dasbor
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Analisis biaya dan input real-time
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>
          <button className="h-10 px-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <span>{new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
            <span className="material-symbols-outlined text-[16px]">
              expand_more
            </span>
          </button>
        </div>
      </header>

      <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full pb-20">
        <KPIStats productName={product} />

        {/* Filter Section */}
        <DashboardFilter products={products} />

        {/* Main Interactive Area: Chart + Input */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          <CostChart data={chartData} />
          <HPPInputForm />
        </div>

        <RecentEntriesTable />
      </div>
    </>
  );
}
