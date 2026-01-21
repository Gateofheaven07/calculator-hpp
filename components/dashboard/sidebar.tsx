import Link from "next/link";

// ... imports

interface SidebarProps {
  user?: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const userName = user?.name || "User";
  const userImage = user?.image;

  return (
    <aside className="hidden md:flex w-64 flex-col z-20 border-r border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl shrink-0 min-h-screen h-full">
      <div className="p-6 flex items-center gap-3">
        <img src="/logo_calc.png" alt="HPP Calculator Logo" className="h-10 w-10 object-contain" />
        <div>
          <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
            HPP Calculator
          </h1>
          <p className="text-xs text-gray-400">Pro Dashboard</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 text-white group relative overflow-hidden"
          href="/dashboard"
        >
          <div className="absolute inset-0 bg-primary/10 w-0 group-hover:w-full transition-all duration-300"></div>
          <span className="material-symbols-outlined relative z-10 text-primary-glow">
            dashboard
          </span>
          <span className="text-sm font-medium relative z-10">Dasbor</span>
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          href="/dashboard/reports"
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-sm font-medium">Laporan</span>
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          href="/dashboard/materials"
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-sm font-medium">Perpustakaan Bahan</span>
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          href="/dashboard/history"
        >
          <span className="material-symbols-outlined">history</span>
          <span className="text-sm font-medium">Riwayat</span>
        </Link>
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          href="/dashboard/calculator"
        >
          <span className="material-symbols-outlined">calculate</span>
          <span className="text-sm font-medium">Kalkulator</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-white/5">
        <Link
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          href="/dashboard/settings"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Pengaturan</span>
        </Link>
        <div className="mt-4 flex items-center gap-3 px-4">
          <div
            className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10 bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: userImage ? `url(${userImage})` : undefined,
            }}
          >
             {!userImage && (
                <span className="material-symbols-outlined text-sm text-white">person</span>
             )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white line-clamp-1">{userName}</span>
            <span className="text-[10px] text-gray-500">Manajer Keuangan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
