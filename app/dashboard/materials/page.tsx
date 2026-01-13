export default function MaterialsPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
            Perpustakaan Bahan
            </h2>
            <p className="text-sm text-gray-400 mt-1">
            Kelola database bahan baku dan harga
            </p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Bahan
        </button>
      </header>

      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-gray-400">
            inventory_2
          </span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">
          Database Bahan Kosong
        </h3>
        <p className="text-gray-400 max-w-md">
            Mulai tambahkan bahan baku yang sering digunakan untuk mempercepat perhitungan HPP Anda.
        </p>
      </div>
    </div>
  );
}
