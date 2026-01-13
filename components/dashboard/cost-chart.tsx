"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CostChartProps {
  data: {
    name: string;
    total: number;
    pv: number;
    amt: number;
  }[];
}

export function CostChart({ data }: CostChartProps) {
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      notation: "compact", 
    }).format(value);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 xl:col-span-2 flex flex-col h-[400px]">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
            />
            <YAxis 
                stroke="#9ca3af" 
                fontSize={12}
                tickFormatter={formatIDR}
                tickLine={false}
                axisLine={false}
                domain={[0, 'auto']}
            />
            <Tooltip 
                contentStyle={{ backgroundColor: '#0B0E14', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#3b82f6' }}
                formatter={(value: any) => [new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value), "Total"]}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4, stroke: "#1f2937" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {data.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-500 text-sm">Belum ada data untuk periode ini.</p>
          </div>
      )}
    </div>
  );
}
