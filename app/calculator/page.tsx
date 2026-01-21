"use client";

import { Navbar } from "@/components/landing/navbar";
import { HPPInputForm } from "@/components/dashboard/hpp-input-form";
import { Footer } from "@/components/landing/footer";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] font-display">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Kalkulator HPP Cerdas
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
                Hitung HPP dengan presisi tinggi menggunakan algoritma cerdas kami.
            </p>
        </div>

        <div className="max-w-4xl mx-auto">
             <HPPInputForm isPublic={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
