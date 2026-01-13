import { prisma } from "@/lib/db";
import Link from "next/link";
import { EntryActions } from "@/components/dashboard/entry-actions";

const formatIDR = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export default async function EntriesPage() {
  // Fetch ALL entries from each category (or a large limit for now)
  const materials = await prisma.materialCost.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const labor = await prisma.directLaborCost.findMany({
    orderBy: { createdAt: 'desc' },
  });
  
  const overhead = await prisma.overheadCost.findMany({
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
      type: "material" as const
    })),
    ...labor.map(l => ({
      id: l.id,
      name: l.role,
      category: "Tenaga Kerja",
      price: l.rate,
      quantity: l.hours, 
      total: l.rate * l.hours * l.days * l.workersCount,
      createdAt: l.createdAt,
      type: "labor" as const
    })),
    ...overhead.map(o => ({
      id: o.id,
      name: o.name,
      category: "Overhead",
      price: o.amount,
      quantity: 1,
      total: o.amount,
      createdAt: o.createdAt,
      type: "overhead" as const
    }))
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </Link>
            <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
                Semua Entri Produksi
            </h2>
            <p className="text-sm text-gray-400 mt-1">
                Daftar lengkap riwayat input biaya
            </p>
            </div>
        </div>
      </header>

      <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
        <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                {/* Desktop Table */}
                <table className="w-full text-left border-collapse hidden md:table">
                <thead>
                    <tr className="bg-white/5 text-xs uppercase text-gray-400 font-medium tracking-wider">
                    <th className="px-6 py-4">Nama Item</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4 text-right">Biaya Satuan / Rate</th>
                    <th className="px-6 py-4 text-right">Kuantitas / Jam</th>
                    <th className="px-6 py-4 text-right">Total</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                    {allEntries.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
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
                            <td className="px-6 py-4 text-center">
                                <EntryActions 
                                    id={entry.id} 
                                    type={entry.type} 
                                    initialData={{
                                        name: entry.name,
                                        price: entry.price,
                                        quantity: entry.quantity
                                    }}
                                />
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="md:hidden flex flex-col divide-y divide-white/5">
                    {allEntries.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            Belum ada data entri produksi.
                        </div>
                    ) : (
                        allEntries.map((entry) => (
                            <div key={entry.id} className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white
                                            ${entry.type === 'material' ? 'bg-blue-500/20 text-blue-400' : 
                                            entry.type === 'labor' ? 'bg-purple-500/20 text-purple-400' : 
                                            'bg-orange-500/20 text-orange-400'}`}>
                                            <span className="material-symbols-outlined text-xl">
                                            {entry.type === 'material' ? 'memory' : 
                                            entry.type === 'labor' ? 'precision_manufacturing' : 'engineering'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{entry.name}</h4>
                                            <p className="text-xs text-gray-400">{entry.category}</p>
                                        </div>
                                    </div>
                                    <EntryActions 
                                        id={entry.id} 
                                        type={entry.type} 
                                        initialData={{
                                            name: entry.name,
                                            price: entry.price,
                                            quantity: entry.quantity
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-gray-400">
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
      </div>
    </>
  );
}
