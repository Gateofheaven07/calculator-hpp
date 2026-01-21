import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { getUser } from "@/lib/auth-service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="flex flex-col md:flex-row bg-background-dark min-h-screen overflow-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <Sidebar user={user} />
      <MobileNav user={user} />
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col h-screen md:h-auto">
        {children}
      </main>
    </div>
  );
}
