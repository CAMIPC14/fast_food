import React from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Heart, Share2, Globe, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0e1215] text-gray-400 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-black shadow-lg">
                <Flame className="w-6 h-6 fill-black" />
              </div>
              <span className="text-2xl font-black text-white font-display">
                BOM<span className="text-amber-400">GO</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fast food artesanal con ingredientes de primera calidad. Hecho con pasión para los amantes de las buenas hamburguesas y los sabores intensos.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black flex items-center justify-center text-gray-300 transition-colors" title="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black flex items-center justify-center text-gray-300 transition-colors" title="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-400 hover:text-black flex items-center justify-center text-gray-300 transition-colors" title="Compartir">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Menú & Enlaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Hamburguesas Smash</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Complementos & Papas</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Bebidas & Milkshakes</a></li>
              <li><a href="#promos" className="hover:text-amber-400 transition-colors">Promociones del Mes</a></li>
              <li><a href="#reservas" className="hover:text-amber-400 transition-colors">Reservar una Mesa</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Ubicación & Contacto
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Av. Larco 123, Miraflores • Jr. Lima 456, Centro</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+51 999 111 222 / 999 333 444</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>pedidos@bomgofastfood.com</span>
              </li>
            </ul>
          </div>

          {/* Schedule / Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase font-display">
              Horario de Atención
            </h4>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Todos los días</span>
              </div>
              <p className="text-gray-300">Lunes a Jueves: 12:00 PM - 11:00 PM</p>
              <p className="text-gray-300">Viernes a Domingo: 12:00 PM - 12:30 AM</p>
              <div className="pt-1 text-[11px] text-emerald-400 font-semibold">
                ● Cocina abierta ahora
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Bomgo Fast Food. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado para <span className="text-amber-400 font-semibold">Bomgo</span> con React & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};
