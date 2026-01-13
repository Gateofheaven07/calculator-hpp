"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/dashboard", icon: "dashboard", label: "Dasbor" },
    { href: "/dashboard/reports", icon: "analytics", label: "Laporan" },
    { href: "/dashboard/materials", icon: "inventory_2", label: "Perpustakaan Bahan" },
    { href: "/dashboard/history", icon: "history", label: "Riwayat" },
    { href: "/dashboard/calculator", icon: "calculate", label: "Kalkulator" },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B0E14] border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-[18px]">calculate</span>
            </div>
            <span className="text-white font-bold text-base">HPP Calculator</span>
        </div>
        <button 
            onClick={toggleOpen}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
        >
            <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
            onClick={toggleOpen}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-[#0B0E14] border-r border-white/10 z-50 transform transition-transform duration-300 md:hidden flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[18px]">calculate</span>
                </div>
                <span className="text-white font-bold">Menu</span>
            </div>
            <button 
                onClick={toggleOpen}
                className="p-1 text-gray-500 hover:text-white transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                            ? "bg-primary/10 border border-primary/20 text-white" 
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <span className={`material-symbols-outlined ${isActive ? "text-primary-glow" : ""}`}>
                            {link.icon}
                        </span>
                        <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                );
            })}
        </nav>

        <div className="p-4 border-t border-white/5">
             <div className="flex items-center gap-3 px-4 py-3">
                <div
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10 bg-cover bg-center"
                    style={{
                    backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClANe1XpasTIT19wav8VVeEaXAK7_FkSCXNerKJ15sdYTVlw5cYieDgWssnReRXzE9fH4a1S44-yQr94T8HbUE3-fDA_nY5Uj_Om_3xMtJ8A2tOGusyjNemq78b1yk398gmp0J_26v1G6KemdN2KDW7YNTKwmZeJ19xUxSqxQrjElcSScFbGGUufnA_8IWNwfwFUnSJ4K8mqXuE_M3fsUj6fS-aotJ-JZeGmGCs5yVpbBWRTmnCc-yIP0B1fcpGr4aJXVwS9gwfkg')",
                    }}
                ></div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">Alex Morgan</span>
                    <span className="text-[10px] text-gray-500">Manajer Keuangan</span>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
