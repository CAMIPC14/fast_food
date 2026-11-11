# 🍔 Bomgo - Fast Food Artesanal

Aplicación web moderna para **Bomgo Fast Food**, construida en **React**, **Vite** y **Tailwind CSS**, guiada por las referencias visuales de diseño y adaptada 1:1 al modelo de base de datos PostgreSQL (`fastfood.sql`).

---

## 🚀 Características Principales

1. **Estilo Visual Premium (Inspirado en las Referencias)**:
   - **Hero Section**: Estilo oscuro elegante (`#12161a`), hamburguesa flotante con iluminación circular dorada, insignias de delivery express y botones de acción rápida.
   - **Píldoras de Categorías**: Acceso rápido con íconos a Hamburguesas, Bebidas, Complementos, Combos y Pizzas.
   - **Banners de Promoción**: Tarjetas con platos circulares destacados ("Jueves Bomgo 20% OFF" y "Pizza & Friends 15% OFF").
   - **Menú Interactivo**: Tarjetas con imagen circular flotante, precio en Soles (`S/.`), selector de cantidad y botón directo de carrito.
   - **Modal de Detalle del Producto**: Personalización de pedido e instrucciones especiales de cocina.
   - **Sección Nosotros ("Captivating Culinary")**: Presentación fotográfica doble de las especialidades artesanales.
   - **Formulario de Reserva / Takeaway**: Reserva de mesas y pedidos para llevar.
   - **Testimonios de Clientes**: Reseñas con estrellas de calificación.

2. **Integración con el Modelado SQL (`fastfood.sql`)**:
   - `clientes`: Formulario de checkout y reservas captura `nombre`, `email`, `telefono`, `direccion`.
   - `categorias`: Listado dinámico de categorías (`id`, `nombre`).
   - `productos`: Menú filtrable por `categoria_id`, con `nombre`, `precio`, `disponible`, imagen y descripción.
   - `pedidos`: Creación de pedidos con `cliente_id`, `fecha`, `total` y estados (`pendiente`, `preparando`, `entregado`, `cancelado`).
   - `detalle_pedido`: Desglose automático con `pedido_id`, `producto_id`, `cantidad`, `precio_unitario`.

3. **Capa de Servicios y APIs Lista para Backend (`src/services/api.js`)**:
   - Actualmente funciona con un **Mock Storage (LocalStorage)** que simula PostgreSQL en el navegador, permitiendo probar toda la funcionalidad de compra, carrito y cambios de estado.
   - Cuando tengas listas tus APIs en Node.js, Express, Python o Spring Boot, solo debes cambiar:
     ```javascript
     const USE_REAL_API = true;
     const API_BASE_URL = 'http://localhost:5000/api';
     ```

4. **Herramientas de Desarrollador Integradas**:
   - **Botón `SQL fastfood.sql` en la barra superior**: Abre el Inspector de Base de Datos para ver en tiempo real las filas de `pedidos`, `detalle_pedido`, `clientes`, `productos` y `categorias`.
   - **Rastreo de Pedido en Vivo**: Permite ver el avance del pedido (`pendiente` ➔ `preparando` ➔ `entregado`).

---

## 🛠️ Cómo Ejecutar el Proyecto

```bash
# 1. Instalar dependencias (si aún no lo has hecho)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

El servidor estará disponible en: [http://localhost:5173/](http://localhost:5173/)
