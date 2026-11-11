/**
 * SERVICIO DE API - FAST FOOD "BOMGO"
 * =====================================================================
 * Estructurado 1:1 con el modelado de base de datos PostgreSQL (fastfood.sql)
 * Tablas: clientes, categorias, productos, pedidos, detalle_pedido.
 * =====================================================================
 */

import {
  INITIAL_CATEGORIAS,
  INITIAL_PRODUCTOS,
  INITIAL_CLIENTES,
  INITIAL_PEDIDOS,
  INITIAL_DETALLE_PEDIDO
} from '../data/initialData';

const USE_REAL_API = false; // Cambiar a true cuando tus endpoints estén listos
const API_BASE_URL = 'http://localhost:5000/api';

const STORAGE_KEYS = {
  CATEGORIAS: 'bomgo_db_categorias',
  PRODUCTOS: 'bomgo_db_productos_v2', // v2 para renovar caché con imágenes locales
  CLIENTES: 'bomgo_db_clientes',
  PEDIDOS: 'bomgo_db_pedidos',
  DETALLE: 'bomgo_db_detalle_pedido',
};

function getStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading localStorage for ${key}:`, e);
    return fallback;
  }
}

function setStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving to localStorage for ${key}:`, e);
  }
}

// Inicializar si no existen o si es versión previa
if (!localStorage.getItem(STORAGE_KEYS.PRODUCTOS)) {
  setStorage(STORAGE_KEYS.CATEGORIAS, INITIAL_CATEGORIAS);
  setStorage(STORAGE_KEYS.PRODUCTOS, INITIAL_PRODUCTOS);
  setStorage(STORAGE_KEYS.CLIENTES, INITIAL_CLIENTES);
  setStorage(STORAGE_KEYS.PEDIDOS, INITIAL_PEDIDOS);
  setStorage(STORAGE_KEYS.DETALLE, INITIAL_DETALLE_PEDIDO);
}

// ==========================================
// 1. CATEGORÍAS (tabla: categorias)
// ==========================================
export const apiCategorias = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/categorias`);
      return res.json();
    }
    return getStorage(STORAGE_KEYS.CATEGORIAS, INITIAL_CATEGORIAS);
  }
};

// ==========================================
// 2. PRODUCTOS (tabla: productos)
// ==========================================
export const apiProductos = {
  async getAll(categoriaId = null) {
    if (USE_REAL_API) {
      const url = categoriaId 
        ? `${API_BASE_URL}/productos?categoria_id=${categoriaId}`
        : `${API_BASE_URL}/productos`;
      const res = await fetch(url);
      return res.json();
    }
    const productos = getStorage(STORAGE_KEYS.PRODUCTOS, INITIAL_PRODUCTOS);
    if (categoriaId) {
      return productos.filter(p => p.categoria_id === Number(categoriaId));
    }
    return productos;
  },

  async getById(id) {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/productos/${id}`);
      return res.json();
    }
    const productos = getStorage(STORAGE_KEYS.PRODUCTOS, INITIAL_PRODUCTOS);
    return productos.find(p => p.id === Number(id)) || null;
  }
};

