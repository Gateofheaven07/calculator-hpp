import Link from "next/link";
import Head from "next/head";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { CTASection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen font-display overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-background-dark/30 border-b border-white/5">
        {/* ... (existing navigation code) ... */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(13,89,242,0.5)]">
                <span className="material-symbols-outlined text-white text-2xl">calculate</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">HPP Calculator</span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Fitur</Link>
              <Link className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Kalkulator</Link>
              <Link className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Tentang</Link>
            </div>
            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden md:flex text-sm font-bold text-gray-300 hover:text-white transition-colors px-4 py-2">
                Login
              </Link>
              <Link href="/register" className="relative group overflow-hidden rounded-lg bg-white/5 border border-white/10 px-5 py-2 transition-all hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(13,89,242,0.3)]">
                <span className="relative z-10 text-sm font-bold text-white">Daftar</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Layer: Abstract Numbers & Grid */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* Using a gradient map to simulate "comet numbers" or digital rain feel */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-screen" 
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuANEFHE2QUCEzhObyLKmlJWPEpcOKexElZ07i89JbnbwSdBPW1zdGY6oLbvwusFP5S1jNw1SYuGC7tYVpk55hJC9czVj1jH1zAjkBHhKUjRAV_U3WApyJreHFGMKTsCac0_eLZEU71-6wv1SfTqivSPnxnQ0pDI0TWkP6Vh00CXmgQfTJHYvCWAexeBB2xG03rt23S27V7Ee4GIuUb3Rf5mOkE-XqUjjFsCNy5fFuxJxFDE9Dg00f6nUkjFTZ_sdTHKUTq39STupys')"
            }}
            data-alt="Abstract falling digital numbers matrix style dark background"
          >
          </div>
          {/* Vignette to focus center */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-background-dark"></div>
        </div>

        {/* Floating Parallax Symbols (Decorative) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <span className="absolute top-1/4 left-[10%] text-6xl text-primary font-bold blur-[2px] animate-float opacity-10">+</span>
          <span className="absolute bottom-1/3 right-[15%] text-8xl text-neon-gold font-bold blur-[4px] animate-float-delayed opacity-10">%</span>
          <span 
            className="absolute top-1/3 right-[10%] text-4xl text-primary font-bold blur-[1px] animate-float opacity-20" 
            style={{ animationDuration: "8s" }}
          >=</span>
          <span className="absolute bottom-[20%] left-[20%] text-5xl text-white font-bold blur-[3px] animate-float-delayed opacity-5">Rp</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Typography */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto lg:mx-0 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Algoritma V2.0 Live</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              Revolusi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#0d59f2] text-glow-blue">Perhitungan HPP</span> <br/>
              Anda
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hitung profitabilitas produk Anda dengan presisi algoritma modern. 
              <span className="text-white font-medium"> Cepat, akurat, dan otomatis </span> 
              mengubah data kompleks menjadi keputusan bisnis yang cerdas.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
              <button className="group relative flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-base font-bold shadow-lg btn-glow-orange transition-all hover:scale-105 active:scale-95">
                <span className="material-symbols-outlined group-hover:animate-bounce">rocket_launch</span>
                Mulai Sekarang
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              <button className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium">
                <span className="material-symbols-outlined text-primary">play_circle</span>
                Lihat Demo
              </button>
            </div>
            
            {/* Social Proof / Stats */}
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start pt-6 border-t border-white/5">
              <div>
                <p className="text-2xl font-bold text-white">99.8%</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Akurasi</p>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div>
                <p className="text-2xl font-bold text-white">2.5k+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Bisnis Aktif</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual Centerpiece */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 h-[400px] lg:h-[600px] w-full scene">
            {/* Background Glow for Cube */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20"></div>
            
            {/* 3D Cube Container */}
            <div 
                className="cube w-48 h-48 md:w-64 md:h-64 animate-spin-slow"
                style={{ transformStyle: 'preserve-3d' }}
             >
              {/* Front */}
              <div className="cube-face transform translate-z-[96px] md:translate-z-[128px]">
                <span className="text-4xl font-bold text-white/90">HPP</span>
              </div>
              {/* Back */}
              <div className="cube-face transform -translate-z-[96px] md:-translate-z-[128px] rotate-y-180">
                <div className="grid grid-cols-2 gap-2 p-4 w-full">
                   <div className="h-2 bg-primary rounded w-full opacity-50"></div>
                   <div className="h-2 bg-primary rounded w-2/3 opacity-30"></div>
                   <div className="h-2 bg-primary rounded w-3/4 opacity-40"></div>
                </div>
              </div>
              {/* Right */}
              <div className="cube-face transform rotate-y-90 translate-z-[96px] md:translate-z-[128px]">
                <span className="text-3xl font-bold text-neon-gold text-glow-gold">98%</span>
              </div>
              {/* Left */}
              <div className="cube-face transform rotate-y--90 translate-z-[96px] md:translate-z-[128px]">
                <span className="material-symbols-outlined text-5xl text-primary drop-shadow-[0_0_10px_rgba(13,89,242,0.8)]">trending_up</span>
              </div>
              {/* Top */}
              <div className="cube-face transform rotate-x-90 translate-z-[96px] md:translate-z-[128px]">
                <div className="w-12 h-12 rounded-full border-2 border-primary border-dashed animate-spin"></div>
              </div>
              {/* Bottom */}
              <div className="cube-face transform rotate-x--90 translate-z-[96px] md:translate-z-[128px]">
                <span className="text-xs text-white/50 tracking-[0.2em]">PROCESSING</span>
              </div>
              
              {/* Floating Elements Inside Cube (Simulated by positioning in center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-preserve-3d">
                <div className="w-20 h-20 bg-primary rounded-full blur-xl animate-pulse opacity-30"></div>
              </div>
            </div>

            {/* Orbiting Rings */}
            <div 
              className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-white/5 rounded-full animate-spin-slow" 
              style={{
                animationDuration: "15s",
                borderTopColor: "rgba(13,89,242,0.5)"
              }}
            ></div>
            <div 
              className="absolute w-[250px] h-[250px] md:w-[340px] md:h-[340px] border border-white/5 rounded-full animate-spin-slow" 
              style={{
                animationDuration: "25s",
                animationDirection: "reverse",
                borderBottomColor: "rgba(255, 215, 0, 0.3)"
              }}
            ></div>
          </div>
        </div>
      </div>

      <Features />
      <PipelineSection />
      <CTASection />
      <Footer />
    </div>
  );
}
