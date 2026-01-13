"use client";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display bg-background-dark text-gray-200 min-h-screen flex items-center justify-center overflow-hidden relative selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-space-gradient -z-50" />
      
      {/* Nebulas & Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40">
        <div className="nebula bg-nebula-1 w-[1000px] h-[1000px] -top-60 -left-60 animate-pulse-slow mix-blend-screen opacity-20 blur-[120px] rounded-full absolute" />
        <div className="nebula bg-nebula-2 w-[800px] h-[800px] bottom-0 right-0 opacity-20 blur-[100px] rounded-full absolute" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md p-4 md:p-6 mx-auto z-10 flex flex-col items-center justify-center min-h-[600px]">
        
        {/* Neon Rings */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="neon-ring"></div>
            <div className="neon-ring"></div>
            <div className="neon-ring hidden lg:block"></div>
        </div>

        {children}
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={() => document.documentElement.classList.toggle('dark')}
        className="fixed top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all duration-300 focus:outline-none z-50 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
      >
        <span className="material-symbols-outlined text-xl">settings_brightness</span>
      </button>
    </div>
  );
}
