export default function ReportsPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Laporan Keuangan
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Analisis detail performa produksi dan biaya
        </p>
      </header>

      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-gray-400">
            analytics
          </span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">
          Fitur Laporan Segera Hadir
        </h3>
        <p className="text-gray-400 max-w-md">
            Anda akan dapat melihat analisis mendalam mengenai HPP, margin keuntungan, dan tren biaya produksi di sini.
        </p>
      </div>
    </div>
  );
}
