import { CostChart } from "@/components/dashboard/cost-chart";
import { HPPInputForm } from "@/components/dashboard/hpp-input-form";
import { KPIStats } from "@/components/dashboard/kpi-stats";
import { RecentEntriesTable } from "@/components/dashboard/recent-entries";
import { DashboardFilter } from "@/components/dashboard/dashboard-filter";
import { getChartData, getProductNames, Period } from "@/lib/dashboard-service";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

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
      <DashboardHeader />

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
