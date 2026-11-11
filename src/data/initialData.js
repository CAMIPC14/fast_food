// Datos iniciales basados exactamente en el modelado SQL:
// fastfood.sql (clientes, categorias, productos, pedidos, detalle_pedido)
// Las imágenes apuntan a archivos locales dentro de /public/images para máxima velocidad y carga 100% garantizada

export const INITIAL_CATEGORIAS = [
  { id: 1, nombre: 'Hamburguesas', icon: 'Burger', desc: '100% Angus & Pan Brioche' },
  { id: 2, nombre: 'Bebidas', icon: 'CupSoda', desc: 'Refrescantes & Frozen' },
  { id: 3, nombre: 'Complementos', icon: 'UtensilsCrossed', desc: 'Papas & Crujientes' },
  { id: 4, nombre: 'Combos Especiales', icon: 'Flame', desc: 'Con papas + gaseosa' },
  { id: 5, nombre: 'Pizzas & Snacks', icon: 'Pizza', desc: 'Queso fundido al horno' },
];

export const INITIAL_PRODUCTOS = [
  // Del SQL original (categoria_id: 1, 2, 3)
  {
    id: 1,
    categoria_id: 1,
    nombre: 'Hamburguesa clásica',
    precio: 15.00,
    disponible: true,
    descripcion: 'Carne 100% artesanal a la parrilla, queso cheddar derretido, lechuga crocante, tomate y salsa Bomgo secreta.',
    imagen: '/images/burger-clasica.jpg',
    rating: 4.8,
    reviews: 142,
    tiempo: '10-15 min',
    popular: true,
    etiqueta: 'Clásica'
  },
  {
    id: 2,
    categoria_id: 1,
    nombre: 'Hamburguesa doble',
    precio: 22.00,
    disponible: true,
    descripcion: 'Doble porción de carne Angus de 150g, doble queso americano, tocino ahumado glaseado y cebolla caramelizada.',
    imagen: '/images/burger-doble.jpg',
    rating: 4.9,
    reviews: 230,
    tiempo: '12-18 min',
    popular: true,
    etiqueta: 'Más Vendida'
  },
  {
    id: 3,
    categoria_id: 2,
    nombre: 'Gaseosa 500ml',
    precio: 5.00,
    disponible: true,
    descripcion: 'Bebida helada de 500ml a elección: Coca Cola, Inca Kola, Sprite o Fanta bien fría con hielo.',
    imagen: '/images/gaseosa.jpg',
    rating: 4.6,
    reviews: 80,
    tiempo: '2 min',
    popular: false,
    etiqueta: 'Helada'
  },
  {
    id: 4,
    categoria_id: 3,
    nombre: 'Papas fritas',
    precio: 8.00,
    disponible: true,
    descripcion: 'Papas corte grueso, doradas y crujientes por fuera, suaves por dentro con toque de sal marina y paprika.',
    imagen: '/images/papas-fritas.jpg',
    rating: 4.7,
    reviews: 195,
    tiempo: '8-10 min',
    popular: true,
    etiqueta: 'Favorita'
  },

  // Productos adicionales para un menú completo y delicioso
  {
    id: 5,
    categoria_id: 1,
    nombre: 'Bomgo Crispy Chicken',
    precio: 18.50,
    disponible: true,
    descripcion: 'Pechuga marinada con rebozado ultra crujiente, ensalada coleslaw fresca, pepinillos dulces y mayonesa chipotle.',
    imagen: '/images/crispy-chicken.jpg',
    rating: 4.9,
    reviews: 160,
    tiempo: '12-15 min',
    popular: true,
    etiqueta: 'Crujiente'
  },
  {
    id: 6,
    categoria_id: 1,
    nombre: 'Smash BBQ Bacon Monster',
    precio: 25.50,
    disponible: true,
    descripcion: 'Triple smash burger con costra caramelizada, tiras de tocino ahumado crocante, aros de cebolla y salsa BBQ Jack.',
    imagen: '/images/bbq-bacon.jpg',
    rating: 5.0,
    reviews: 310,
    tiempo: '15-20 min',
    popular: true,
    etiqueta: 'Top Chef'
  },
  {
    id: 7,
    categoria_id: 3,
    nombre: 'Papas Bomgo Cheddar & Bacon',
    precio: 14.00,
    disponible: true,
    descripcion: 'Canasta de papas fritas bañadas en salsa fundida de queso cheddar artesanal y lluvia de tocino crocante picado.',
    imagen: '/images/papas-cheddar.jpg',
    rating: 4.9,
    reviews: 182,
    tiempo: '10 min',
    popular: true,
    etiqueta: 'Imperdible'
  },
  {
    id: 8,
    categoria_id: 3,
    nombre: 'Aros de Cebolla Rebozados',
    precio: 10.00,
    disponible: true,
    descripcion: 'Aros de cebolla fresca dorados a la perfección en tempura especial, acompañados de salsa tártara de la casa.',
    imagen: '/images/aros-cebolla.jpg',
    rating: 4.6,
    reviews: 94,
    tiempo: '8-10 min',
    popular: false,
    etiqueta: 'Snack'
  },
  {
    id: 9,
    categoria_id: 2,
    nombre: 'Milkshake Bomgo Oreo',
    precio: 12.00,
    disponible: true,
    descripcion: 'Batido cremoso de helado de vainilla premium, galletas Oreo trituradas, crema chantilly y fudge de chocolate.',
    imagen: '/images/milkshake.jpg',
    rating: 4.9,
    reviews: 145,
    tiempo: '5 min',
    popular: true,
    etiqueta: 'Dulce'
  },
  {
    id: 10,
    categoria_id: 2,
    nombre: 'Limonada Frozen Hierbabuena',
    precio: 7.00,
    disponible: true,
    descripcion: 'Fresquísima limonada granizada con hojas de hierbabuena fresca seleccionada del huerto y miel de caña.',
    imagen: '/images/limonada.jpg',
    rating: 4.7,
    reviews: 77,
    tiempo: '4 min',
    popular: false,
    etiqueta: 'Refrescante'
  },
  {
    id: 11,
    categoria_id: 4,
    nombre: 'Combo Bomgo Dúo Clásico',
    precio: 36.00,
    disponible: true,
    descripcion: '2 Hamburguesas Clásicas + 1 porción familiar de Papas Fritas + 2 Gaseosas heladas de 500ml.',
    imagen: '/images/combo-duo.jpg',
    rating: 4.9,
    reviews: 215,
    tiempo: '15 min',
    popular: true,
    etiqueta: 'Ahorro 20%'
  },
  {
    id: 12,
    categoria_id: 5,
    nombre: 'Pizza Bomgo Pepperoni Fest',
    precio: 28.00,
    disponible: true,
    descripcion: 'Masa madre horneada a la piedra, salsa pomodoro italiana, abundante mozzarella y doble capa de pepperoni doradito.',
    imagen: '/images/pizza-pepperoni.jpg',
    rating: 4.8,
    reviews: 112,
    tiempo: '18-22 min',
    popular: true,
    etiqueta: 'Al Horno'
  }
];

export const INITIAL_CLIENTES = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@correo.com', telefono: '999111222', direccion: 'Av. Larco 123' },
  { id: 2, nombre: 'María Gómez', email: 'maria@correo.com', telefono: '999333444', direccion: 'Jr. Lima 456' }
];

export const INITIAL_PEDIDOS = [
  {
    id: 1,
    cliente_id: 1,
    cliente_nombre: 'Juan Pérez',
    fecha: '2026-11-10 19:30:00',
    estado: 'entregado',
    total: 40.00
  },
  {
    id: 2,
    cliente_id: 2,
    cliente_nombre: 'María Gómez',
    fecha: '2026-11-10 20:45:00',
    estado: 'pendiente',
    total: 30.00
  }
];

export const INITIAL_DETALLE_PEDIDO = [
  { id: 1, pedido_id: 1, producto_id: 1, cantidad: 2, precio_unitario: 15.00 },
  { id: 2, pedido_id: 1, producto_id: 3, cantidad: 2, precio_unitario: 5.00 },
  { id: 3, pedido_id: 2, producto_id: 2, cantidad: 1, precio_unitario: 22.00 },
  { id: 4, pedido_id: 2, producto_id: 4, cantidad: 1, precio_unitario: 8.00 }
];
