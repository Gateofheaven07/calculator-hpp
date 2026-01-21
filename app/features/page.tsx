import { Navbar } from "@/components/landing/navbar";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] font-display">
      <Navbar />
      <div className="pt-20">
         <Features />
      </div>
      <Footer />
    </div>
  );
}
