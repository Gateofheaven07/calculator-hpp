"use client";

import { motion } from "framer-motion";
import { Database, Sliders, FileText } from "lucide-react";

const steps = [
  {
    icon: Sliders,
    title: "Stage 1: Input Parameters",
    description: "Definisikan volume produk, jenis kemasan, dan suhu awal. Sistem memvalidasi batasan secara otomatis terhadap kapasitas bejana.",
    details: ["Perhitungan Rasio Pengisian", "Faktor kompresibilitas kemasan"],
  },
  {
    icon: Database,
    title: "Stage 2: HPP Processing",
    description: "Saksikan simulasi tekanan hingga 6000 bar. Perhitungan pemanasan adiabatik dilakukan secara real-time untuk memastikan standar keamanan pangan.",
    stats: [
        { label: "Pressure Ramp", value: "3 min" },
        { label: "Hold Time", value: "180 sec" }
    ]
  },
  {
    icon: FileText,
    title: "Stage 3: Output Results",
    description: "Verifikasi status lengkap dan tinjau throughput yang dihitung, biaya per unit, dan waktu siklus. Ekspor laporan komprehensif untuk pemangku kepentingan.",
    link: "Lihat Contoh Laporan"
  },
];

export function Pipeline() {
  return (
    <section className="py-20 bg-slate-900/20 border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                Live Simulation
            </div>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            The HPP <span className="text-blue-600">Visual Pipeline</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Visualisasikan proses tekanan secara real-time. Ikuti produk Anda melalu <br />
            tahapan siklus hidup tekanan tinggi.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
            {/* Left side - Visual Preview (Mockup) */}
            <div className="sticky top-24 z-10">
                <div className="relative rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 to-transparent opacity-50" />
                    
                    {/* Simulated circle UI */}
                     <div className="relative z-10 h-64 w-64 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
                        <div className="h-48 w-48 rounded-full border border-blue-400/50 flex items-center justify-center animate-pulse">
                            <div className="h-32 w-32 rounded-full bg-blue-500/10 blur-xl" />
                        </div>
                        {/* Floating stats cards for effect */}
                        <div className="absolute -bottom-12 right-0 rounded-lg border border-white/10 bg-slate-900/90 p-3 text-xs backdrop-blur-md">
                            <div className="text-slate-400">Temp</div>
                            <div className="font-mono text-white">5°C <span className="text-slate-600">/ 41°F</span></div>
                        </div>
                         <div className="absolute -top-4 -left-4 rounded-lg border border-white/10 bg-green-500/10 p-2 text-xs backdrop-blur-md text-green-400 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"/> ONLINE
                        </div>
                    </div>

                     <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
                         <div className="rounded-lg border border-white/10 bg-slate-900/50 p-3">
                             <div className="text-[10px] uppercase text-blue-400 mb-1">Efficiency</div>
                             <div className="font-mono text-lg text-white">98.5%</div>
                         </div>
                         <div className="rounded-lg border border-white/10 bg-slate-900/50 p-3">
                             <div className="text-[10px] uppercase text-blue-400 mb-1">Cycle Time</div>
                             <div className="font-mono text-lg text-white">185s</div>
                         </div>
                          <div className="rounded-lg border border-white/10 bg-slate-900/50 p-3">
                             <div className="text-[10px] uppercase text-green-400 mb-1">Validation</div>
                             <div className="font-mono text-lg text-white">Passed</div>
                         </div>
                     </div>
                </div>
            </div>

            {/* Right side - Steps */}
            <div className="relative space-y-12 pl-8 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-white/5 py-4">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-[43px] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900 ring-4 ring-slate-950 z-10">
                            <step.icon className="h-5 w-5 text-blue-500" />
                        </div>
                        
                        <div className="pt-1">
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-slate-400 text-base mb-6 leading-relaxed">{step.description}</p>
                            
                            {step.details && (
                                <div className="space-y-3">
                                    {step.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-sm text-blue-300/80 bg-blue-500/5 px-4 py-3 rounded-lg border border-blue-500/10">
                                            <span className="text-blue-500">✓</span> {detail}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {step.stats && (
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                     {step.stats.map((stat, idx) => (
                                         <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-lg p-3">
                                             <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                                             <div className="font-mono text-white text-lg">{stat.value}</div>
                                         </div>
                                     ))}
                                </div>
                            )}

                             {step.link && (
                                <a href="#" className="inline-flex items-center text-sm font-medium text-blue-500 hover:text-blue-400 mt-4 group">
                                    {step.link} 
                                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
