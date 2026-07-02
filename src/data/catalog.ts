// Casa Romero Herrajes - Catálogo simulado
// Estructura escalable: cada categoría contiene productos con variantes opcionales.

export type VariantGroup = {
  name: string; // ej "Material", "Medida"
  options: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // slug de categoría
  subcategory?: string;
  brand?: string;
  price: number;
  description: string;
  variants?: VariantGroup[];
  featured?: boolean;
  stock?: number;
  tags?: string[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string; // lucide name
  subcategories?: string[];
};

export const brands = [
  "Fumaca", "Prive", "Kallay", "Simeplast", "Bronzen",
  "MR", "FC Metalúrgica", "Currao", "Alce", "Sidañez Herrajes", "Sica",
];

export const categories: Category[] = [
  {
    slug: "linea-puerta",
    name: "Línea Puerta",
    description: "Manijas, bisagras, pomos y todo para tu puerta.",
    icon: "DoorOpen",
    subcategories: ["Manijas", "Manijones", "Pomos", "Bisagras", "Cierrapuertas", "Accesorios"],
  },
  {
    slug: "linea-porton",
    name: "Línea Portón",
    description: "Ruedas, cremalleras y sistemas para portones.",
    icon: "Warehouse",
    subcategories: ["Ruedas", "Cremalleras", "Pasadores", "Accesorios corredizo"],
  },
  {
    slug: "mensulas",
    name: "Ménsulas",
    description: "Soportes para estantes, aires acondicionados y microondas.",
    icon: "Anchor",
    subcategories: ["Estantes", "Aire Acondicionado", "Microondas", "Rebatibles", "Rieles"],
  },
  {
    slug: "perchas",
    name: "Perchas",
    description: "Perchas de bronce, aluminio y percheros armados.",
    icon: "Shirt",
    subcategories: ["Bronce", "Aluminio", "Autoadhesivas", "Armados"],
  },
  {
    slug: "linea-mueble",
    name: "Línea Mueble",
    description: "Tiradores, bisagras, correderas, patas y accesorios.",
    icon: "Sofa",
    subcategories: ["Tiradores", "Bisagras", "Correderas", "Patas", "Regatones", "Ruedas", "Brazos hidráulicos"],
  },
  {
    slug: "linea-ventana",
    name: "Línea Ventana",
    description: "Fallebas, ruedas, brazos y cerraduras para ventana.",
    icon: "AppWindow",
    subcategories: ["Fallebas", "Ruedas", "Brazos", "Cerraduras", "Caños y barrales"],
  },
  {
    slug: "cortinas-enrollar",
    name: "Cortinas de Enrollar",
    description: "Enrolladores, poleas, cintas y accesorios completos.",
    icon: "Blinds",
    subcategories: ["Enrolladores", "Poleas", "Cintas", "Tacos y ejes", "Aparatos"],
  },
  {
    slug: "sistema-corredizo",
    name: "Sistema Corredizo",
    description: "Kits y guías para muebles corredizos.",
    icon: "MoveHorizontal",
    subcategories: ["Kits", "Guías", "Accesorios"],
  },
  {
    slug: "pegamentos",
    name: "Pegamentos",
    description: "Adhesivos industriales y de uso general.",
    icon: "Beaker",
    subcategories: ["Siliconas", "Epóxicos", "Instantáneos", "Contacto"],
  },
  {
    slug: "tornilleria",
    name: "Tornillería",
    description: "Tornillos, autoperforantes, pitones y tacos (venta x100).",
    icon: "Wrench",
    subcategories: ["Caser drill", "Autoperforantes", "Pitones", "Tacos"],
  },
  {
    slug: "linea-seguridad",
    name: "Línea Seguridad",
    description: "Cerraduras, candados y pasadores.",
    icon: "Lock",
    subcategories: ["Cerraduras", "Candados", "Pasadores"],
  },
  {
    slug: "electricidad",
    name: "Electricidad",
    description: "Enchufes, térmicas, cajas y lámparas.",
    icon: "Zap",
    subcategories: ["Enchufes", "Térmicas", "Llaves", "Cajas", "Lámparas"],
  },
];

let idCounter = 1;
const mk = (p: Omit<Product, "id" | "slug">): Product => {
  const id = `p-${idCounter++}`;
  return {
    ...p,
    id,
    slug: `${id}-${p.name.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-|-$/g, "")}`,
  };
};

export const products: Product[] = [
  // LÍNEA PUERTA
  mk({
    name: "Manija Doble Balancín",
    category: "linea-puerta", subcategory: "Manijas", brand: "Bronzen",
    price: 18500, featured: true, stock: 24,
    description: "Manija doble balancín para puerta de acceso. Mecanismo robusto, terminación premium.",
    variants: [
      { name: "Material", options: ["Bronce", "Aluminio", "Acero Inoxidable", "Hierro Forjado"] },
      { name: "Acabado", options: ["Pulido", "Mate", "Envejecido"] },
    ],
  }),
  mk({
    name: "Manija Giratoria Recta",
    category: "linea-puerta", subcategory: "Manijas", brand: "Prive",
    price: 14200, stock: 40,
    description: "Manija giratoria de diseño recto minimalista.",
    variants: [{ name: "Material", options: ["Bronce", "Aluminio", "Acero Inoxidable"] }],
  }),
  mk({
    name: "Manijón para Puerta",
    category: "linea-puerta", subcategory: "Manijones", brand: "Kallay",
    price: 26900, featured: true, stock: 18,
    description: "Manijón de gran porte, ideal para puertas de entrada de madera maciza.",
    variants: [
      { name: "Material", options: ["Hierro Forjado", "Bronce", "Acero Inoxidable", "Aluminio"] },
      { name: "Largo", options: ["30 cm", "45 cm", "60 cm", "90 cm"] },
    ],
  }),
  mk({
    name: "Bocallave Cilíndrica",
    category: "linea-puerta", subcategory: "Accesorios", brand: "Bronzen",
    price: 3200, stock: 120,
    description: "Bocallave para cerradura de embutir, terminación uniforme.",
    variants: [{ name: "Acabado", options: ["Bronce", "Cromo", "Negro Mate"] }],
  }),
  mk({
    name: "Pomo Doble Balancín",
    category: "linea-puerta", subcategory: "Pomos", brand: "Prive",
    price: 9800, stock: 60,
    description: "Pomo doble balancín, funcionamiento suave.",
    variants: [{ name: "Tipo", options: ["Doble Balancín", "Giratorio", "Fijo"] }],
  }),
  mk({
    name: "Sistema Libre / Ocupado",
    category: "linea-puerta", subcategory: "Accesorios", brand: "Sica",
    price: 6400, stock: 35,
    description: "Indicador libre/ocupado para puertas de baño.",
  }),
  mk({
    name: "Bisagra Reforzada",
    category: "linea-puerta", subcategory: "Bisagras", brand: "FC Metalúrgica",
    price: 2100, stock: 200,
    description: "Bisagra de acero reforzada. Venta por unidad.",
    variants: [
      { name: "Instalación", options: ["Para Soldar", "Para Atornillar"] },
      { name: "Medida", options: ['2"', '2½"', '3"', '4"'] },
    ],
  }),
  mk({
    name: "Cierrapuerta Hidráulico",
    category: "linea-puerta", subcategory: "Cierrapuertas", brand: "Sica",
    price: 34500, featured: true, stock: 12,
    description: "Cierrapuerta hidráulico regulable, ideal para tránsito medio-alto.",
    variants: [{ name: "Fuerza", options: ["60N", "80N", "100N", "120N"] }],
  }),
  mk({
    name: "Mirilla Panorámica",
    category: "linea-puerta", subcategory: "Accesorios", brand: "Prive",
    price: 4200, stock: 80,
    description: "Mirilla gran angular 200°.",
  }),

  // LÍNEA PORTÓN
  mk({
    name: "Rueda para Portón Corredizo",
    category: "linea-porton", subcategory: "Ruedas", brand: "FC Metalúrgica",
    price: 12800, featured: true, stock: 40,
    description: "Rueda maciza de acero para portones corredizos pesados.",
    variants: [
      { name: "Diámetro", options: ["80 mm", "100 mm", "120 mm", "150 mm"] },
      { name: "Soporte", options: ["Con Soporte", "Sin Soporte"] },
    ],
  }),
  mk({
    name: "Cremallera para Portón",
    category: "linea-porton", subcategory: "Cremalleras", brand: "MR",
    price: 18500, stock: 25,
    description: "Cremallera de acero para motorización de portón corredizo.",
    variants: [{ name: "Largo", options: ["1 m", "2 m"] }],
  }),
  mk({
    name: "Pasador Herrero",
    category: "linea-porton", subcategory: "Pasadores", brand: "Currao",
    price: 5600, stock: 90,
    description: "Pasador de portón, reforzado.",
    variants: [{ name: "Instalación", options: ["Para Soldar", "Para Atornillar"] }],
  }),
  mk({
    name: "Estabilizador de Portón",
    category: "linea-porton", subcategory: "Accesorios corredizo", brand: "FC Metalúrgica",
    price: 8900, stock: 30,
    description: "Estabilizador con rulemanes internos.",
  }),

  // MÉNSULAS
  mk({
    name: "Ménsula para Estante",
    category: "mensulas", subcategory: "Estantes", brand: "Sidañez Herrajes",
    price: 1450, featured: true, stock: 300,
    description: "Ménsula clásica en L para estantes de madera o vidrio.",
    variants: [
      { name: "Medida", options: ["15 cm", "20 cm", "25 cm", "30 cm", "40 cm"] },
      { name: "Color", options: ["Blanco", "Negro", "Zincado"] },
    ],
  }),
  mk({
    name: "Set Ménsula Microondas 40x60",
    category: "mensulas", subcategory: "Microondas", brand: "Sidañez Herrajes",
    price: 8200, stock: 45,
    description: "Set completo para colgar microondas. Capacidad hasta 40 kg.",
    variants: [{ name: "Color", options: ["Blanco", "Negro"] }],
  }),
  mk({
    name: "Ménsula Aire Acondicionado Reforzada",
    category: "mensulas", subcategory: "Aire Acondicionado", brand: "FC Metalúrgica",
    price: 11500, featured: true, stock: 60,
    description: "Ménsula para split hasta 6000 frigorías.",
    variants: [{ name: "Tipo", options: ["Reforzado Blanco", "Intermedio Zincado"] }],
  }),
  mk({
    name: "Riel para Ménsula",
    category: "mensulas", subcategory: "Rieles", brand: "Sidañez Herrajes",
    price: 3200, stock: 120,
    description: "Riel de pared para sistema modular de estantes.",
    variants: [
      { name: "Largo", options: ["0.50 m", "1 m", "1.50 m", "2 m"] },
      { name: "Color", options: ["Blanco", "Negro"] },
    ],
  }),
  mk({
    name: "Ménsula Rebatible",
    category: "mensulas", subcategory: "Rebatibles", brand: "Sidañez Herrajes",
    price: 6400, stock: 40,
    description: "Ménsula rebatible color blanco.",
    variants: [{ name: "Medida", options: ["20 cm", "25 cm", "30 cm", "35 cm", "47 cm"] }],
  }),
  mk({
    name: "Ménsula Elevable 41 cm",
    category: "mensulas", subcategory: "Rebatibles", brand: "Sidañez Herrajes",
    price: 9800, stock: 20,
    description: "Ménsula elevable color negro, 41 cm.",
  }),

  // PERCHAS
  mk({
    name: "Percha de Bronce",
    category: "perchas", subcategory: "Bronce", brand: "Bronzen",
    price: 3800, stock: 80,
    description: "Percha individual de bronce macizo.",
  }),
  mk({
    name: "Percha Autoadhesiva",
    category: "perchas", subcategory: "Autoadhesivas", brand: "Simeplast",
    price: 1200, featured: true, stock: 250,
    description: "Percha autoadhesiva, no requiere tornillos.",
    variants: [{ name: "Color", options: ["Blanco", "Negro", "Cromo"] }],
  }),
  mk({
    name: "Perchero Armado 5 Ganchos",
    category: "perchas", subcategory: "Armados", brand: "Sidañez Herrajes",
    price: 9400, stock: 30,
    description: "Perchero de pared armado con 5 ganchos.",
  }),

  // LÍNEA MUEBLE
  mk({
    name: "Tirador de Madera",
    category: "linea-mueble", subcategory: "Tiradores", brand: "Currao",
    price: 850, featured: true, stock: 500,
    description: "Tirador de madera para muebles de cocina y placar.",
    variants: [{ name: "Medida", options: ["64 mm", "96 mm", "128 mm"] }],
  }),
  mk({
    name: "Manija Plástica Muebles",
    category: "linea-mueble", subcategory: "Tiradores", brand: "Simeplast",
    price: 480, stock: 800,
    description: "Manija plástica para muebles.",
    variants: [
      { name: "Medida", options: ["32 mm", "64 mm", "96 mm", "128 mm", "160 mm", "192 mm", "224 mm", "256 mm", "320 mm"] },
      { name: "Color", options: ["Negro", "Blanco", "Cromo", "Bronce"] },
    ],
  }),
  mk({
    name: "Bisagra Cazoleta 35 mm",
    category: "linea-mueble", subcategory: "Bisagras", brand: "Alce",
    price: 1350, featured: true, stock: 400,
    description: "Bisagra cazoleta con cierre suave.",
    variants: [
      { name: "Diámetro", options: ["26 mm", "35 mm"] },
      { name: "Ángulo", options: ["90°", "165°"] },
      { name: "Forma", options: ["Redonda", "Cuadrada"] },
    ],
  }),
  mk({
    name: "Bisagra Libro",
    category: "linea-mueble", subcategory: "Bisagras", brand: "FC Metalúrgica",
    price: 620, stock: 350,
    description: "Bisagra tipo libro.",
    variants: [{ name: "Medida", options: ["25 mm", "38 mm", "50 mm", "63 mm", "75 mm"] }],
  }),
  mk({
    name: "Corredera Telescópica Reforzada",
    category: "linea-mueble", subcategory: "Correderas", brand: "Alce",
    price: 4800, featured: true, stock: 90,
    description: "Corredera telescópica reforzada para cajones pesados.",
    variants: [
      { name: "Largo", options: ["25 cm", "30 cm", "35 cm", "40 cm", "45 cm", "50 cm", "55 cm", "60 cm"] },
      { name: "Tipo", options: ["Mini", "Reforzada"] },
    ],
  }),
  mk({
    name: "Pata Plástica Regulable",
    category: "linea-mueble", subcategory: "Patas", brand: "Simeplast",
    price: 320, stock: 600,
    description: "Pata de mueble regulable en altura.",
    variants: [{ name: "Material", options: ["Plástica", "Metálica"] }],
  }),
  mk({
    name: "Regatón Plástico",
    category: "linea-mueble", subcategory: "Regatones", brand: "Simeplast",
    price: 180, stock: 1200,
    description: "Regatón plástico para patas de silla y mueble.",
    variants: [
      { name: "Forma", options: ["Redondo", "Cuadrado", "Rectangular"] },
      { name: "Medida", options: ['1/2"', '3/4"', '1"', '1¼"', '20 mm', '25 mm', '30 mm', '38 mm'] },
    ],
  }),
  mk({
    name: "Brazo Hidráulico para Alacena",
    category: "linea-mueble", subcategory: "Brazos hidráulicos", brand: "Alce",
    price: 7200, stock: 70,
    description: "Brazo hidráulico para puertas rebatibles de alacena.",
    variants: [{ name: "Fuerza", options: ["60N", "80N", "100N", "120N", "150N"] }],
  }),
  mk({
    name: "Rueda con Freno",
    category: "linea-mueble", subcategory: "Ruedas", brand: "FC Metalúrgica",
    price: 1800, stock: 250,
    description: "Rueda giratoria para muebles.",
    variants: [
      { name: "Freno", options: ["Con Freno", "Sin Freno"] },
      { name: "Diámetro", options: ["50 mm", "75 mm", "100 mm"] },
    ],
  }),

  // LÍNEA VENTANA
  mk({
    name: "Falleba de Embutir",
    category: "linea-ventana", subcategory: "Fallebas", brand: "Kallay",
    price: 5400, featured: true, stock: 60,
    description: "Falleba embutida para ventanas de madera.",
    variants: [{ name: "Medida", options: ["12 mm", "18 mm"] }],
  }),
  mk({
    name: "Varilla para Falleba",
    category: "linea-ventana", subcategory: "Fallebas", brand: "Kallay",
    price: 2100, stock: 150,
    description: "Varilla de acero para falleba.",
    variants: [
      { name: "Diámetro", options: ["12 mm", "18 mm"] },
      { name: "Largo", options: ["1 m", "1.20 m", "1.50 m", "1.80 m", "2 m"] },
    ],
  }),
  mk({
    name: "Brazo de Empuje",
    category: "linea-ventana", subcategory: "Brazos", brand: "MR",
    price: 3800, stock: 120,
    description: "Brazo de empuje para ventana corrediza.",
    variants: [
      { name: "Material", options: ["Madera", "Chapa", "Aluminio"] },
      { name: "Medida", options: ["25 cm", "30 cm", "40 cm", "50 cm"] },
    ],
  }),
  mk({
    name: "Cerradura para Corrediza",
    category: "linea-ventana", subcategory: "Cerraduras", brand: "Prive",
    price: 6800, stock: 40,
    description: "Cerradura de seguridad para ventana corrediza.",
  }),
  mk({
    name: "Caño Barral de Madera",
    category: "linea-ventana", subcategory: "Caños y barrales", brand: "Currao",
    price: 4200, stock: 80,
    description: "Barral de madera para cortinas.",
    variants: [{ name: "Perfil", options: ["Oval", "Redondo"] }],
  }),

  // CORTINA DE ENROLLAR
  mk({
    name: "Enrollador Reforzado",
    category: "cortinas-enrollar", subcategory: "Enrolladores", brand: "MR",
    price: 8400, featured: true, stock: 55,
    description: "Enrollador reforzado para cortinas grandes.",
    variants: [{ name: "Tipo", options: ["Común", "Reforzado"] }],
  }),
  mk({
    name: "Polea de Cortina",
    category: "cortinas-enrollar", subcategory: "Poleas", brand: "MR",
    price: 3200, stock: 90,
    description: "Polea metálica para cortina de enrollar.",
    variants: [{ name: "Tipo", options: ["Común", "Reforzada"] }],
  }),
  mk({
    name: "Reductor 3:1",
    category: "cortinas-enrollar", subcategory: "Aparatos", brand: "MR",
    price: 5800, stock: 40,
    description: "Reductor para cortinas pesadas.",
    variants: [{ name: "Relación", options: ["3:1", "4:1"] }],
  }),
  mk({
    name: "Cinta para Cortina",
    category: "cortinas-enrollar", subcategory: "Cintas", brand: "Simeplast",
    price: 1400, stock: 300,
    description: "Cinta de nylon reforzada.",
  }),

  // SISTEMA CORREDIZO
  mk({
    name: "Kit Sistema Corredizo D52",
    category: "sistema-corredizo", subcategory: "Kits", brand: "MR",
    price: 24500, featured: true, stock: 15,
    description: "Kit completo para armar sistema corredizo D52.",
    variants: [{ name: "Modelo", options: ["D52", "Colgante Simple", "Colgante Doble", "Pliru", "MR PLUS"] }],
  }),
  mk({
    name: "Guía Superior Doble J",
    category: "sistema-corredizo", subcategory: "Guías", brand: "MR",
    price: 6800, stock: 30,
    description: "Guía superior para sistema corredizo.",
    variants: [{ name: "Modelo", options: ["Doble J", "Riel D52", "Pliru", "168", "164"] }],
  }),

  // PEGAMENTOS
  mk({
    name: "Silicona para Pistola",
    category: "pegamentos", subcategory: "Siliconas", brand: "Fumaca",
    price: 1800, stock: 200,
    description: "Cartucho de silicona neutra.",
  }),
  mk({
    name: "No + Clavos",
    category: "pegamentos", subcategory: "Contacto",
    price: 3400, featured: true, stock: 120,
    description: "Adhesivo de montaje ultra fuerte.",
  }),
  mk({
    name: "Poxipol 10 Minutos",
    category: "pegamentos", subcategory: "Epóxicos",
    price: 2800, stock: 180,
    description: "Adhesivo epoxi de curado rápido.",
    variants: [{ name: "Color", options: ["Transparente", "Metálico"] }],
  }),

  // TORNILLERÍA
  mk({
    name: "Tornillo Caser Drill Dorado (x100)",
    category: "tornilleria", subcategory: "Caser drill", brand: "FC Metalúrgica",
    price: 4800, featured: true, stock: 60,
    description: "Caja x 100 unidades. Tornillo autoperforante dorado.",
    variants: [
      { name: "Diámetro", options: ["Ø 2.5", "Ø 3", "Ø 3.5", "Ø 4", "Ø 5", "Ø 6"] },
      { name: "Largo", options: ["12 mm", "16 mm", "20 mm", "25 mm", "30 mm", "40 mm", "50 mm"] },
    ],
  }),
  mk({
    name: "Autoperforante Madera Negro (x100)",
    category: "tornilleria", subcategory: "Autoperforantes",
    price: 3600, stock: 80,
    description: "Caja x 100. Negro fosfatizado.",
  }),
  mk({
    name: "Taco Fisher (x100)",
    category: "tornilleria", subcategory: "Tacos",
    price: 2900, stock: 100,
    description: "Caja x 100 unidades.",
    variants: [{ name: "Medida", options: ["S6", "S8", "S10", "S12"] }],
  }),

  // LÍNEA SEGURIDAD
  mk({
    name: "Cerradura Prive Doble Paleta",
    category: "linea-seguridad", subcategory: "Cerraduras", brand: "Prive",
    price: 18900, featured: true, stock: 25,
    description: "Cerradura de seguridad doble paleta.",
  }),
  mk({
    name: "Candado Bronzen 60 mm",
    category: "linea-seguridad", subcategory: "Candados", brand: "Bronzen",
    price: 8400, stock: 45,
    description: "Candado de bronce macizo.",
    variants: [{ name: "Marca", options: ["Prive", "Bulit", "Bronzen"] }, { name: "Medida", options: ["40 mm", "50 mm", "60 mm", "70 mm"] }],
  }),
  mk({
    name: "Pasador de Embutir",
    category: "linea-seguridad", subcategory: "Pasadores",
    price: 3200, stock: 70,
    description: "Pasador de embutir para puerta.",
    variants: [{ name: "Material", options: ["Madera", "Chapa"] }],
  }),

  // ELECTRICIDAD
  mk({
    name: "Térmica Bipolar 16A",
    category: "electricidad", subcategory: "Térmicas",
    price: 5600, featured: true, stock: 50,
    description: "Llave termomagnética bipolar.",
    variants: [{ name: "Amperaje", options: ["10A", "16A", "20A", "25A", "32A"] }],
  }),
  mk({
    name: "Enchufe Schuko",
    category: "electricidad", subcategory: "Enchufes",
    price: 1200, stock: 200,
    description: "Enchufe de embutir estándar.",
  }),
  mk({
    name: "Lámpara LED 12W",
    category: "electricidad", subcategory: "Lámparas",
    price: 2800, stock: 150,
    description: "Lámpara LED bajo consumo E27.",
    variants: [{ name: "Temperatura", options: ["Cálida", "Fría", "Neutra"] }],
  }),
];

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
