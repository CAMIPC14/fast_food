import React from 'react';
import { ShoppingCart, Star, Clock, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onOpenDetail }) => {
  const { addToCart, cart, currencySymbol } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative bg-[#222831] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 border border-white/5 hover:border-amber-400/40 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
    >
      {/* Top Half: Light/Dark Dish Stage with Floating Image */}
      <div className="relative pt-6 pb-4 px-6 bg-[#2a303c]/60 flex items-center justify-center overflow-hidden">
        
        {/* Background glow behind image */}
        <div className="absolute w-28 h-28 bg-amber-400/15 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

        {/* Product Image */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#333a48] group-hover:border-amber-400 transition-colors duration-300 shadow-xl bg-[#1b2027]">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // Fallback en caso de cualquier error
              e.target.src = '/images/burger-clasica.jpg';
            }}
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.etiqueta && (
            <span className="bg-amber-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
              {product.etiqueta}
            </span>
          )}
          {!product.disponible && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Agotado
            </span>
          )}
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[11px] font-bold text-amber-300 flex items-center gap-1 border border-white/10">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating || 4.8}</span>
        </div>

        {/* Hover Quick View Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-white/90 text-black text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" />
            Ver Detalles
          </span>
        </div>
      </div>

      {/* Bottom Half: Dish Information & Action */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-2 text-gray-400 text-[11px] mb-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{product.tiempo || '10-15 min'}</span>
            <span>•</span>
            <span className="text-gray-300 font-mono text-[10px]">SQL ID #{product.id}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 font-display">
            {product.nombre}
          </h3>

          <p className="text-gray-300 text-xs line-clamp-2 mt-1 leading-relaxed">
            {product.descripcion}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-gray-400 block">Precio</span>
            <span className="text-xl font-extrabold text-amber-400 font-display">
              {currencySymbol} {Number(product.precio).toFixed(2)}
            </span>
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={handleAdd}
            disabled={!product.disponible}
            title={product.disponible ? 'Añadir al carrito' : 'No disponible'}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md transform active:scale-90 ${
              cartItem
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/25'
            } ${!product.disponible ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {cartItem ? (
              <div className="flex flex-col items-center">
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="text-[9px] font-black">{cartItem.cantidad}</span>
              </div>
            ) : (
              <ShoppingCart className="w-5 h-5 fill-black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
