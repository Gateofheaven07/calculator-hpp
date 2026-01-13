import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#222f49] bg-[#101623] px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row px-4">
        <p className="text-sm text-slate-500">© 2024 HPP Calc. Hak cipta dilindungi undang-undang.</p>
        <div className="flex gap-6">
          <Link className="text-slate-500 hover:text-white transition-colors text-sm" href="#">Privasi</Link>
          <Link className="text-slate-500 hover:text-white transition-colors text-sm" href="#">Syarat</Link>
          <Link className="text-slate-500 hover:text-white transition-colors text-sm" href="#">Kontak</Link>
        </div>
      </div>
    </footer>
  );
}
