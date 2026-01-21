"use client";

import { useState } from "react";
import { AddMaterialDialog } from "./add-material-dialog";

export function MaterialsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
            Perpustakaan Bahan
            </h2>
            <p className="text-sm text-gray-400 mt-1">
            Kelola database bahan baku dan harga
            </p>
        </div>
        <button 
            onClick={() => setIsDialogOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Tambah Bahan
        </button>
      </header>

      <AddMaterialDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
}
