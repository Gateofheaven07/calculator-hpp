"use client";

import {
  AreaChart,
  Area,
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
      <div className="flex items-center justify-between mb-6">
        <div>
            <h3 className="text-lg font-medium text-white">Tren Biaya Produksi</h3>
            <p className="text-sm text-gray-400">Analisis total biaya per periode</p>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
            />
            <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickFormatter={formatIDR}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
            />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: '#0B0E14', 
                    borderColor: '#ffffff10', 
                    borderRadius: '12px', 
                    color: '#fff',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                itemStyle={{ color: '#60a5fa' }}
                cursor={{ stroke: '#ffffff20' }}
                formatter={(value: any) => [new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value), "Total Biaya"]}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
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
