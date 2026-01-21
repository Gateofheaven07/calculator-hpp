"use client";

import { useActionState } from "react";
import { updateProfile, logout, changePassword } from "@/app/actions/auth-actions";
import { useState, useRef } from "react";

interface SettingsFormProps {
  initialUser: {
    name: string;
    email: string;
    phoneNumber?: string | null;
    image?: string | null;
  };
}

function SettingsForm({ initialUser }: SettingsFormProps) {
  const [profileState, profileAction, isProfilePending] = useActionState(updateProfile, null);
  const [passwordState, passwordAction, isPasswordPending] = useActionState(changePassword, null);
  
  const [userName, setUserName] = useState(initialUser.name);
  const [userPhone, setUserPhone] = useState(initialUser.phoneNumber || "");
  const [userImage, setUserImage] = useState(initialUser.image || "");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
          alert("Ukuran file maksimal 1MB");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <section className="glass-panel p-6 rounded-2xl">
        <h2 className="text-lg font-medium text-white mb-1">Profil Saya</h2>
        <p className="text-sm text-gray-400 mb-6">Kelola informasi akun Anda</p>
        
        <form action={profileAction} className="space-y-6 max-w-xl">
          {/* Photo Upload */}
          <div className="flex items-center gap-6">
            <div className="relative group">
                <div 
                    className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: userImage ? `url(${userImage})` : undefined }}
                >
                    {!userImage && (
                        <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                    )}
                </div>
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white hover:bg-primary-glow transition-colors shadow-lg"
                >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleImageChange}
                />
                <input type="hidden" name="image" value={userImage} />
            </div>
            <div>
                <h3 className="text-white font-medium">Foto Profil</h3>
                <p className="text-xs text-gray-500 mt-1">Format: JPG, PNG. Maks 1MB.</p>
            </div>
          </div>

          <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nama Lengkap</label>
                <input
                  name="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Nama Anda"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={initialUser.email}
                  readOnly
                  disabled
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-gray-500 cursor-not-allowed"
                />
                <p className="textxs text-gray-500">Email tidak dapat diubah</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Nomor Telepon</label>
                <input
                  name="phoneNumber"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="+62..."
                />
              </div>
          </div>

          {profileState?.error && (
            <p className="text-red-500 text-sm">{profileState.error}</p>
          )}
          
          {profileState?.success && (
            <p className="text-green-500 text-sm">Profil berhasil diperbarui</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProfilePending}
              className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-glow text-white font-medium transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProfilePending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </section>

      {/* Password Section */}
      <section className="glass-panel p-6 rounded-2xl">
        <h2 className="text-lg font-medium text-white mb-1">Keamanan</h2>
        <p className="text-sm text-gray-400 mb-6">Ubah kata sandi akun Anda</p>
        
        <form action={passwordAction} className="space-y-4 max-w-xl">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Kata Sandi Baru</label>
                <input
                  name="newPassword"
                  type="password"
                  className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Minimal 6 karakter"
                />
            </div>

            {passwordState?.error && (
                <p className="text-red-500 text-sm">{passwordState.error}</p>
            )}
            
            {passwordState?.success && (
                <p className="text-green-500 text-sm">Kata sandi berhasil diubah</p>
            )}

            <div className="pt-2">
                <button
                type="submit"
                disabled={isPasswordPending}
                className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                >
                {isPasswordPending ? "Memproses..." : "Ganti Kata Sandi"}
                </button>
            </div>
        </form>
      </section>

      {/* Account Actions */}
      <section className="glass-panel p-6 rounded-2xl border border-red-500/20">
        <h2 className="text-lg font-medium text-white mb-1">Zona Bahaya</h2>
        <p className="text-sm text-gray-400 mb-6">Aksi yang tidak dapat dibatalkan</p>
        
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-white font-medium">Keluar dari Aplikasi</h3>
                <p className="text-xs text-gray-500 mt-1">Sesi Anda akan berakhir di perangkat ini</p>
            </div>
            <button
                onClick={() => setShowLogoutConfirm(true)}
                className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-colors text-sm font-medium"
            >
                Keluar (Logout)
            </button>
        </div>
      </section>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="bg-[#1A1F2B] border border-white/10 rounded-xl p-6 w-full max-w-sm relative z-10 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-2xl">logout</span>
                </div>
                <h3 className="text-lg font-bold text-white">Konfirmasi Logout</h3>
                <p className="text-gray-400 text-sm">
                    Apakah Anda yakin ingin keluar dari aplikasi? Sesi Anda akan berakhir.
                </p>
            </div>
            
            <div className="flex gap-3 mt-6">
                <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Batal
                </button>
                <button 
                    onClick={() => logout()}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-red-500/20"
                >
                    Ya, Keluar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SettingsForm };
