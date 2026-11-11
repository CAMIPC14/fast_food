import React, { useState, useEffect } from 'react';
import { ShoppingBag, Flame, Menu as MenuIcon, X, Clock, Database, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cartCount, setIsCartOpen, setIsDbModalOpen, setIsTrackerOpen, activeOrder } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Menú Bomgo', href: '#menu' },
    { name: 'Promociones', href: '#promos' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Reservas', href: '#reservas' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#12161a]/95 backdrop-blur-md shadow-xl py-3 border-b border-white/10'
          : 'bg-[#12161a] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-black fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                BOM<span className="text-amber-400">GO</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400/80 -mt-1">
                Fast Food Artesanal
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 font-medium text-sm transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* DB SQL Inspector Pill */}
            <button
              onClick={() => setIsDbModalOpen(true)}
              title="Ver Modelado SQL & Tablas en Vivo"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-amber-300 transition-all font-mono hover:border-amber-400/40"
            >
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>SQL fastfood.sql</span>
            </button>

            {/* Active Order Tracker Pill */}
            {activeOrder && (
              <button
                onClick={() => setIsTrackerOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-all animate-pulse"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Pedido #{activeOrder.id} ({activeOrder.estado})</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-[#1e242d] hover:bg-[#28303c] text-white transition-transform active:scale-95 border border-white/10"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order Now Button */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-400 hover:to-amber-500 text-black font-bold px-5 py-2.5 rounded-full text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Pedir Ahora</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181d24] border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-200 hover:text-amber-400 font-medium py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsDbModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 text-amber-300 text-xs font-mono"
            >
              <Database className="w-4 h-4" />
              Ver Tablas SQL (fastfood.sql)
            </button>
            {activeOrder && (
              <button
                onClick={() => {
                  setIsTrackerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold"
              >
                <Clock className="w-4 h-4" />
                Rastrear Pedido #{activeOrder.id} ({activeOrder.estado})
              </button>
            )}
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-amber-400 hover:bg-amber-300 text-black font-bold py-2.5 rounded-xl text-sm"
            >
              Ver Menú Completo
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

