"use client";

import { useState, useMemo } from "react";
import { saveCalculation } from "@/app/actions/calc-actions";
import { Loader2 } from "lucide-react";

export function HPPInputForm() {
  const [productName, setProductName] = useState("");
  
  // Dynamic Lists
  const [materials, setMaterials] = useState([{ id: 1, name: "", quantity: "", price: "" }]);
  const [labor, setLabor] = useState([{ id: 1, role: "", hours: "", rate: "" }]);
  const [overhead, setOverhead] = useState([{ id: 1, name: "", amount: "" }]);
  
  const [profitMargin, setProfitMargin] = useState("20");
  const [isSaving, setIsSaving] = useState(false);

  // --- Calculations ---
  const totalMaterial = useMemo(() => {
    return materials.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0);
  }, [materials]);

  const totalLabor = useMemo(() => {
    return labor.reduce((acc, item) => acc + (Number(item.hours) * Number(item.rate)), 0);
  }, [labor]);

  const totalOverhead = useMemo(() => {
    return overhead.reduce((acc, item) => acc + Number(item.amount), 0);
  }, [overhead]);

  const totalHPP = totalMaterial + totalLabor + totalOverhead;
  const sellingPrice = totalHPP * (1 + Number(profitMargin) / 100);

  // --- Handlers ---
  const addItem = (setter: any, template: any) => {
    setter((prev: any) => [...prev, { ...template, id: Date.now() }]);
  };

  const updateItem = (setter: any, id: number, field: string, value: string) => {
    setter((prev: any) => prev.map((item: any) => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (setter: any, id: number) => {
    setter((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const handleSave = async () => {
    if (!productName) return alert("Please enter a product name");
    setIsSaving(true);
    
    const data = {
      productName,
      materials,
      labor,
      overhead,
      sellingPrice
    };

    const result = await saveCalculation(data);
    
    setIsSaving(false);
    if (result.success) {
      // Reset form
      setProductName("");
      setMaterials([{ id: Date.now(), name: "", quantity: "", price: "" }]);
      setLabor([{ id: Date.now() + 1, role: "", hours: "", rate: "" }]);
      setOverhead([{ id: Date.now() + 2, name: "", amount: "" }]);
      // You could add a toast here
    } else {
      alert("Failed to save: " + result.error);
    }
  };

  // --- Formatting ---
  const formatIDR = (val: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="glass-panel rounded-2xl p-6 xl:col-span-1 flex flex-col h-full border-t-4 border-t-primary overflow-y-auto max-h-[800px] scrollbar-thin">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary text-xl">calculate</span>
        <h3 className="text-lg font-bold text-white">Kalkulator HPP Cerdas</h3>
      </div>

      <div className="space-y-6">
        {/* Product Name */}
        <div>
           <label className="text-sm text-gray-400 font-medium mb-1 block">Nama Produk / Item</label>
           <input 
             className="input-field rounded-lg px-4 py-2 text-sm w-full" 
             placeholder="Cth: Meja Kayu Jati" 
             value={productName}
             onChange={(e) => setProductName(e.target.value)}
           />
        </div>

        {/* Materials Section */}
        <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                <h4 className="text-sm font-bold text-blue-400">Bahan Baku</h4>
                <span className="text-xs text-white bg-blue-500/20 px-2 py-0.5 rounded">{formatIDR(totalMaterial)}</span>
            </div>
            {materials.map((m, idx) => (
                <div key={m.id} className="grid grid-cols-12 gap-2 text-sm relative group">
                    <div className="col-span-12 md:col-span-5">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600" 
                         placeholder="Nama Bahan"
                         value={m.name}
                         onChange={(e) => updateItem(setMaterials, m.id, "name", e.target.value)}
                       />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600 text-right" 
                         placeholder="Harga"
                         type="number"
                         value={m.price}
                         onChange={(e) => updateItem(setMaterials, m.id, "price", e.target.value)}
                       />
                    </div>
                    <div className="col-span-3 md:col-span-3">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600 text-center" 
                         placeholder="Qty"
                         type="number"
                         value={m.quantity}
                         onChange={(e) => updateItem(setMaterials, m.id, "quantity", e.target.value)}
                       />
                    </div>
                    <div className="col-span-1 md:col-span-1 flex items-center justify-center">
                        <button onClick={() => removeItem(setMaterials, m.id)} className="text-red-400 hover:text-red-300">
                             <span className="material-symbols-outlined text-base">close</span>
                        </button>
                    </div>
                </div>
            ))}
            <button onClick={() => addItem(setMaterials, { name: "", quantity: "", price: "" })} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Tambah Bahan
            </button>
        </div>

        {/* Labor Section */}
        <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                <h4 className="text-sm font-bold text-purple-400">Tenaga Kerja</h4>
                <span className="text-xs text-white bg-purple-500/20 px-2 py-0.5 rounded">{formatIDR(totalLabor)}</span>
            </div>
            {labor.map((l) => (
                <div key={l.id} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-5">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600" 
                         placeholder="Peran"
                         value={l.role}
                         onChange={(e) => updateItem(setLabor, l.id, "role", e.target.value)}
                       />
                    </div>
                    <div className="col-span-3">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600 text-right" 
                         placeholder="Rate/Jam"
                         type="number"
                         value={l.rate}
                         onChange={(e) => updateItem(setLabor, l.id, "rate", e.target.value)}
                       />
                    </div>
                     <div className="col-span-3">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600 text-center" 
                         placeholder="Jam"
                         type="number"
                         value={l.hours}
                         onChange={(e) => updateItem(setLabor, l.id, "hours", e.target.value)}
                       />
                    </div>
                     <div className="col-span-1 flex items-center justify-center">
                        <button onClick={() => removeItem(setLabor, l.id)} className="text-red-400 hover:text-red-300">
                             <span className="material-symbols-outlined text-base">close</span>
                        </button>
                    </div>
                </div>
            ))}
             <button onClick={() => addItem(setLabor, { role: "", hours: "", rate: "" })} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Tambah Tenaga Kerja
            </button>
        </div>

        {/* Overhead Section */}
        <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                <h4 className="text-sm font-bold text-orange-400">Overhead</h4>
                <span className="text-xs text-white bg-orange-500/20 px-2 py-0.5 rounded">{formatIDR(totalOverhead)}</span>
            </div>
            {overhead.map((o) => (
                <div key={o.id} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-8">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600" 
                         placeholder="Nama Biaya (Listrik, Sewa, dll)"
                         value={o.name}
                         onChange={(e) => updateItem(setOverhead, o.id, "name", e.target.value)}
                       />
                    </div>
                    <div className="col-span-3">
                       <input 
                         className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-white placeholder-gray-600 text-right" 
                         placeholder="Jumlah"
                         type="number"
                         value={o.amount}
                         onChange={(e) => updateItem(setOverhead, o.id, "amount", e.target.value)}
                       />
                    </div>
                     <div className="col-span-1 flex items-center justify-center">
                        <button onClick={() => removeItem(setOverhead, o.id)} className="text-red-400 hover:text-red-300">
                             <span className="material-symbols-outlined text-base">close</span>
                        </button>
                    </div>
                </div>
            ))}
             <button onClick={() => addItem(setOverhead, { name: "", amount: "" })} className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span> Tambah Overhead
            </button>
        </div>

        {/* Summary & Save */}
        <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total HPP</span>
                <span className="text-white font-bold">{formatIDR(totalHPP)}</span>
            </div>
            
            <div className="flex items-center justify-between gap-4">
                 <span className="text-gray-400 text-sm">Margin (%)</span>
                 <input 
                    className="w-20 bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-right"
                    type="number"
                    value={profitMargin}
                    onChange={(e) => setProfitMargin(e.target.value)}
                 />
            </div>

            <div className="flex justify-between items-center text-lg">
                <span className="text-primary font-bold">Harga Jual</span>
                <span className="text-primary font-bold">{formatIDR(sellingPrice)}</span>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold tracking-wide mt-2"
              type="button"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : (
                  <>
                    <span className="material-symbols-outlined">save</span>
                    Simpan Kalkulasi
                  </>
              )}
            </button>
        </div>

      </div>
    </div>
  );
}
