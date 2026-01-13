"use client";

import { motion } from "framer-motion";
import React from "react";

export function PipelineSection() {
  return (
    <section className="relative z-10 px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
      {/* Header */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
        </span>
        Simulasi Langsung
      </div>
      <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
        Visualisasi Pipeline{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">
          HPP
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400 mb-16">
        Visualisasikan proses tekanan secara real-time. Ikuti produk Anda melalui
        tahapan siklus hidup tekanan tinggi.
      </p>

      {/* Pipeline Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Left: Sticky Visual Viewport (Simulating 3D) */}
          <div className="order-2 w-full lg:order-1 lg:w-1/2">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* 3D Viewport Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#314368] bg-[#182234] shadow-2xl">
                {/* Background Grid/Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,89,242,0.15),transparent_70%)]"></div>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(#314368 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                ></div>
                {/* Simulated 3D Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* The "Chamber" */}
                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-primary/30 bg-gradient-to-b from-[#101623] to-[#182234] shadow-neon-strong">
                    {/* Inner Ring */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-primary/20"></div>
                    {/* Core Glow */}
                    <div className="h-32 w-32 rounded-full bg-primary/10 shadow-[0_0_50px_rgba(13,89,242,0.4)] backdrop-blur-sm"></div>
                    {/* Product Icon Placeholder */}
                    <div className="absolute z-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      <span className="material-symbols-outlined text-6xl">
                        view_in_ar
                      </span>
                    </div>
                    {/* Rotating Scanner Effect */}
                    <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border-t border-primary/50 opacity-50"></div>
                  </div>
                </div>
                {/* Floating HUD Elements */}
                <div className="absolute left-6 top-6 rounded border border-primary/20 bg-[#101623]/80 px-3 py-1.5 backdrop-blur">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Status Sistem
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                    <span className="text-xs font-mono text-white">ONLINE</span>
                  </div>
                </div>
                <div className="absolute right-6 bottom-6 flex flex-col gap-2">
                  <div className="rounded border border-primary/20 bg-[#101623]/80 px-3 py-2 backdrop-blur w-32">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Target Tekanan
                    </p>
                    <p className="text-sm font-mono font-bold text-primary">
                      6000 bar
                    </p>
                  </div>
                  <div className="rounded border border-primary/20 bg-[#101623]/80 px-3 py-2 backdrop-blur w-32">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Suhu
                    </p>
                    <p className="text-sm font-mono font-bold text-white">
                      5°C <span className="text-xs text-slate-500">/ 41°F</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Live Stats Row (Reuse Stats Component Logic) */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1 rounded-lg border border-[#314368] bg-[#182234] p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-xl">
                      speed
                    </span>
                    <p className="text-xs font-bold uppercase">Efisiensi</p>
                  </div>
                  <p className="font-mono text-xl font-bold text-white">
                    98.5%
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-lg border border-[#314368] bg-[#182234] p-4">
                  <div className="flex items-center gap-2 text-blue-400">
                    <span className="material-symbols-outlined text-xl">
                      timer
                    </span>
                    <p className="text-xs font-bold uppercase">Waktu Siklus</p>
                  </div>
                  <p className="font-mono text-xl font-bold text-white">185s</p>
                </div>
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 rounded-lg border border-[#314368] bg-[#182234] p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="material-symbols-outlined text-xl">
                      check_circle
                    </span>
                    <p className="text-xs font-bold uppercase">Validasi</p>
                  </div>
                  <p className="font-mono text-xl font-bold text-white">
                    Lulus
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Scrolling Narrative (FeatureSection) */}
          <div className="order-1 flex w-full flex-col gap-8 lg:order-2 lg:w-1/2 lg:py-10">
            {/* Stage 1 */}
            <div className="group relative flex gap-6 pb-12">
              {/* Connecting Line */}
              <div className="absolute left-[26px] top-14 h-full w-0.5 bg-gradient-to-b from-primary/50 to-[#314368]"></div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary bg-primary/20 text-white shadow-neon">
                <span className="material-symbols-outlined text-2xl">
                  input
                </span>
              </div>
              <div className="flex flex-col pt-2">
                <h3 className="text-xl font-bold text-white mb-2">
                  Tahap 1: Parameter Input
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Tentukan volume produk, jenis kemasan, dan suhu awal saat
                  produk masuk ke dalam bejana. Sistem memvalidasi batasan secara
                  otomatis terhadap kapasitas bejana.
                </p>
                <div className="rounded-lg bg-[#182234] p-4 border border-[#314368]">
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">
                        check
                      </span>
                      Perhitungan Rasio Pengisian Bejana
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">
                        check
                      </span>
                      Faktor kompresibilitas kemasan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Stage 2 */}
            <div className="group relative flex gap-6 pb-12">
              {/* Connecting Line */}
              <div className="absolute left-[26px] top-14 h-full w-0.5 bg-[#314368]"></div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#314368] bg-[#182234] text-slate-400 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">
                  compress
                </span>
              </div>
              <div className="flex flex-col pt-2">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Tahap 2: Pemrosesan HPP
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Saksikan bejana bersinar saat tekanan meningkat hingga 6000 bar.
                  Perhitungan pemanasan adiabatik dilakukan secara real-time untuk
                  memastikan standar keamanan pangan terpenuhi tanpa mengorbankan
                  kualitas.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded bg-[#101623] p-3 border border-[#314368]">
                    <span className="block text-xs text-slate-500 uppercase">
                      Peningkatan Tekanan
                    </span>
                    <span className="font-mono text-white">3 min</span>
                  </div>
                  <div className="rounded bg-[#101623] p-3 border border-[#314368]">
                    <span className="block text-xs text-slate-500 uppercase">
                      Waktu Tahan
                    </span>
                    <span className="font-mono text-white">180 sec</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Stage 3 */}
            <div className="group relative flex gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#314368] bg-[#182234] text-slate-400 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-2xl">
                  analytics
                </span>
              </div>
              <div className="flex flex-col pt-2">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Tahap 3: Hasil Output
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Verifikasi status selesai dan tinjau throughput yang dihitung,
                  biaya per unit, dan waktu siklus. Ekspor laporan komprehensif
                  untuk pemangku kepentingan Anda segera.
                </p>
                <button className="mt-2 w-fit text-sm font-bold text-primary hover:text-white flex items-center gap-1 transition-colors">
                  Lihat Contoh Laporan{" "}
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
