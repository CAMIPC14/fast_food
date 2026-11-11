import React, { useState, useEffect } from 'react';
import { X, Database, Table, RefreshCw, Layers, CheckCircle2, FileCode } from 'lucide-react';
import { apiPedidos } from '../services/api';

export const DatabaseViewerModal = () => {
  const [activeTab, setActiveTab] = useState('pedidos'); // 'clientes', 'categorias', 'productos', 'pedidos', 'detalle_pedido', 'sql'
  const [dbData, setDbData] = useState({
    clientes: [],
    categorias: [],
    productos: [],
    pedidos: [],
    detalle_pedido: []
  });

  const reloadData = () => {
    try {
      setDbData({
        clientes: JSON.parse(localStorage.getItem('bomgo_db_clientes') || '[]'),
        categorias: JSON.parse(localStorage.getItem('bomgo_db_categorias') || '[]'),
        productos: JSON.parse(localStorage.getItem('bomgo_db_productos') || '[]'),
        pedidos: JSON.parse(localStorage.getItem('bomgo_db_pedidos') || '[]'),
        detalle_pedido: JSON.parse(localStorage.getItem('bomgo_db_detalle_pedido') || '[]'),
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleReset = () => {
    if (window.confirm('¿Restablecer la base de datos a los valores iniciales de fastfood.sql?')) {
      apiPedidos.resetDatabase();
      reloadData();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-[#14181f] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#1b212b]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-white">Inspector de Base de Datos PostgreSQL</h3>
                <span className="text-[10px] font-mono bg-amber-400 text-black px-2 py-0.5 rounded-full font-bold">
                  fastfood.sql
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Visualización de datos sincronizada con el frontend de Bomgo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title="Restablecer a seeds de fastfood.sql"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Seeds</span>
            </button>
            <button
              onClick={() => {
                const modal = document.getElementById('db-modal-root');
                if (modal) modal.style.display = 'none';
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1.5 p-3 bg-[#11141a] border-b border-white/5 overflow-x-auto scrollbar-none">
          {[
            { id: 'pedidos', name: 'pedidos', count: dbData.pedidos.length },
            { id: 'detalle_pedido', name: 'detalle_pedido', count: dbData.detalle_pedido.length },
            { id: 'clientes', name: 'clientes', count: dbData.clientes.length },
            { id: 'productos', name: 'productos', count: dbData.productos.length },
            { id: 'categorias', name: 'categorias', count: dbData.categorias.length },
            { id: 'sql', name: 'SQL Schema (DDL)', count: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-5 font-mono text-xs">
          
          {/* Tab: Pedidos */}
          {activeTab === 'pedidos' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-400 text-[11px] bg-white/5">
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">cliente_id</th>
                    <th className="p-2.5">cliente_nombre</th>
                    <th className="p-2.5">fecha</th>
                    <th className="p-2.5">estado</th>
                    <th className="p-2.5 text-right">total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dbData.pedidos.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 font-bold text-white">#{p.id}</td>
                      <td className="p-2.5 text-gray-400">{p.cliente_id}</td>
                      <td className="p-2.5 text-gray-200">{p.cliente_nombre || 'N/A'}</td>
                      <td className="p-2.5 text-gray-400 text-[11px]">{p.fecha}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.estado === 'entregado'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : p.estado === 'preparando'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-bold text-amber-400">
                        S/. {Number(p.total).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Detalle Pedido */}
          {activeTab === 'detalle_pedido' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-400 text-[11px] bg-white/5">
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">pedido_id</th>
                    <th className="p-2.5">producto_id</th>
                    <th className="p-2.5">producto_nombre</th>
                    <th className="p-2.5">cantidad</th>
                    <th className="p-2.5 text-right">precio_unitario</th>
                    <th className="p-2.5 text-right">subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dbData.detalle_pedido.map((d) => (
                    <tr key={d.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 font-bold text-white">#{d.id}</td>
                      <td className="p-2.5 text-amber-300">Pedido #{d.pedido_id}</td>
                      <td className="p-2.5 text-gray-400">Prod #{d.producto_id}</td>
                      <td className="p-2.5 text-gray-200">{d.producto_nombre || 'Producto'}</td>
                      <td className="p-2.5 font-bold text-white">{d.cantidad}</td>
                      <td className="p-2.5 text-right text-gray-300">
                        S/. {Number(d.precio_unitario).toFixed(2)}
                      </td>
                      <td className="p-2.5 text-right font-bold text-amber-400">
                        S/. {(Number(d.precio_unitario) * Number(d.cantidad)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Clientes */}
          {activeTab === 'clientes' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-400 text-[11px] bg-white/5">
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">nombre</th>
                    <th className="p-2.5">email</th>
                    <th className="p-2.5">telefono</th>
                    <th className="p-2.5">direccion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dbData.clientes.map((c) => (
                    <tr key={c.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 font-bold text-white">#{c.id}</td>
                      <td className="p-2.5 text-white font-medium">{c.nombre}</td>
                      <td className="p-2.5 text-amber-300">{c.email}</td>
                      <td className="p-2.5 text-gray-300">{c.telefono}</td>
                      <td className="p-2.5 text-gray-400">{c.direccion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Productos */}
          {activeTab === 'productos' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-400 text-[11px] bg-white/5">
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">categoria_id</th>
                    <th className="p-2.5">nombre</th>
                    <th className="p-2.5">disponible</th>
                    <th className="p-2.5 text-right">precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dbData.productos.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 font-bold text-white">#{prod.id}</td>
                      <td className="p-2.5 text-gray-400">Cat #{prod.categoria_id}</td>
                      <td className="p-2.5 text-white font-medium">{prod.nombre}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                          prod.disponible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {prod.disponible ? 'TRUE' : 'FALSE'}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-bold text-amber-400">
                        S/. {Number(prod.precio).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: Categorias */}
          {activeTab === 'categorias' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-amber-400 text-[11px] bg-white/5">
                    <th className="p-2.5">id</th>
                    <th className="p-2.5">nombre</th>
                    <th className="p-2.5">descripción para frontend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {dbData.categorias.map((cat) => (
                    <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-2.5 font-bold text-white">#{cat.id}</td>
                      <td className="p-2.5 text-white font-bold">{cat.nombre}</td>
                      <td className="p-2.5 text-gray-400">{cat.desc || 'Categoría del menú'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab: SQL Schema DDL */}
          {activeTab === 'sql' && (
            <div className="bg-[#0b0e12] p-4 rounded-2xl border border-white/10 overflow-x-auto text-[11px] leading-relaxed text-gray-300 space-y-4">
              <div className="text-amber-400 font-bold">-- Modelado SQL original (fastfood.sql)</div>
              <pre className="text-amber-200">
{`CREATE TABLE clientes (
    id        SERIAL PRIMARY KEY,
    nombre    VARCHAR(100) NOT NULL,
    email     VARCHAR(100) NOT NULL UNIQUE,
    telefono  VARCHAR(20),
    direccion VARCHAR(150)
);

CREATE TABLE categorias (
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE productos (
    id           SERIAL PRIMARY KEY,
    categoria_id INT NOT NULL REFERENCES categorias(id),
    nombre       VARCHAR(100) NOT NULL,
    precio       NUMERIC(8,2) NOT NULL CHECK (precio > 0),
    disponible   BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE pedidos (
    id         SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES clientes(id),
    fecha      TIMESTAMP NOT NULL DEFAULT NOW(),
    estado     VARCHAR(20) NOT NULL DEFAULT 'pendiente'
               CHECK (estado IN ('pendiente', 'preparando', 'entregado', 'cancelado')),
    total      NUMERIC(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE detalle_pedido (
    id              SERIAL PRIMARY KEY,
    pedido_id       INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id     INT NOT NULL REFERENCES productos(id),
    cantidad        INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(8,2) NOT NULL
);`}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1b212b] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Total en DB: {dbData.pedidos.length} pedidos • {dbData.clientes.length} clientes • {dbData.productos.length} productos</span>
          <span className="text-amber-400 font-mono">Modo: Mock PostgreSQL (LocalStorage)</span>
        </div>
      </div>
    </div>
  );
};

