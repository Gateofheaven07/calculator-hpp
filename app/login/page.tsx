"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { GoogleButton } from "@/components/auth/google-button";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "@/app/actions/auth-actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <AuthLayout>
      <div className="relative z-20 w-full backdrop-blur-2xl bg-[#0f172a]/70 rounded-[2rem] p-6 border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 overflow-hidden">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        <div className="flex flex-col items-center mb-6">
            <span className="material-symbols-outlined text-5xl text-primary mb-2 animate-pulse-slow" style={{ textShadow: "0 0 20px #FF5E62" }}>rocket_launch</span>
            <h1 className="text-3xl font-bold text-center text-white tracking-wide mt-1 drop-shadow-lg">Access Terminal</h1>
            <p className="text-center text-gray-300 text-sm font-mono mt-1 tracking-wider">Enter your credentials</p>
        </div>

        <form action={action} className="space-y-4">
            {state?.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                    {state.error}
                </div>
            )}
            
            <div className="group relative">
                <input 
                    className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-primary focus:bg-black/60 focus:ring-1 focus:ring-primary transition-all duration-300 peer shadow-inner" 
                    id="email" 
                    name="email"
                    placeholder="Email" 
                    required 
                    type="email"
                />
                <label 
                    className="absolute left-5 -top-2.5 bg-[#0f172a] px-2 text-xs text-primary transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0f172a] peer-focus:left-4 font-medium rounded-full" 
                    htmlFor="email"
                >
                    Email Address
                </label>
            </div>
            
            <div className="group relative">
                <input 
                    className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-primary focus:bg-black/60 focus:ring-1 focus:ring-primary transition-all duration-300 peer shadow-inner" 
                    id="password" 
                    name="password"
                    placeholder="Password" 
                    required 
                    type="password"
                />
                <label 
                    className="absolute left-5 -top-2.5 bg-[#0f172a] px-2 text-xs text-primary transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:left-5 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-[#0f172a] peer-focus:left-4 font-medium rounded-full" 
                    htmlFor="password"
                >
                    Password
                </label>
            </div>

            <button 
                disabled={isPending}
                className="w-full py-3 mt-4 rounded-xl btn-gradient text-white font-bold text-lg tracking-widest uppercase hover:tracking-[0.2em] transition-all duration-300 transform active:scale-95 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center" 
                type="submit"
            >
                {isPending ? <Loader2 className="animate-spin" /> : "Access System"}
            </button>

            <div className="flex justify-between items-center text-sm mt-6 px-2 font-mono">
                <span className="text-gray-400">New user?</span>
                <Link className="font-bold text-accent-yellow hover:text-primary transition-colors hover:shadow-[0_2px_0_currentColor]" href="/register">Initialize Setup →</Link>
            </div>
        </form>
        
        <div className="mt-8">
            <GoogleButton>Sign in with Google</GoogleButton>
        </div>

        <Link href="/" className="mt-8 flex items-center justify-center text-xs text-slate-500 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-3 w-3" /> Back to Home
        </Link>
      </div>
    </AuthLayout>
  );
}
