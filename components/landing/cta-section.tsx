"use client";

import React from "react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-32 lg:py-48">
      {/* Background Radial Gradient (The Portal Effect) */}
      <div className="portal-glow absolute inset-0 z-0"></div>
      {/* Concentric Circles Decor */}
      <div className="pointer-events-none absolute z-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full border border-primary/10"></div>
      </div>
      <div className="pointer-events-none absolute z-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full border border-primary/10 opacity-60"></div>
      </div>
      <div className="pointer-events-none absolute z-0 flex items-center justify-center">
        <div className="h-[700px] w-[700px] rounded-full border border-primary/5 opacity-30"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(13,89,242,0.5)]">
            Siap mengoptimalkan<br /> proses Anda?
          </h2>
          <p className="mx-auto max-w-lg text-lg text-slate-300">
            Bergabunglah dengan ratusan insinyur pemrosesan makanan yang mengoptimalkan
            siklus HPP mereka. Mulai perhitungan Anda sekarang dan akses portal.
          </p>
        </div>
        <Link href="/calculator" className="group relative flex h-14 min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-white shadow-[0_0_30px_-5px_rgba(13,89,242,0.6)] transition-all hover:scale-105 hover:bg-blue-600 hover:shadow-[0_0_50px_-5px_rgba(13,89,242,0.8)]">
          <span className="relative z-10 flex items-center gap-2">
            Buka Kalkulator
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              rocket_launch
            </span>
          </span>
          {/* Button inner glow effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
        </Link>
      </div>
    </section>
  );
}
