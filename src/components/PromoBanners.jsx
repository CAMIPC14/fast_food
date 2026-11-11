import React from 'react';
import { ShoppingCart, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromoBanners = ({ onQuickAdd }) => {
  const { currencySymbol } = useCart();

  const promos = [
    {
      id: 'promo-1',
      tag: 'Jueves Bomgo',
      descuento: '20% OFF',
      titulo: 'Hamburguesas Dobles',
      descripcion: 'Doble carne Angus premium con queso fundido y tocino crujiente.',
      precioOriginal: 22.00,
      precioPromo: 17.60,
      productId: 2,
      imagen: '/images/burger-doble.jpg',
      bgColor: 'from-[#1e232a] to-[#12161b]',
    },
    {
      id: 'promo-2',
      tag: 'Pizza & Friends',
      descuento: '15% OFF',
      titulo: 'Pizza Pepperoni Fest',
      descripcion: 'Masa artesanal a la piedra, doble queso mozzarella y salsa pomodoro.',
      precioOriginal: 28.00,
      precioPromo: 23.80,
      productId: 12,
      imagen: '/images/pizza-pepperoni.jpg',
      bgColor: 'from-[#232931] to-[#14181e]',
    }
  ];

  return (
    <section id="promos" className="py-12 bg-[#fdfaf5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            Ofertas de la Semana
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f24] font-display">
            Promociones Exclusivas Bomgo
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Aprovecha nuestros descuentos especiales de tiempo limitado directamente para delivery o para llevar.
          </p>
        </div>

        {/* 2 Banner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative rounded-3xl bg-gradient-to-r ${promo.bgColor} p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all duration-300 group`}
            >
              {/* Background ambient glow */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                
                {/* Circular dish image with highlight border */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-2xl group-hover:scale-105 transition-transform duration-300 bg-[#28303c]">
                    <img
                      src={promo.imagen}
                      alt={promo.titulo}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80';
                      }}
                    />
                  </div>
                  {/* Discount badge */}
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                    {promo.descuento}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider font-script text-lg">
                    {promo.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {promo.titulo}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
                    {promo.descripcion}
                  </p>

                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                    <span className="text-xl sm:text-2xl font-black text-amber-400">
                      {currencySymbol} {promo.precioPromo.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {currencySymbol} {promo.precioOriginal.toFixed(2)}
                    </span>

                    <button
                      onClick={() => onQuickAdd(promo.productId)}
                      className="ml-auto inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs px-4 py-2.5 rounded-full shadow-md shadow-amber-400/20 transition-transform active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 fill-black" />
                      <span>Pedir Promo</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
