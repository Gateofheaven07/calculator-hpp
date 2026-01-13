"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      <div className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400"
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            ALGORITMA V2.0 LIVE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Revolusi <br className="hidden md:block" />
            <span className="glow-text text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Perhitungan HPP
            </span>{" "}
            Anda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            Hitung profitabilitas produk Anda dengan presisi algoritma modern.{" "}
            <span className="font-semibold text-slate-200">Cepat, akurat, dan otomatis</span>{" "}
            mengubah data kompleks menjadi keputusan bisnis yang cerdas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button className="group relative inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Mulai Sekarang
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/10">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20">
                <Play className="h-3 w-3 fill-blue-400 text-blue-400" />
              </div>
              Lihat Demo
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </section>
  );
}
