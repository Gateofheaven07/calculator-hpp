import { prisma } from "@/lib/db";


interface KPIStatsProps {
  productName?: string;
}

export async function KPIStats({ productName }: KPIStatsProps) {
  const whereClause: any = {};
  if (productName && productName !== "all") {
    whereClause.calculation = {
        name: productName
    };
  }

  // Fetch Material Costs
  const materialCosts = await prisma.materialCost.findMany({
    where: whereClause
  });
  const totalMaterial = materialCosts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

  // Fetch Labor Costs
  const laborCosts = await prisma.directLaborCost.findMany({
    where: whereClause
  });
  const totalLabor = laborCosts.reduce((acc, curr) => acc + (curr.rate * curr.hours * curr.days * curr.workersCount), 0);

  // Fetch Overhead Costs
  const overheadCosts = await prisma.overheadCost.findMany({
     where: whereClause
  });
  const totalOverhead = overheadCosts.reduce((acc, curr) => acc + curr.amount, 0);

  const totalProduction = totalMaterial + totalLabor + totalOverhead;

  // Format currency helper
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 h-24 w-24 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-primary/10 text-primary-glow">
            <span className="material-symbols-outlined">factory</span>
          </div>
          {/* Percentage changes removed as we don't have historical data yet */}
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 relative z-10">
          Total Biaya Produksi
        </h3>
        <p className="text-3xl font-bold text-white relative z-10">
          {formatIDR(totalProduction)}
        </p> 
      </div>

      {/* Card 2 */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 h-24 w-24 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <span className="material-symbols-outlined">category</span>
          </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 relative z-10">
          Biaya Bahan Baku
        </h3>
        <p className="text-3xl font-bold text-white relative z-10">
           {formatIDR(totalMaterial)}
        </p>
      </div>

      {/* Card 3 */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 h-24 w-24 bg-orange-500/20 blur-2xl rounded-full group-hover:bg-orange-500/30 transition-all duration-500"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <span className="material-symbols-outlined">engineering</span>
          </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mb-1 relative z-10">
          Biaya Tenaga Kerja
        </h3>
        <p className="text-3xl font-bold text-white relative z-10">
          {formatIDR(totalLabor)}
        </p>
      </div>
    </div>
  );
}
