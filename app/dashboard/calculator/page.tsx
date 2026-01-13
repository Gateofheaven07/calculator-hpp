import { StandardCalculator } from "@/components/dashboard/standard-calculator";

export default function CalculatorPage() {
  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full pb-20 flex flex-col items-center justify-center min-h-[80vh]">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
          Kalkulator
        </h2>
        <p className="text-gray-400">
          Alat hitung cepat untuk kebutuhan harian
        </p>
      </header>

      <StandardCalculator />
    </div>
  );
}