// ==========================================
// 3. CLIENTES (tabla: clientes)
// ==========================================
export const apiClientes = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/clientes`);
      return res.json();
    }
    return getStorage(STORAGE_KEYS.CLIENTES, INITIAL_CLIENTES);
  },

  async createOrFind(clienteData) {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
      return res.json();
    }

    const clientes = getStorage(STORAGE_KEYS.CLIENTES, INITIAL_CLIENTES);
    const existing = clientes.find(c => c.email.toLowerCase() === clienteData.email.toLowerCase());

    if (existing) {
      existing.telefono = clienteData.telefono || existing.telefono;
      existing.direccion = clienteData.direccion || existing.direccion;
      existing.nombre = clienteData.nombre || existing.nombre;
      setStorage(STORAGE_KEYS.CLIENTES, clientes);
      return existing;
    }

    const newCliente = {
      id: clientes.length ? Math.max(...clientes.map(c => c.id)) + 1 : 1,
      nombre: clienteData.nombre,
      email: clienteData.email,
      telefono: clienteData.telefono || '',
      direccion: clienteData.direccion || ''
    };

    clientes.push(newCliente);
    setStorage(STORAGE_KEYS.CLIENTES, clientes);
    return newCliente;
  }
};

// ==========================================
// 4. PEDIDOS & DETALLE_PEDIDO
// ==========================================
export const apiPedidos = {
  async getAll() {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/pedidos`);
      return res.json();
    }
    return getStorage(STORAGE_KEYS.PEDIDOS, INITIAL_PEDIDOS);
  },

  async getDetalles(pedidoId) {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/pedidos/${pedidoId}/detalles`);
      return res.json();
    }
    const detalles = getStorage(STORAGE_KEYS.DETALLE, INITIAL_DETALLE_PEDIDO);
    const productos = getStorage(STORAGE_KEYS.PRODUCTOS, INITIAL_PRODUCTOS);
    
    return detalles
      .filter(d => d.pedido_id === Number(pedidoId))
      .map(d => {
        const prod = productos.find(p => p.id === d.producto_id);
        return {
          ...d,
          producto_nombre: prod ? prod.nombre : 'Producto',
          producto_imagen: prod ? prod.imagen : '',
          subtotal: d.cantidad * d.precio_unitario
        };
      });
  },

  async createPedido({ clienteData, cartItems, metodoPago = 'efectivo', notas = '' }) {
    if (USE_REAL_API) {
      const res = await fetch(`${API_BASE_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente: clienteData,
          items: cartItems.map(item => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio_unitario: item.precio
          })),
          metodoPago,
          notas
        })
      });
      return res.json();
    }

    const cliente = await apiClientes.createOrFind(clienteData);
    const total = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    const pedidos = getStorage(STORAGE_KEYS.PEDIDOS, INITIAL_PEDIDOS);
    const newPedidoId = pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
    
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newPedido = {
      id: newPedidoId,
      cliente_id: cliente.id,
      cliente_nombre: cliente.nombre,
      cliente_email: cliente.email,
      cliente_telefono: cliente.telefono,
      cliente_direccion: cliente.direccion,
      fecha: formattedDate,
      estado: 'pendiente',
      total: Number(total.toFixed(2)),
      metodoPago,
      notas
    };

    pedidos.unshift(newPedido);
    setStorage(STORAGE_KEYS.PEDIDOS, pedidos);

    const detalles = getStorage(STORAGE_KEYS.DETALLE, INITIAL_DETALLE_PEDIDO);
    let nextDetalleId = detalles.length ? Math.max(...detalles.map(d => d.id)) + 1 : 1;

    const newDetalles = cartItems.map(item => ({
      id: nextDetalleId++,
      pedido_id: newPedidoId,
      producto_id: item.id,
      producto_nombre: item.nombre,
      cantidad: item.cantidad,
      precio_unitario: Number(item.precio)
    }));

    setStorage(STORAGE_KEYS.DETALLE, [...detalles, ...newDetalles]);

    return {
      pedido: newPedido,
      detalles: newDetalles,
      cliente
    };
  },

  async updateEstado(pedidoId, nuevoEstado) {
    const pedidos = getStorage(STORAGE_KEYS.PEDIDOS, INITIAL_PEDIDOS);
    const pedido = pedidos.find(p => p.id === Number(pedidoId));
    if (pedido) {
      pedido.estado = nuevoEstado;
      setStorage(STORAGE_KEYS.PEDIDOS, pedidos);
    }
    return pedido;
  },

  resetDatabase() {
    setStorage(STORAGE_KEYS.CATEGORIAS, INITIAL_CATEGORIAS);
    setStorage(STORAGE_KEYS.PRODUCTOS, INITIAL_PRODUCTOS);
    setStorage(STORAGE_KEYS.CLIENTES, INITIAL_CLIENTES);
    setStorage(STORAGE_KEYS.PEDIDOS, INITIAL_PEDIDOS);
    setStorage(STORAGE_KEYS.DETALLE, INITIAL_DETALLE_PEDIDO);
  }
};
