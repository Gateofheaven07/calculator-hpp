"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo_calc.png" alt="HPP Calculator Logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold text-white">HPP Calculator</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/features" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Fitur
          </Link>
          <Link href="/calculator" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Kalkulator
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Tentang
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20 border border-white/10"
          >
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}
