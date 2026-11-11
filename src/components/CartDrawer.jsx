import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    currencySymbol,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const deliveryFee = cartTotal > 35 || cart.length === 0 ? 0 : 4.50;
  const grandTotal = cartTotal + deliveryFee;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181d24] text-white shadow-2xl flex flex-col border-l border-white/10">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1f252e]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-black font-black">
                <ShoppingBag className="w-5 h-5 fill-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Tu Pedido Bomgo</h3>
                <p className="text-xs text-gray-400">
                  {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Tu carrito está vacío</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Explora nuestro menú y añade tus hamburguesas y complementos favoritos.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  Ver Menú Ahora
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-[#202732] p-3.5 rounded-2xl border border-white/5"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 bg-gray-800"
                    onError={(e) => {
                      e.target.src = '/images/burger-clasica.jpg';
                    }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate font-display">
                      {item.nombre}
                    </h4>
                    {item.notas && (
                      <p className="text-[10px] text-amber-300/80 truncate italic">
                        "{item.notas}"
                      </p>
                    )}
                    <div className="text-xs font-black text-amber-400 mt-0.5">
                      {currencySymbol} {(item.precio * item.cantidad).toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-[#14181f] rounded-xl border border-white/10 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#1f252e] border-t border-white/10 space-y-4">
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">
                    {currencySymbol} {cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Costo de Envío</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">¡Gratis!</span>
                    ) : (
                      <span className="text-white font-semibold">{currencySymbol} {deliveryFee.toFixed(2)}</span>
                    )}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-[11px] text-amber-300/80 bg-amber-400/10 px-2 py-1 rounded-lg">
                    ✨ ¡Agrega {currencySymbol} {(35 - cartTotal).toFixed(2)} más para delivery GRATIS!
                  </p>
                )}

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10 font-display">
                  <span>Total a Pagar</span>
                  <span className="text-xl text-amber-400 font-display">
                    {currencySymbol} {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black font-black text-sm rounded-xl shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                >
                  <span>Continuar al Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-gray-400 hover:text-red-400 text-xs transition-colors cursor-pointer"
                >
                  Vaciar carrito
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
