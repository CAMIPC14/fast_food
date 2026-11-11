import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickCategories } from './components/QuickCategories';
import { PromoBanners } from './components/PromoBanners';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { DatabaseViewerModal } from './components/DatabaseViewerModal';

import { useCart } from './context/CartContext';
import { apiCategorias, apiProductos } from './services/api';

export function FastFoodApp() {
  const { setSelectedProduct, addToCart, isDbModalOpen, setIsDbModalOpen } = useCart();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          apiCategorias.getAll(),
          apiProductos.getAll()
        ]);
        setCategorias(cats);
        setProductos(prods);
      } catch (err) {
        console.error('Error cargando menú:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleQuickAddPromo = (productId) => {
    const prod = productos.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod, 1);
    }
  };

  const handleOpenDetail = (prod) => {
    setSelectedProduct(prod);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#12161a]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section (Dark Luxury Fast Food) */}
        <Hero />

        {/* Quick Categories Bar (From Image 1) */}
        <QuickCategories
          categorias={categorias}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Promo Banners Section (From Image 2) */}
        <PromoBanners onQuickAdd={handleQuickAddPromo} />

        {/* Full Menu Section with Category Filters & Search */}
        <MenuSection
          productos={productos}
          categorias={categorias}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenDetail={handleOpenDetail}
        />

        {/* Culinary Highlights / About Bomgo (From Image 1) */}
        <AboutSection />

        {/* Table Reservation / Takeaway Form (From Image 1 & 2) */}
        <ReservationSection />

        {/* Customer Reviews & Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      {isDbModalOpen && (
        <div id="db-modal-root">
          <DatabaseViewerModal />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <FastFoodApp />;
}
