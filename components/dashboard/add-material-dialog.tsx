"use client";

import { useState } from "react";
import { createMaterial } from "@/app/actions/material-actions";

export function AddMaterialDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Bahan Baku",
    unit: "kg",
    price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createMaterial(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setFormData({ name: "", category: "Bahan Baku", unit: "kg", price: 0 });
      onClose();
    } else {
      alert(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="bg-[#1A1F2B] border border-white/10 rounded-xl p-6 w-full max-w-md relative z-10 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-white">Tambah Bahan Baru</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Nama Bahan</label>
                <input 
                    required
                    className="input-field rounded-lg px-3 py-2 text-sm w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Tepung Terigu"
                />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div>
                     <label className="text-xs text-gray-400 mb-1 block">Kategori</label>
                     <select 
                        className="input-field rounded-lg px-3 py-2 text-sm w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                     >
                        <option value="Bahan Baku">Bahan Baku</option>
                        <option value="Bahan Penolong">Bahan Penolong</option>
                        <option value="Kemasan">Kemasan</option>
                     </select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Satuan</label>
                    <input 
                        required
                        className="input-field rounded-lg px-3 py-2 text-sm w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                        value={formData.unit}
                        onChange={e => setFormData({...formData, unit: e.target.value})}
                        placeholder="kg, liter, pcs"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-gray-400 mb-1 block">Harga per Satuan (Rp)</label>
                <input 
                    required
                    type="number"
                    min="0"
                    className="input-field rounded-lg px-3 py-2 text-sm w-full bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-2 border-t border-white/5">
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Menyimpan..." : "Simpan Bahan"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
