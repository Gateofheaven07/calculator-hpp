"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Features() {
  return (
    <section className="relative py-20 px-4 md:px-6 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 stars-bg opacity-30 animate-drift"></div>
      </div>

      <div className="container mx-auto max-w-[1200px] relative z-10 flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 relative">
          {/* Decorative accent line */}
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-4"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
            Keunggulan Sistem <span className="text-primary text-glow">HPP</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Temukan bagaimana teknologi kami mengubah cara Anda menghitung biaya produksi dengan presisi luar biasa dan kecepatan cahaya.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-1000 relative">
          {/* Decorative Connectors (Visual only) */}
          <div className="absolute top-1/2 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block -z-10"></div>

          {/* Feature 1: Otomatisasi */}
          <div className="card-perspective-wrapper group/card h-full">
            <div className="card-3d glass-panel h-full rounded-xl p-8 flex flex-col items-start gap-6 relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute -right-20 -top-20 size-40 bg-primary/10 rounded-full blur-3xl group-hover/card:bg-primary/20 transition-all duration-500"></div>
              {/* 3D Icon Container */}
              <div className="relative size-16 flex items-center justify-center rounded-2xl bg-[#151c2f] border border-white/5 shadow-inner group-hover/card:border-primary/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-white z-10 animate-spin-slow" style={{ fontVariationSettings: "'FILL' 1" }}>settings_suggest</span>
              </div>
              <div className="space-y-3 z-10">
                <h3 className="text-xl font-bold text-white group-hover/card:text-primary transition-colors">Otomatisasi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Hitung biaya produksi secara otomatis tanpa input manual berulang. Hemat waktu Anda untuk strategi bisnis.
                </p>
              </div>
              {/* Bottom Accent */}
              <div className="mt-auto w-full h-[1px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Feature 2: Analisis Real-time */}
          <div className="card-perspective-wrapper group/card h-full">
            <div className="card-3d glass-panel h-full rounded-xl p-8 flex flex-col items-start gap-6 relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute -right-20 -top-20 size-40 bg-purple-500/10 rounded-full blur-3xl group-hover/card:bg-purple-500/20 transition-all duration-500"></div>
              {/* 3D Icon Container */}
              <div className="relative size-16 flex items-center justify-center rounded-2xl bg-[#151c2f] border border-white/5 shadow-inner group-hover/card:border-purple-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-white z-10 animate-float" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              </div>
              <div className="space-y-3 z-10">
                <h3 className="text-xl font-bold text-white group-hover/card:text-purple-400 transition-colors">Analisis Real-time</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pantau margin keuntungan saat fluktuasi harga terjadi detik ini juga. Keputusan cerdas berbasis data aktual.
                </p>
              </div>
              {/* Bottom Accent */}
              <div className="mt-auto w-full h-[1px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Feature 3: Akurasi Tinggi */}
          <div className="card-perspective-wrapper group/card h-full">
            <div className="card-3d glass-panel h-full rounded-xl p-8 flex flex-col items-start gap-6 relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute -right-20 -top-20 size-40 bg-emerald-500/10 rounded-full blur-3xl group-hover/card:bg-emerald-500/20 transition-all duration-500"></div>
              {/* 3D Icon Container */}
              <div className="relative size-16 flex items-center justify-center rounded-2xl bg-[#151c2f] border border-white/5 shadow-inner group-hover/card:border-emerald-500/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-md opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-white z-10 animate-pulse-glow" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>center_focus_strong</span>
              </div>
              <div className="space-y-3 z-10">
                <h3 className="text-xl font-bold text-white group-hover/card:text-emerald-400 transition-colors">Akurasi Tinggi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Minimalisir human-error dengan algoritma presisi tinggi. Kepercayaan penuh pada setiap angka yang dihasilkan.
                </p>
              </div>
              {/* Bottom Accent */}
              <div className="mt-auto w-full h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>
        </div>

        {/* Call to Action (Connector) */}
        <div className="flex justify-center mt-4">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <Link href="/about" className="relative flex items-center gap-2 px-8 py-4 bg-[#101623] ring-1 ring-white/10 rounded-lg text-white font-bold tracking-wide hover:bg-[#151c2f] transition-all">
              Pelajari Lebih Lanjut
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
