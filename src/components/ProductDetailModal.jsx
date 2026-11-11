import React, { useState } from 'react';
import { X, Star, Clock, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, currencySymbol } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    addToCart({
      ...selectedProduct,
      notas: notes
    }, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedProduct(null);
      setQuantity(1);
      setNotes('');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#1f242c] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/90 flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 bg-[#14181e] flex items-center justify-center overflow-hidden">
          <img
            src={selectedProduct.imagen}
            alt={selectedProduct.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/images/burger-clasica.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f242c] via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-full shadow-md">
              {selectedProduct.etiqueta || 'Especialidad'}
            </span>
            <div className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-300 flex items-center gap-1 border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{selectedProduct.rating || 4.8}</span>
              <span className="text-gray-400 text-[10px]">({selectedProduct.reviews || 120} reseñas)</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold font-display text-white">
                {selectedProduct.nombre}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Tiempo de preparación: {selectedProduct.tiempo || '12-15 min'}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Precio</span>
              <span className="text-2xl font-black text-amber-400 font-display">
                {currencySymbol} {Number(selectedProduct.precio).toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {selectedProduct.descripcion}
          </p>

          {/* Notes / Special Instructions */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Instrucciones especiales para cocina (opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Sin cebolla, extra salsa tártara, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#14181e] text-white text-xs rounded-xl px-3.5 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
            />
          </div>

          {/* Quantity and Add Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#14181e] rounded-2xl border border-white/10 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total & Submit */}
            <button
              onClick={handleAdd}
              disabled={!selectedProduct.disponible}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                added
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black shadow-amber-400/25 cursor-pointer'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>¡Agregado al carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 fill-black" />
                  <span>
                    Añadir • {currencySymbol} {(selectedProduct.precio * quantity).toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
