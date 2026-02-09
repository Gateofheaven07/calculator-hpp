import { RecentEntriesTable } from "@/components/dashboard/recent-entries";
import { getUser } from "@/lib/auth-service";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Riwayat Aktivitas
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Catatan lengkap perhitungan yang telah dilakukan
        </p>
      </header>
      
      {/* We reuse the table component here. Ideally we would want a full table without the "Recent" limit, but for now this works as a v1 */}
      <RecentEntriesTable userId={user.id} />
    </div>
  );
}
