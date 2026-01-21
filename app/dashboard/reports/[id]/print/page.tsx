import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

interface PrintPageProps {
  params: Promise<{ id: string }>;
}

export default async function PrintPage({ params }: PrintPageProps) {
  const { id } = await params;

  const calculation = await prisma.hppCalculation.findUnique({
    where: { id },
    include: {
      materialCosts: true,
      directLaborCosts: true,
      overheadCosts: true,
      product: true,
    },
  });

  if (!calculation) {
    notFound();
  }

  const materialTotal = calculation.materialCosts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const laborTotal = calculation.directLaborCosts.reduce((sum, item) => sum + (item.rate * item.hours * item.days * item.workersCount), 0);
  const overheadTotal = calculation.overheadCosts.reduce((sum, item) => sum + item.amount, 0);
  const totalCost = materialTotal + laborTotal + overheadTotal;

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white text-black min-h-screen p-8 print:p-0 font-sans">
      {/* Print Trigger for user convenience if not auto-triggered (auto-trigger via script below) */}
      <div className="max-w-[210mm] mx-auto mb-8 print:hidden flex justify-end gap-4">
        <button 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            // We'll add a script to handle onclick since this is a server component we can't add event handlers directly easily without client component
            // But simple script injection works for print
        >
            Gunakan CTRL+P untuk Mencetak
        </button>
      </div>

      <div className="max-w-[210mm] mx-auto bg-white p-8 print:p-0">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-8 flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan HPP</h1>
                <p className="text-gray-600">Harga Pokok Produksi</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500">Tanggal Laporan</p>
                <p className="font-medium text-gray-900">
                    {new Date(calculation.createdAt).toLocaleDateString("id-ID", {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </p>
                <p className="font-mono text-sm text-gray-400 mt-1">Ref: {calculation.id.slice(0, 8)}</p>
            </div>
        </div>

        {/* Product Info */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Produk</h2>
            <p className="text-2xl font-bold text-gray-900">{calculation.product?.name || calculation.name}</p>
            {calculation.product?.description && (
                <p className="text-gray-600 mt-1">{calculation.product.description}</p>
            )}
        </div>

        <div className="space-y-8">
            {/* Materials */}
             <div>
                <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex justify-between">
                    <span>1. Biaya Bahan Baku</span>
                    <span>{formatIDR(materialTotal)}</span>
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 text-left">
                            <th className="pb-2 font-medium">Bahan</th>
                            <th className="pb-2 font-medium text-right">Harga Satuan</th>
                            <th className="pb-2 font-medium text-right">Jumlah</th>
                            <th className="pb-2 font-medium text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {calculation.materialCosts.map((item, i) => (
                            <tr key={i}>
                                <td className="py-2 text-gray-900">{item.name}</td>
                                <td className="py-2 text-gray-600 text-right">{formatIDR(item.price)}</td>
                                <td className="py-2 text-gray-600 text-right">{item.quantity}</td>
                                <td className="py-2 text-gray-900 font-medium text-right">{formatIDR(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Labor */}
            <div>
                <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex justify-between">
                    <span>2. Biaya Tenaga Kerja Langsung</span>
                    <span>{formatIDR(laborTotal)}</span>
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 text-left">
                            <th className="pb-2 font-medium">Peran</th>
                            <th className="pb-2 font-medium text-right">Rate/Jam</th>
                            <th className="pb-2 font-medium text-right">Jam x Hari x Org</th>
                            <th className="pb-2 font-medium text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {calculation.directLaborCosts.map((item, i) => (
                            <tr key={i}>
                                <td className="py-2 text-gray-900">{item.role}</td>
                                <td className="py-2 text-gray-600 text-right">{formatIDR(item.rate)}</td>
                                <td className="py-2 text-gray-600 text-right">
                                    {item.hours} jam x {item.days} hari x {item.workersCount} org
                                </td>
                                <td className="py-2 text-gray-900 font-medium text-right">
                                    {formatIDR(item.rate * item.hours * item.days * item.workersCount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Overhead */}
            <div>
                <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4 flex justify-between">
                    <span>3. Biaya Overhead</span>
                    <span>{formatIDR(overheadTotal)}</span>
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 text-left">
                            <th className="pb-2 font-medium">Keterangan</th>
                            <th className="pb-2 font-medium text-right">Biaya</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {calculation.overheadCosts.map((item, i) => (
                            <tr key={i}>
                                <td className="py-2 text-gray-900">{item.name}</td>
                                <td className="py-2 text-gray-900 font-medium text-right">{formatIDR(item.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="mt-8 bg-gray-900 text-white p-6 rounded-xl print:bg-gray-100 print:text-black">
                <div className="flex justify-between items-center text-lg font-bold mb-2">
                    <span>Total HPP</span>
                    <span className="text-2xl">{formatIDR(totalCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm opacity-80 print:opacity-100">
                    <span>Per Unit (Estimasi jika 1 unit)</span>
                    <span>{formatIDR(totalCost)}</span>
                </div>
            </div>
        </div>
        
        <script dangerouslySetInnerHTML={{__html: `
            window.onload = function() {
                setTimeout(function() {
                    window.print();
                }, 500);
            }
        `}} />
      </div>
    </div>
  );
}
