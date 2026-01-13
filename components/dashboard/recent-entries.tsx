import { prisma } from "@/lib/db";
import Link from "next/link";

// Helper function to format currency
const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export async function RecentEntriesTable() {
  // Fetch recent 5 from each category
  const materials = await prisma.materialCost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const labor = await prisma.directLaborCost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
  
  const overhead = await prisma.overheadCost.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  // Normalize and merge
  const allEntries = [
    ...materials.map(m => ({
      id: m.id,
      name: m.name,
      category: "Bahan Baku",
      price: m.price,
      quantity: m.quantity,
      total: m.price * m.quantity,
      createdAt: m.createdAt,
      type: "material"
    })),
    ...labor.map(l => ({
      id: l.id,
      name: l.role,
      category: "Tenaga Kerja",
      price: l.rate,
      quantity: l.hours, // displaying hours as quantity
      total: l.rate * l.hours * l.days * l.workersCount,
      createdAt: l.createdAt,
      type: "labor"
    })),
    ...overhead.map(o => ({
      id: o.id,
      name: o.name,
      category: "Overhead",
      price: o.amount,
      quantity: 1,
      total: o.amount,
      createdAt: o.createdAt,
      type: "overhead"
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
   .slice(0, 5);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden mt-6">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Entri Produksi Terbaru</h3>
        <Link href="/dashboard/entries" className="text-sm text-primary hover:text-primary-glow font-medium">
          Lihat Semua
        </Link>
      </div>
      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <table className="w-full text-left border-collapse hidden md:table">
          <thead>
            <tr className="bg-white/5 text-xs uppercase text-gray-400 font-medium tracking-wider">
              <th className="px-6 py-4">Nama Item</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4 text-right">Biaya Satuan / Rate</th>
              <th className="px-6 py-4 text-right">Kuantitas / Jam</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {allEntries.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                        Belum ada data entri produksi.
                    </td>
                </tr>
            ) : (
                allEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-white transition-colors
                        ${entry.type === 'material' ? 'bg-blue-500/20 text-blue-400' : 
                          entry.type === 'labor' ? 'bg-purple-500/20 text-purple-400' : 
                          'bg-orange-500/20 text-orange-400'}`}>
                        <span className="material-symbols-outlined text-lg">
                        {entry.type === 'material' ? 'memory' : 
                         entry.type === 'labor' ? 'precision_manufacturing' : 'engineering'}
                        </span>
                    </div>
                    {entry.name}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{entry.category}</td>
                    <td className="px-6 py-4 text-right text-white">{formatIDR(entry.price)}</td>
                    <td className="px-6 py-4 text-right text-gray-400">
                        {entry.quantity} {entry.type === 'labor' ? 'jam' : ''}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-white">
                    {formatIDR(entry.total)}
                    </td>
                    <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                        Terverifikasi
                    </span>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col divide-y divide-white/5">
            {allEntries.length === 0 ? (
                <div className="p-6 text-center text-gray-400 text-sm">
                    Belum ada data entri produksi.
                </div>
            ) : (
                allEntries.map((entry) => (
                    <div key={entry.id} className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded flex items-center justify-center text-white
                                    ${entry.type === 'material' ? 'bg-blue-500/20 text-blue-400' : 
                                      entry.type === 'labor' ? 'bg-purple-500/20 text-purple-400' : 
                                      'bg-orange-500/20 text-orange-400'}`}>
                                    <span className="material-symbols-outlined text-lg">
                                    {entry.type === 'material' ? 'memory' : 
                                     entry.type === 'labor' ? 'precision_manufacturing' : 'engineering'}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">{entry.name}</div>
                                    <div className="text-xs text-gray-400">{entry.category}</div>
                                </div>
                            </div>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                Terverifikasi
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm pl-11">
                             <div className="text-gray-500 text-xs">
                                {formatIDR(entry.price)} x {entry.quantity}
                             </div>
                             <div className="text-white font-bold">
                                {formatIDR(entry.total)}
                             </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
