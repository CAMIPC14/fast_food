import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      role: 'Amante de las Burgers',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      comment: 'La hamburguesa doble de Bomgo es de otro planeta. El pan brioche aguanta perfecto los jugos y la salsa secreta es adictiva. Sin duda mi nuevo lugar favorito.',
      rating: 5,
      dish: 'Hamburguesa Doble'
    },
    {
      id: 2,
      name: 'Valeria Rivas',
      role: 'Cliente Frecuente',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'El delivery llegó en exactamente 22 minutos, todo caliente y las papas súper crocantes con queso cheddar. Se nota la dedicación y el cuidado en el empaque.',
      rating: 5,
      dish: 'Combo Bomgo Dúo'
    },
    {
      id: 3,
      name: 'Diego Alarcón',
      role: 'Foodie & Creador',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      comment: 'La Bomgo Crispy Chicken supera a cualquier franquicia internacional. Pollo jugoso, rebozado crocante y la limonada frozen es el complemento ideal.',
      rating: 5,
      dish: 'Bomgo Crispy Chicken'
    }
  ];

  return (
    <section className="py-20 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-amber-500 font-script text-2xl font-bold block">
            Testimonios Reales
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f24] font-display mt-1">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            La opinión de quienes disfrutan la experiencia Bomgo todos los días en local y por delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-7 shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col justify-between relative hover:-translate-y-1 transition-transform"
            >
              <Quote className="w-8 h-8 text-amber-200 absolute top-6 right-6" />

              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{r.name}</h4>
                  <p className="text-[11px] text-gray-500">{r.role} • <span className="text-amber-600 font-semibold">{r.dish}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

