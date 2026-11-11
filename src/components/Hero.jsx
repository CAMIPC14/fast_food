import React from 'react';
import { ArrowRight, Flame, Star, Award, Bike } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#12161a] overflow-hidden">
      {/* Glow effects in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Sabor irresistible • 100% Carne Angus</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Tu Lugar Favorito para Comida{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Rápida y Deliciosa!
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              En <strong className="text-amber-400 font-semibold">Bomgo</strong> transformamos la comida rápida en una experiencia gourmet: panes brioche horneados hoy, queso cheddar fundido al instante y salsas secretas de la casa.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-base px-8 py-4 rounded-full shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-1 active:translate-y-0"
              >
                <span>Ordenar Ahora</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#promos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium text-base px-7 py-4 rounded-full border border-white/15 transition-all hover:border-amber-400/40"
              >
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Ver Promociones</span>
              </a>
            </div>

            {/* Stats / Proof */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">30 min</div>
                <div className="text-xs text-gray-400">Delivery Express</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <div className="text-xs text-gray-400">+2,500 Clientes</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-display">100%</div>
                <div className="text-xs text-gray-400">Carne Artesanal</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Burger */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual backdrop circle */}
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-amber-400/20 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
              
              {/* Radial gradient backing */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-500/20 to-transparent backdrop-blur-sm" />

              {/* Main Burger Image (floating effect) */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <img
                  src="/images/burger-hero.jpg"
                  alt="Bomgo Burger Especial"
                  className="w-[90%] h-[90%] object-cover rounded-full shadow-2xl border-4 border-amber-400/40 shadow-black/80"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Floating Badge 1: Delivery Gratis */}
              <div className="absolute -top-2 -left-4 sm:top-4 sm:-left-6 bg-[#1a2027]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Delivery Express</div>
                  <div className="text-[11px] text-amber-400 font-medium">Llega caliente a tu puerta</div>
                </div>
              </div>

              {/* Floating Badge 2: Best Burger Award */}
              <div className="absolute -bottom-4 right-0 sm:bottom-4 sm:-right-4 bg-[#1a2027]/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Top Fast Food 2026</div>
                  <div className="text-[11px] text-gray-300">Premio a la Calidad</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
