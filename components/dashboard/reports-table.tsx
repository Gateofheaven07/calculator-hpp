"use client";

interface HppCalculation {
  id: string;
  name: string;
  createdAt: Date;
  product?: { name: string } | null;
  materialCosts: { price: number; quantity: number }[];
  directLaborCosts: { rate: number; hours: number; days: number; workersCount: number }[];
  overheadCosts: { amount: number }[];
}

export function ReportsTable({ calculations }: { calculations: HppCalculation[] }) {
  
  const calculateTotal = (calc: HppCalculation) => {
    const materialTotal = calc.materialCosts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const laborTotal = calc.directLaborCosts.reduce((sum, item) => sum + (item.rate * item.hours * item.days * item.workersCount), 0);
    const overheadTotal = calc.overheadCosts.reduce((sum, item) => sum + item.amount, 0);
    return materialTotal + laborTotal + overheadTotal;
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = (id: string) => {
    // Open print page in new tab
    window.open(`/dashboard/reports/${id}/print`, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
        try {
            const { deleteHppCalculation } = await import("@/app/actions/hpp-actions");
            const res = await deleteHppCalculation(id);
            if (!res.success) {
                alert("Gagal menghapus laporan");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan");
        }
    }
  };

  if (calculations.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-gray-400">
            analytics
          </span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">
          Belum Ada Laporan
        </h3>
        <p className="text-gray-400 max-w-md">
            Lakukan perhitungan HPP pertama Anda untuk melihat laporan di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                        <th className="px-6 py-4 font-medium text-gray-400">Tanggal</th>
                        <th className="px-6 py-4 font-medium text-gray-400">Nama Produk / Kalkulasi</th>
                        <th className="px-6 py-4 font-medium text-gray-400 text-right">Total Biaya Produksi</th>
                        <th className="px-6 py-4 font-medium text-gray-400 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {calculations.map((calc) => (
                        <tr key={calc.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4 text-gray-400">
                                {new Date(calc.createdAt).toLocaleDateString("id-ID", {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })}
                            </td>
                            <td className="px-6 py-4 text-white font-medium">
                                <div className="flex flex-col">
                                    <span>{calc.product?.name || calc.name}</span>
                                    {calc.product?.name && calc.name !== calc.product.name && (
                                        <span className="text-xs text-gray-500">{calc.name}</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-white text-right font-mono font-bold">
                                {formatIDR(calculateTotal(calc))}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => handleExport(calc.id)}
                                        className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center border border-white/5"
                                        title="Cetak Laporan"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">print</span>
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(calc.id)}
                                        className="h-8 w-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-colors flex items-center justify-center border border-red-500/10"
                                        title="Hapus Laporan"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
