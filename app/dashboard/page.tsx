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

import { getUser } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const product = params.product || "all";
  const period = (params.period as Period) || "monthly";

  // Fetch Data
  const chartData = await getChartData(user.id, period, product);
  const products = await getProductNames(user.id);

  return (
    <>
      {/* Header */}
      <DashboardHeader />

      <div className="p-8 flex flex-col gap-8 max-w-[1400px] mx-auto w-full pb-20">
        <KPIStats productName={product} userId={user.id} />

        {/* Filter Section */}
        <DashboardFilter products={products} />

        {/* Main Interactive Area: Chart + Input */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          <CostChart data={chartData} />
          <HPPInputForm />
        </div>

        <RecentEntriesTable userId={user.id} />
      </div>
    </>
  );
}
