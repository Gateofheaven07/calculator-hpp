import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getUser } from "@/lib/auth-service";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
      // In real app, middleware handles this, or we redirect here
      return <div className="p-8 text-white">Unauthorized</div>; 
  }

  // Handle null name
  const safeUser = {
      name: user.name || "",
      email: user.email,
      phoneNumber: user.phoneNumber,
      image: user.image
  };

  return (
    <>
      <DashboardHeader />
      <div className="p-8 max-w-[1400px] mx-auto w-full pb-20">
        <h1 className="text-2xl font-bold text-white mb-6">Pengaturan Akun</h1>
        <SettingsForm initialUser={safeUser} />
      </div>
    </>
  );
}
