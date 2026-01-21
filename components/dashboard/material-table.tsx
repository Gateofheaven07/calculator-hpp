"use client";

import { deleteMaterial } from "@/app/actions/material-actions";
import { useState } from "react";

interface Material {
  id: string;
  name: string;
  category: string | null;
  unit: string;
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export function MaterialTable({ materials }: { materials: Material[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus bahan ini?")) return;
    
    setDeletingId(id);
    const result = await deleteMaterial(id);
    setDeletingId(null);

    if (!result.success) {
      alert(result.error);
    }
  };

  if (materials.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-3xl text-gray-400">
            inventory_2
          </span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">
          Database Bahan Kosong
        </h3>
        <p className="text-gray-400 max-w-md">
            Mulai tambahkan bahan baku yang sering digunakan untuk mempercepat perhitungan HPP Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                        <th className="px-6 py-4 font-medium text-gray-400">Nama Bahan</th>
                        <th className="px-6 py-4 font-medium text-gray-400">Kategori</th>
                        <th className="px-6 py-4 font-medium text-gray-400">Satuan</th>
                        <th className="px-6 py-4 font-medium text-gray-400 text-right">Harga</th>
                        <th className="px-6 py-4 font-medium text-gray-400 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {materials.map((material) => (
                        <tr key={material.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white font-medium">{material.name}</td>
                            <td className="px-6 py-4 text-gray-300">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                    material.category === 'Bahan Baku' ? 'bg-blue-500/10 text-blue-400' :
                                    material.category === 'Kemasan' ? 'bg-purple-500/10 text-purple-400' :
                                    'bg-gray-500/10 text-gray-400'
                                }`}>
                                    {material.category || '-'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-300">{material.unit}</td>
                            <td className="px-6 py-4 text-white text-right font-mono">
                                Rp {material.price.toLocaleString("id-ID")}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => handleDelete(material.id)}
                                    disabled={deletingId === material.id}
                                    className="p-1 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                    title="Hapus"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {deletingId === material.id ? 'hourglass_top' : 'delete'}
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}
