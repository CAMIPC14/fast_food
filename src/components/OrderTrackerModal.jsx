import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2, ChefHat, Bike, AlertCircle, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { apiPedidos } from '../services/api';

const STATUS_STEPS = [
  { key: 'pendiente', label: 'Recibido', desc: 'Tu orden fue ingresada al sistema', icon: Clock },
  { key: 'preparando', label: 'En Preparación', desc: 'El chef está armando tu pedido', icon: ChefHat },
  { key: 'entregado', label: 'Entregado', desc: '¡Listo o entregado a destino!', icon: Bike },
];

export const OrderTrackerModal = () => {
  const { isTrackerOpen, setIsTrackerOpen, activeOrder, setActiveOrder, currencySymbol } = useCart();
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeOrder) {
      loadDetalles(activeOrder.id);
    }
  }, [activeOrder]);

  const loadDetalles = async (pedidoId) => {
    setLoading(true);
    try {
      const items = await apiPedidos.getDetalles(pedidoId);
      setDetalles(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!activeOrder) return;
    const updated = await apiPedidos.updateEstado(activeOrder.id, newStatus);
    setActiveOrder({ ...activeOrder, estado: newStatus });
  };

  if (!isTrackerOpen || !activeOrder) return null;

  const currentStepIdx = STATUS_STEPS.findIndex((s) => s.key === activeOrder.estado);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#191e26] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#202631]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h3 className="text-xl font-bold font-display text-white">Rastreo de Pedido en Vivo</h3>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Pedido <strong className="text-amber-400">#{activeOrder.id}</strong> • Cliente: {activeOrder.cliente_nombre || 'Cliente'}
            </p>
          </div>

          <button
            onClick={() => setIsTrackerOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Progress Timeline */}
          <div className="bg-[#13171e] p-5 rounded-2xl border border-white/5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Estado del Pedido (Columna: estado)
            </h4>

            <div className="relative flex items-center justify-between">
              {/* Line behind */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0" />
              <div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-amber-400 z-0 transition-all duration-500"
                style={{
                  width: `${Math.max(0, (currentStepIdx / (STATUS_STEPS.length - 1)) * 80)}%`
                }}
              />

              {STATUS_STEPS.map((step, idx) => {
                const IconComp = step.icon;
                const isPassed = currentStepIdx >= idx;
                const isCurrent = currentStepIdx === idx;

                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/40 ring-4 ring-amber-400/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-[#222832] text-gray-400 border border-white/10'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold mt-2 text-center text-white">
                      {step.label}
                    </span>
                    <span className="text-[9px] text-gray-400 hidden sm:block">
                      {step.key}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick state switch for demo/testing */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400 text-[11px]">Simular cambio de estado:</span>
              <div className="flex gap-1.5">
                {['pendiente', 'preparando', 'entregado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                      activeOrder.estado === st
                        ? 'bg-amber-400 text-black'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items breakdown from 'detalle_pedido' */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Detalle del Pedido (Tabla: detalle_pedido)
            </h4>

            {loading ? (
              <div className="text-center py-4 text-xs text-gray-400">Cargando detalles...</div>
            ) : detalles.length > 0 ? (
              <div className="space-y-2">
                {detalles.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between bg-[#14181f] p-3 rounded-xl border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-[11px]">
                        {d.cantidad}x
                      </span>
                      <span className="text-white font-medium">{d.producto_nombre}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-[11px] block">
                        {currencySymbol} {Number(d.precio_unitario).toFixed(2)} c/u
                      </span>
                      <span className="text-amber-400 font-bold">
                        {currencySymbol} {Number(d.subtotal).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic">No hay detalles registrados.</div>
            )}

            <div className="pt-2 flex justify-between items-center text-sm font-bold border-t border-white/10">
              <span className="text-white font-display">Total Registrado en Pedido:</span>
              <span className="text-xl text-amber-400 font-display">
                {currencySymbol} {Number(activeOrder.total).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-[#14181f] p-4 rounded-2xl border border-white/5 text-xs space-y-1.5 text-gray-300">
            <p><strong className="text-white">Dirección:</strong> {activeOrder.cliente_direccion || 'No especificada'}</p>
            <p><strong className="text-white">Teléfono de contacto:</strong> {activeOrder.cliente_telefono || 'No especificado'}</p>
            <p><strong className="text-white">Fecha de orden:</strong> {activeOrder.fecha}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

