"use client";

import { useState, useRef, useEffect } from "react";
import { deleteEntry, updateEntry } from "@/app/actions/entries-actions";

type EntryType = 'material' | 'labor' | 'overhead';

interface EntryActionsProps {
  id: string;
  type: EntryType;
  initialData: {
    name: string;
    quantity: number;
    price: number;
  };
}

export function EntryActions({ id, type, initialData }: EntryActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Edit State
  const [formData, setFormData] = useState(initialData);

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPos({
            top: rect.bottom + 4, // 4px offset
            right: window.innerWidth - rect.right,
        });
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown on scroll to prevent floating weirdly
  useEffect(() => {
    const handleScroll = () => {
        if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus entri ini?")) return;
    
    setIsDeleting(true);
    const result = await deleteEntry(id, type);
    setIsDeleting(false);

    if (!result.success) {
      alert(result.error);
    }
  };

  const handleUpdate = async () => {
      setIsSaving(true);
      const result = await updateEntry(id, type, formData);
      setIsSaving(false);

      if (result.success) {
          setIsEditOpen(false);
          setIsOpen(false);
      } else {
          alert(result.error);
      }
  };

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={toggleDropdown}
        className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">more_vert</span>
      </button>

      {/* Dropdown Menu - Fixed Position to escape overflow */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            style={{ 
                position: 'fixed', 
                top: dropdownPos.top, 
                right: dropdownPos.right,
            }}
            className="w-32 bg-[#1A1F2B] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden text-sm animate-in fade-in zoom-in-95 duration-100"
          >
            <button 
              onClick={() => { setIsEditOpen(true); setIsOpen(false); }}
              className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              Edit
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              {isDeleting ? "..." : "Hapus"}
            </button>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditOpen(false)} />
             <div className="bg-[#1A1F2B] border border-white/10 rounded-xl p-6 w-full max-w-md relative z-10 space-y-4 shadow-2xl">
                <h3 className="text-lg font-bold text-white">Edit Entri</h3>
                
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Nama Item / Peran</label>
                        <input 
                            className="input-field rounded-lg px-3 py-2 text-sm w-full"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                {type === 'labor' ? 'Rate / Jam' : 'Harga Satuan'}
                            </label>
                            <input 
                                type="number"
                                className="input-field rounded-lg px-3 py-2 text-sm w-full"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">
                                {type === 'labor' ? 'Jam Kerja' : 'Kuantitas'}
                            </label>
                            <input 
                                type="number"
                                className="input-field rounded-lg px-3 py-2 text-sm w-full"
                                value={formData.quantity}
                                onChange={e => setFormData({...formData, quantity: Number(e.target.value)})}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button 
                        onClick={() => setIsEditOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={handleUpdate}
                        disabled={isSaving}
                        className="btn-primary px-4 py-2 rounded-lg text-sm text-white font-medium"
                    >
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
}
