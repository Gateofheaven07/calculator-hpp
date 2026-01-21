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


    </div>
  );
}
