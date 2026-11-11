import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, MapPin, CreditCard, Banknote, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { apiPedidos } from '../services/api';

export const CheckoutModal = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    currencySymbol,
    setActiveOrder,
    setIsTrackerOpen
  } = useCart();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    metodoPago: 'efectivo',
    notas: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartTotal > 35 || cart.length === 0 ? 0 : 4.50;
  const grandTotal = cartTotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamar al API que implementa el modelo fastfood.sql
      const result = await apiPedidos.createPedido({
        clienteData: {
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion
        },
        cartItems: cart,
        metodoPago: formData.metodoPago,
        notas: formData.notas
      });

      // Efecto confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }

      setOrderCompleted(result.pedido);
      setActiveOrder(result.pedido);
      clearCart();
    } catch (err) {
      console.error('Error al crear el pedido:', err);
      alert('Hubo un error al procesar el pedido. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = () => {
    setIsCheckoutOpen(false);
    setIsTrackerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-xl bg-[#1a1f27] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#212732]">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {orderCompleted ? '¡Pedido Confirmado!' : 'Finalizar Pedido Bomgo'}
            </h3>
            <p className="text-xs text-gray-400">
              {orderCompleted ? 'Tu comida ya está en preparación' : 'Completa tus datos de entrega'}
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderCompleted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-full text-amber-300">
                  SQL PEDIDO_ID #{orderCompleted.id}
                </span>
                <h4 className="text-2xl font-black text-white font-display mt-3">
                  ¡Muchas gracias, {orderCompleted.cliente_nombre}!
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                  Tu orden ha sido registrada en el sistema con estado <strong className="text-amber-400 uppercase">pendiente</strong>. Estará lista en aproximadamente 25-35 minutos.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#13171e] p-4 rounded-2xl border border-white/5 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between text-gray-400">
                  <span>Dirección:</span>
                  <span className="text-white font-medium">{orderCompleted.cliente_direccion}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Teléfono:</span>
                  <span className="text-white font-medium">{orderCompleted.cliente_telefono}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Método de Pago:</span>
                  <span className="text-amber-400 font-bold uppercase">{orderCompleted.metodoPago}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                  <span>Total Pagado:</span>
                  <span className="text-amber-400 font-display">
                    {currencySymbol} {Number(orderCompleted.total).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleTrackOrder}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Rastrear Estado en Vivo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-xs rounded-xl transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Resumen express de la compra */}
              <div className="bg-[#14181f] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">Productos en tu pedido:</span>
                  <p className="text-sm font-bold text-white font-display">
                    {cart.map((i) => `${i.cantidad}x ${i.nombre}`).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total a pagar:</span>
                  <p className="text-lg font-black text-amber-400 font-display">
                    {currencySymbol} {grandTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Datos del Cliente (Modelado tabla 'clientes' en SQL) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Datos del Cliente (Tabla: clientes)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Nombre Completo *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-[#12161d] text-white text-xs rounded-xl pl-8 pr-3 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Correo Electrónico (Único) *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="juan@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#12161d] text-white text-xs rounded-xl pl-8 pr-3 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Teléfono / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="999 111 222"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-[#12161d] text-white text-xs rounded-xl pl-8 pr-3 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Dirección de Entrega *</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Av. Larco 123, Dpto 402"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        className="w-full bg-[#12161d] text-white text-xs rounded-xl pl-8 pr-3 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Forma de Pago */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Banknote className="w-3.5 h-3.5" />
                  <span>2. Método de Pago</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'efectivo', label: 'Efectivo', icon: Banknote },
                    { id: 'yape-plin', label: 'Yape / Plin', icon: CreditCard },
                    { id: 'tarjeta', label: 'POS / Tarjeta', icon: ShieldCheck },
                  ].map((pay) => {
                    const IconComp = pay.icon;
                    return (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, metodoPago: pay.id })}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formData.metodoPago === pay.id
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                            : 'bg-[#12161d] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        <span>{pay.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notas de entrega */}
              <div>
                <label className="text-[11px] text-gray-300 block mb-1">
                  Instrucciones o Referencias de Entrega (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Timbre blanco al lado de la reja negra"
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  className="w-full bg-[#12161d] text-white text-xs rounded-xl px-3 py-2.5 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-xl shadow-amber-400/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{loading ? 'Creando pedido en base de datos...' : `Confirmar y Pagar ${currencySymbol} ${grandTotal.toFixed(2)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

