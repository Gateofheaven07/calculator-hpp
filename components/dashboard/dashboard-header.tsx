"use client";

import { useState } from "react";

export function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock Notifications
  const notifications = [
    { id: 1, title: "Laporan Baru", desc: "Laporan 'Meja Belajar' berhasil dibuat", time: "Baru saja" },
    { id: 2, title: "Update Sistem", desc: "Fitur Print kini tersedia", time: "1 jam lalu" },
    { id: 3, title: "Tips Hemat", desc: "Cek tips efisiensi bahan baku", time: "Hari ini" },
  ];

  // Calendar Helpers
  const today = new Date();
  const currentMonth = today.toLocaleString("id-ID", { month: "long", year: "numeric" });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay(); // 0 = Sunday

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-6 bg-[#0B0E14]/80 backdrop-blur-md border-b border-white/5">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Ringkasan Dasbor
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Analisis biaya dan input real-time
        </p>
      </div>
      <div className="flex items-center gap-4 relative">
        {/* Notification Button */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${showNotifications ? 'bg-white/10 text-white' : ''}`}
          >
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
            {/* Red dot indicator */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#0B0E14]"></span>
          </button>

          {/* Notification Popover */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
              <div className="absolute right-0 top-12 w-80 bg-[#1A1F2E] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-white/5 bg-white/2">
                   <h3 className="font-medium text-white">Notifikasi</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((n) => (
                        <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm text-white">{n.title}</span>
                                <span className="text-[10px] text-gray-500">{n.time}</span>
                            </div>
                            <p className="text-xs text-gray-400">{n.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="p-3 text-center border-t border-white/5 bg-white/2">
                    <button className="text-xs text-primary hover:text-primary-glow font-medium">Tandai semua dibaca</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Calendar Button */}
        <div className="relative">
            <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className={`h-10 px-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors ${showCalendar ? 'bg-white/10' : ''}`}
            >
                <span>{new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</span>
                <span className="material-symbols-outlined text-[16px]">
                expand_more
                </span>
            </button>

             {/* Calendar Popover */}
             {showCalendar && (
                <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)}></div>
                <div className="absolute right-0 top-12 w-[320px] bg-[#1A1F2E] border border-white/10 rounded-xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-medium">{currentMonth}</span>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white">
                                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                            </button>
                            <button className="p-1 hover:bg-white/5 rounded text-gray-400 hover:text-white">
                                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                            <span key={day} className="text-[10px] uppercase font-bold text-gray-500">{day}</span>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDay }).map((_, i) => (
                             <div key={`empty-${i}`} className="h-8"></div>
                        ))}
                        {days.map(day => {
                            const isToday = day === today.getDate();
                            return (
                                <button 
                                    key={day} 
                                    className={`h-8 w-full rounded flex items-center justify-center text-sm transition-colors ${
                                        isToday 
                                        ? 'bg-primary text-white font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                                        : 'text-gray-300 hover:bg-white/10'
                                    }`}
                                >
                                    {day}
                                </button>
                            )
                        })}
                    </div>
                </div>
                </>
            )}
        </div>
      </div>
    </header>
  );
}
