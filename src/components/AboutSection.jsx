import React from 'react';
import { Sparkles, CheckCircle2, Flame, Award, HeartHandshake } from 'lucide-react';

export const AboutSection = () => {
  const highlights = [
    'Carne Angus certificada fresca molida a diario',
    'Pan brioche con mantequilla horneado cada mañana',
    'Queso cheddar importado de maduración óptima',
    'Salsas de autor sin conservantes artificiales'
  ];

  return (
    <section id="nosotros" className="py-20 bg-[#fdfaf5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Dual Imagery Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main large image */}
              <div className="relative z-10 w-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-200">
                <img
                  src="/images/about-1.jpg"
                  alt="Hamburguesa Bomgo Gourmet"
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/burger-clasica.jpg';
                  }}
                />
              </div>

              {/* Overlapping secondary image */}
              <div className="absolute -bottom-8 right-0 z-20 w-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 bg-gray-200">
                <img
                  src="/images/about-2.jpg"
                  alt="Complementos y Acompañamientos Bomgo"
                  className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/papas-cheddar.jpg';
                  }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute top-4 -right-2 z-30 bg-[#1e2329] text-white p-3.5 rounded-2xl shadow-xl border border-amber-400/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-black font-black">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-400">Receta Original</div>
                  <div className="text-[11px] text-gray-300">Pasión en cada mordisco</div>
                </div>
              </div>

            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Nuestra Esencia
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1a1f24] font-display tracking-tight leading-tight">
              Favoritos Culinarios que <span className="text-amber-500 underline decoration-amber-300">Cautivan</span> tu Paladar.
            </h2>

            <p className="text-gray-600 text-base leading-relaxed">
              En <strong className="text-gray-900 font-bold">Bomgo</strong> creemos que la comida rápida no tiene que sacrificar la calidad. Nacimos con la misión de brindar hamburguesas smash con la jugosidad perfecta, papas con el crujido ideal y un servicio tan veloz como amable.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Quote / Highlight */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 flex items-center gap-4">
              <HeartHandshake className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-amber-950 italic font-medium">
                "Cada hamburguesa sale de nuestra cocina como si fuera para nuestra propia familia. Ese es el sello Bomgo."
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 bg-[#1b2026] hover:bg-black text-amber-400 hover:text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg transition-all"
              >
                <span>Explorar Menú</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
