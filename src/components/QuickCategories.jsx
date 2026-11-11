import React from 'react';
import { Utensils, CupSoda, Flame, Pizza, Sandwich, Sparkles } from 'lucide-react';

const iconMap = {
  Hamburguesas: Sandwich,
  Bebidas: CupSoda,
  Complementos: Utensils,
  'Combos Especiales': Flame,
  'Pizzas & Snacks': Pizza,
};

export const QuickCategories = ({ categorias, activeCategory, onSelectCategory }) => {
  return (
    <div className="bg-[#fffdf9] py-8 border-b border-amber-900/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Pill Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          
          {/* Button: Todos */}
          <button
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all transform active:scale-95 cursor-pointer ${
              activeCategory === null
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-105 ring-2 ring-amber-400'
                : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-200/80 hover:border-amber-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Todos los Platillos</span>
          </button>

          {/* Dinamically rendered categories from DB */}
          {categorias.map((cat) => {
            const IconComponent = iconMap[cat.nombre] || Utensils;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all transform active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30 scale-105 ring-2 ring-amber-400'
                    : 'bg-white hover:bg-amber-50 text-gray-700 border border-gray-200/80 hover:border-amber-300'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-black/10' : 'bg-amber-100 text-amber-800'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span>{cat.nombre}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

