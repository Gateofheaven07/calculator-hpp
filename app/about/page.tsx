import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] font-display">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
            <div className="h-16 w-16 mb-6 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(13,89,242,0.4)]">
                <span className="material-symbols-outlined text-white text-4xl">calculate</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tentang HPP Calculator
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Kami berdedikasi untuk membantu UMKM dan bisnis manufaktur menghitung Harga Pokok Produksi dengan presisi tinggi, cepat, dan mudah.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative glass-panel p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Visi Kami</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Menjadi platform standar industri untuk perhitungan biaya produksi yang dapat diakses oleh semua skala bisnis, dari rumahan hingga pabrik.
                    </p>
                </div>
            </div>
            <div className="relative group">
                 <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-10 blur-xl rounded-2xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative glass-panel p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Misi Kami</h3>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span>Menyediakan alat hitung yang akurat dan transparan.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span>Mengedukasi pemilik bisnis tentang pentingnya HPP.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                            <span>Mempermudah pengambilan keputusan finansial.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
