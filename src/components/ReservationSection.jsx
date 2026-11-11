import React, { useState } from 'react';
import { Calendar, Clock, Users, Send, CheckCircle2, Phone, Mail, User } from 'lucide-react';
import { apiClientes } from '../services/api';

export const ReservationSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    personas: '2 Personas',
    fecha: '',
    hora: '',
    tipo: 'mesa', // 'mesa' o 'recojo'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Registrar cliente en el modelado de clientes (fastfood.sql)
      await apiClientes.createOrFind({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: `Reserva ${formData.tipo === 'mesa' ? 'Mesa' : 'Takeaway'} - ${formData.personas}`
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservas" className="py-20 bg-[#12161a] text-white relative overflow-hidden">
      
      {/* Background radial highlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 bg-[#1c222b] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <div className="mb-6">
              <span className="text-amber-400 font-script text-2xl font-bold block">
                Vive la Experiencia
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-1">
                Reserva tu Mesa o Pide Anticipado
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Evita colas. Asegura tu lugar en Bomgo para tus almuerzos, cenas con amigos o eventos especiales.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">¡Reserva Registrada con Éxito!</h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Hemos guardado tu reserva a nombre de <strong className="text-emerald-400">{formData.nombre}</strong>.
                  Te enviaremos la confirmación por WhatsApp y correo electrónico.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nombre: '',
                      email: '',
                      telefono: '',
                      personas: '2 Personas',
                      fecha: '',
                      hora: '',
                      tipo: 'mesa',
                    });
                  }}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Hacer Otra Reserva
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Nombre */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Nombre Completo *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Ej: Juan Pérez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Teléfono / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 999 111 222"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Correo Electrónico *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="juan@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Personas */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Cantidad de Personas</label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.personas}
                        onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option>1 Persona</option>
                        <option>2 Personas</option>
                        <option>3 a 4 Personas</option>
                        <option>5 a 8 Personas</option>
                        <option>Mesa Grupal (8+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Fecha</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Hora */}
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Hora Estimada</label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="time"
                        required
                        value={formData.hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                        className="w-full bg-[#14181f] text-white text-xs rounded-xl pl-9 pr-3 py-3 border border-white/10 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-400/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>{loading ? 'Procesando...' : 'Confirmar Reserva Ahora'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Experience & Location details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-amber-400 font-script text-2xl font-bold">
              Te esperamos en Bomgo
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display leading-tight">
              Una Atmósfera Moderna Diseñada Para Compartir
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Disfruta de música agradable, aire acondicionado, pantallas con deportes en vivo y la atención más cálida de la ciudad.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Horarios de Atención</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Lunes a Domingo: 12:00 PM - 11:30 PM</p>
                  <p className="text-amber-400 text-xs font-semibold">Delivery disponible hasta la medianoche</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Central de Pedidos & Atención</h4>
                  <p className="text-gray-400 text-xs mt-0.5">+51 999 111 222 • (01) 456-7890</p>
                  <p className="text-gray-400 text-xs">contacto@bomgofastfood.com</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

