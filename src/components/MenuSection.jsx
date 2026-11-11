import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const MenuSection = ({ productos, categorias, activeCategory, onSelectCategory, onOpenDetail }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'name'

  const filteredProducts = useMemo(() => {
    return productos
      .filter((p) => {
        const matchesCategory = activeCategory === null || p.categoria_id === activeCategory;
        const matchesSearch =
          p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.precio - b.precio;
        if (sortBy === 'price-desc') return b.precio - a.precio;
        if (sortBy === 'name') return a.nombre.localeCompare(b.nombre);
        // default popular:
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [productos, activeCategory, searchQuery, sortBy]);

  return (
    <section id="menu" className="py-16 bg-[#181d24] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-400 font-script text-2xl font-bold tracking-wide block">
            Nuestras Especialidades
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display mt-1">
            Menú Artesanal Bomgo
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Elige entre nuestras hamburguesas smash, complementos crujientes y combos diseñados para saciar tu antojo.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#222831] p-4 rounded-3xl border border-white/5">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === null
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Todos ({productos.length})
            </button>
            {categorias.map((cat) => {
              const count = productos.filter((p) => p.categoria_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {cat.nombre} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Sort controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar hamburguesa, papas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181d24] text-white text-xs rounded-xl pl-9 pr-4 py-2.5 border border-white/10 focus:outline-none focus:border-amber-400 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#181d24] text-gray-200 text-xs rounded-xl px-3 py-2.5 border border-white/10 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="popular">Más Populares</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="name">Alfabético</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#222831]/50 rounded-3xl border border-white/5">
            <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white">No encontramos productos</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
              Intenta cambiar los términos de búsqueda o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

