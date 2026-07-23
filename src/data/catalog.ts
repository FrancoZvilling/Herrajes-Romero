// Casa Romero Herrajes - Catálogo simulado
// Estructura escalable: cada categoría contiene productos con variantes opcionales.

export type VariantOption = {
  value: string;
  price?: number;
};

export type VariantGroup = {
  name: string;
  options: VariantOption[];
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
  imageUrl?: string;
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
      { name: "Material", options: [{ value: "Bronce" }, { value: "Aluminio" }, { value: "Acero Inoxidable" }, { value: "Hierro Forjado" }] },
      { name: "Acabado", options: [{ value: "Pulido" }, { value: "Mate" }, { value: "Envejecido" }] },
    ],
  }),
  mk({
    name: "Manija Giratoria Recta",
    category: "linea-puerta", subcategory: "Manijas", brand: "Prive",
    price: 14200, stock: 40,
    description: "Manija giratoria de diseño recto minimalista.",
    variants: [{ name: "Material", options: [{ value: "Bronce" }, { value: "Aluminio" }, { value: "Acero Inoxidable" }] }],
  }),
  mk({
    name: "Manijón para Puerta",
    category: "linea-puerta", subcategory: "Manijones", brand: "Kallay",
    price: 26900, featured: true, stock: 18,
    description: "Manijón de gran porte, ideal para puertas de entrada de madera maciza.",
    variants: [
      { name: "Material", options: [{ value: "Hierro Forjado" }, { value: "Bronce" }, { value: "Acero Inoxidable" }, { value: "Aluminio" }] },
      { name: "Largo", options: [{ value: "30 cm" }, { value: "45 cm" }, { value: "60 cm" }, { value: "90 cm" }] },
    ],
  }),
  mk({
    name: "Bocallave Cilíndrica",
    category: "linea-puerta", subcategory: "Accesorios", brand: "Bronzen",
    price: 3200, stock: 120,
    description: "Bocallave para cerradura de embutir, terminación uniforme.",
    variants: [{ name: "Acabado", options: [{ value: "Bronce" }, { value: "Cromo" }, { value: "Negro Mate" }] }],
  }),
  mk({
    name: "Pomo Doble Balancín",
    category: "linea-puerta", subcategory: "Pomos", brand: "Prive",
    price: 9800, stock: 60,
    description: "Pomo doble balancín, funcionamiento suave.",
    variants: [{ name: "Tipo", options: [{ value: "Doble Balancín" }, { value: "Giratorio" }, { value: "Fijo" }] }],
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
      { name: "Instalación", options: [{ value: "Para Soldar" }, { value: "Para Atornillar" }] },
      { name: "Medida", options: [{ value: '2"' }, { value: '2½"' }, { value: '3"' }, { value: '4"' }] },
    ],
  }),
  mk({
    name: "Cierrapuerta Hidráulico",
    category: "linea-puerta", subcategory: "Cierrapuertas", brand: "Sica",
    price: 34500, featured: true, stock: 12,
    description: "Cierrapuerta hidráulico regulable, ideal para tránsito medio-alto.",
    variants: [{ name: "Fuerza", options: [{ value: "60N" }, { value: "80N" }, { value: "100N" }, { value: "120N" }] }],
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
      { name: "Diámetro", options: [{ value: "80 mm" }, { value: "100 mm" }, { value: "120 mm" }, { value: "150 mm" }] },
      { name: "Soporte", options: [{ value: "Con Soporte" }, { value: "Sin Soporte" }] },
    ],
  }),
  mk({
    name: "Cremallera para Portón",
    category: "linea-porton", subcategory: "Cremalleras", brand: "MR",
    price: 18500, stock: 25,
    description: "Cremallera de acero para motorización de portón corredizo.",
    variants: [{ name: "Largo", options: [{ value: "1 m" }, { value: "2 m" }] }],
  }),
  mk({
    name: "Pasador Herrero",
    category: "linea-porton", subcategory: "Pasadores", brand: "Currao",
    price: 5600, stock: 90,
    description: "Pasador de portón, reforzado.",
    variants: [{ name: "Instalación", options: [{ value: "Para Soldar" }, { value: "Para Atornillar" }] }],
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
      { name: "Medida", options: [{ value: "15 cm" }, { value: "20 cm" }, { value: "25 cm" }, { value: "30 cm" }, { value: "40 cm" }] },
      { name: "Color", options: [{ value: "Blanco" }, { value: "Negro" }, { value: "Zincado" }] },
    ],
  }),
  mk({
    name: "Set Ménsula Microondas 40x60",
    category: "mensulas", subcategory: "Microondas", brand: "Sidañez Herrajes",
    price: 8200, stock: 45,
    description: "Set completo para colgar microondas. Capacidad hasta 40 kg.",
    variants: [{ name: "Color", options: [{ value: "Blanco" }, { value: "Negro" }] }],
  }),
  mk({
    name: "Ménsula Aire Acondicionado Reforzada",
    category: "mensulas", subcategory: "Aire Acondicionado", brand: "FC Metalúrgica",
    price: 11500, featured: true, stock: 60,
    description: "Ménsula para split hasta 6000 frigorías.",
    variants: [{ name: "Tipo", options: [{ value: "Reforzado Blanco" }, { value: "Intermedio Zincado" }] }],
  }),
  mk({
    name: "Riel para Ménsula",
    category: "mensulas", subcategory: "Rieles", brand: "Sidañez Herrajes",
    price: 3200, stock: 120,
    description: "Riel de pared para sistema modular de estantes.",
    variants: [
      { name: "Largo", options: [{ value: "0.50 m" }, { value: "1 m" }, { value: "1.50 m" }, { value: "2 m" }] },
      { name: "Color", options: [{ value: "Blanco" }, { value: "Negro" }] },
    ],
  }),
  mk({
    name: "Ménsula Rebatible",
    category: "mensulas", subcategory: "Rebatibles", brand: "Sidañez Herrajes",
    price: 6400, stock: 40,
    description: "Ménsula rebatible color blanco.",
    variants: [{ name: "Medida", options: [{ value: "20 cm" }, { value: "25 cm" }, { value: "30 cm" }, { value: "35 cm" }, { value: "47 cm" }] }],
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
    variants: [{ name: "Color", options: [{ value: "Blanco" }, { value: "Negro" }, { value: "Cromo" }] }],
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
    variants: [{ name: "Medida", options: [{ value: "64 mm" }, { value: "96 mm" }, { value: "128 mm" }] }],
  }),
  mk({
    name: "Manija Plástica Muebles",
    category: "linea-mueble", subcategory: "Tiradores", brand: "Simeplast",
    price: 480, stock: 800,
    description: "Manija plástica para muebles.",
    variants: [
      { name: "Medida", options: [{ value: "32 mm" }, { value: "64 mm" }, { value: "96 mm" }, { value: "128 mm" }, { value: "160 mm" }, { value: "192 mm" }, { value: "224 mm" }, { value: "256 mm" }, { value: "320 mm" }] },
      { name: "Color", options: [{ value: "Negro" }, { value: "Blanco" }, { value: "Cromo" }, { value: "Bronce" }] },
    ],
  }),
  mk({
    name: "Bisagra Cazoleta 35 mm",
    category: "linea-mueble", subcategory: "Bisagras", brand: "Alce",
    price: 1350, featured: true, stock: 400,
    description: "Bisagra cazoleta con cierre suave.",
    variants: [
      { name: "Diámetro", options: [{ value: "26 mm" }, { value: "35 mm" }] },
      { name: "Ángulo", options: [{ value: "90°" }, { value: "165°" }] },
      { name: "Forma", options: [{ value: "Redonda" }, { value: "Cuadrada" }] },
    ],
  }),
  mk({
    name: "Bisagra Libro",
    category: "linea-mueble", subcategory: "Bisagras", brand: "FC Metalúrgica",
    price: 620, stock: 350,
    description: "Bisagra tipo libro.",
    variants: [{ name: "Medida", options: [{ value: "25 mm" }, { value: "38 mm" }, { value: "50 mm" }, { value: "63 mm" }, { value: "75 mm" }] }],
  }),
  mk({
    name: "Corredera Telescópica Reforzada",
    category: "linea-mueble", subcategory: "Correderas", brand: "Alce",
    price: 4800, featured: true, stock: 90,
    description: "Corredera telescópica reforzada para cajones pesados.",
    variants: [
      { name: "Largo", options: [{ value: "25 cm" }, { value: "30 cm" }, { value: "35 cm" }, { value: "40 cm" }, { value: "45 cm" }, { value: "50 cm" }, { value: "55 cm" }, { value: "60 cm" }] },
      { name: "Tipo", options: [{ value: "Mini" }, { value: "Reforzada" }] },
    ],
  }),
  mk({
    name: "Pata Plástica Regulable",
    category: "linea-mueble", subcategory: "Patas", brand: "Simeplast",
    price: 320, stock: 600,
    description: "Pata de mueble regulable en altura.",
    variants: [{ name: "Material", options: [{ value: "Plástica" }, { value: "Metálica" }] }],
  }),
  mk({
    name: "Regatón Plástico",
    category: "linea-mueble", subcategory: "Regatones", brand: "Simeplast",
    price: 180, stock: 1200,
    description: "Regatón plástico para patas de silla y mueble.",
    variants: [
      { name: "Forma", options: [{ value: "Redondo" }, { value: "Cuadrado" }, { value: "Rectangular" }] },
      { name: "Medida", options: [{ value: '1/2"' }, { value: '3/4"' }, { value: '1"' }, { value: '1¼"' }, { value: '20 mm' }, { value: '25 mm' }, { value: '30 mm' }, { value: '38 mm' }] },
    ],
  }),
  mk({
    name: "Brazo Hidráulico para Alacena",
    category: "linea-mueble", subcategory: "Brazos hidráulicos", brand: "Alce",
    price: 7200, stock: 70,
    description: "Brazo hidráulico para puertas rebatibles de alacena.",
    variants: [{ name: "Fuerza", options: [{ value: "60N" }, { value: "80N" }, { value: "100N" }, { value: "120N" }, { value: "150N" }] }],
  }),
  mk({
    name: "Rueda con Freno",
    category: "linea-mueble", subcategory: "Ruedas", brand: "FC Metalúrgica",
    price: 1800, stock: 250,
    description: "Rueda giratoria para muebles.",
    variants: [
      { name: "Freno", options: [{ value: "Con Freno" }, { value: "Sin Freno" }] },
      { name: "Diámetro", options: [{ value: "50 mm" }, { value: "75 mm" }, { value: "100 mm" }] },
    ],
  }),

  // LÍNEA VENTANA
  mk({
    name: "Falleba de Embutir",
    category: "linea-ventana", subcategory: "Fallebas", brand: "Kallay",
    price: 5400, featured: true, stock: 60,
    description: "Falleba embutida para ventanas de madera.",
    variants: [{ name: "Medida", options: [{ value: "12 mm" }, { value: "18 mm" }] }],
  }),
  mk({
    name: "Varilla para Falleba",
    category: "linea-ventana", subcategory: "Fallebas", brand: "Kallay",
    price: 2100, stock: 150,
    description: "Varilla de acero para falleba.",
    variants: [
      { name: "Diámetro", options: [{ value: "12 mm" }, { value: "18 mm" }] },
      { name: "Largo", options: [{ value: "1 m" }, { value: "1.20 m" }, { value: "1.50 m" }, { value: "1.80 m" }, { value: "2 m" }] },
    ],
  }),
  mk({
    name: "Brazo de Empuje",
    category: "linea-ventana", subcategory: "Brazos", brand: "MR",
    price: 3800, stock: 120,
    description: "Brazo de empuje para ventana corrediza.",
    variants: [
      { name: "Material", options: [{ value: "Madera" }, { value: "Chapa" }, { value: "Aluminio" }] },
      { name: "Medida", options: [{ value: "25 cm" }, { value: "30 cm" }, { value: "40 cm" }, { value: "50 cm" }] },
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
    variants: [{ name: "Perfil", options: [{ value: "Oval" }, { value: "Redondo" }] }],
  }),

  // CORTINA DE ENROLLAR
  mk({
    name: "Enrollador Reforzado",
    category: "cortinas-enrollar", subcategory: "Enrolladores", brand: "MR",
    price: 8400, featured: true, stock: 55,
    description: "Enrollador reforzado para cortinas grandes.",
    variants: [{ name: "Tipo", options: [{ value: "Común" }, { value: "Reforzado" }] }],
  }),
  mk({
    name: "Polea de Cortina",
    category: "cortinas-enrollar", subcategory: "Poleas", brand: "MR",
    price: 3200, stock: 90,
    description: "Polea metálica para cortina de enrollar.",
    variants: [{ name: "Tipo", options: [{ value: "Común" }, { value: "Reforzada" }] }],
  }),
  mk({
    name: "Reductor 3:1",
    category: "cortinas-enrollar", subcategory: "Aparatos", brand: "MR",
    price: 5800, stock: 40,
    description: "Reductor para cortinas pesadas.",
    variants: [{ name: "Relación", options: [{ value: "3:1" }, { value: "4:1" }] }],
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
    variants: [{ name: "Modelo", options: [{ value: "D52" }, { value: "Colgante Simple" }, { value: "Colgante Doble" }, { value: "Pliru" }, { value: "MR PLUS" }] }],
  }),
  mk({
    name: "Guía Superior Doble J",
    category: "sistema-corredizo", subcategory: "Guías", brand: "MR",
    price: 6800, stock: 30,
    description: "Guía superior para sistema corredizo.",
    variants: [{ name: "Modelo", options: [{ value: "Doble J" }, { value: "Riel D52" }, { value: "Pliru" }, { value: "168" }, { value: "164" }] }],
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
    variants: [{ name: "Color", options: [{ value: "Transparente" }, { value: "Metálico" }] }],
  }),

  // TORNILLERÍA
  mk({
    name: "Tornillo Caser Drill Dorado (x100)",
    category: "tornilleria", subcategory: "Caser drill", brand: "FC Metalúrgica",
    price: 4800, featured: true, stock: 60,
    description: "Caja x 100 unidades. Tornillo autoperforante dorado.",
    variants: [
      { name: "Diámetro", options: [{ value: "Ø 2.5" }, { value: "Ø 3" }, { value: "Ø 3.5" }, { value: "Ø 4" }, { value: "Ø 5" }, { value: "Ø 6" }] },
      { name: "Largo", options: [{ value: "12 mm" }, { value: "16 mm" }, { value: "20 mm" }, { value: "25 mm" }, { value: "30 mm" }, { value: "40 mm" }, { value: "50 mm" }] },
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
    variants: [{ name: "Medida", options: [{ value: "S6" }, { value: "S8" }, { value: "S10" }, { value: "S12" }] }],
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
    variants: [{ name: "Marca", options: [{ value: "Prive" }, { value: "Bulit" }, { value: "Bronzen" }] }, { name: "Medida", options: [{ value: "40 mm" }, { value: "50 mm" }, { value: "60 mm" }, { value: "70 mm" }] }],
  }),
  mk({
    name: "Pasador de Embutir",
    category: "linea-seguridad", subcategory: "Pasadores",
    price: 3200, stock: 70,
    description: "Pasador de embutir para puerta.",
    variants: [{ name: "Material", options: [{ value: "Madera" }, { value: "Chapa" }] }],
  }),

  // ELECTRICIDAD
  mk({
    name: "Térmica Bipolar 16A",
    category: "electricidad", subcategory: "Térmicas",
    price: 5600, featured: true, stock: 50,
    description: "Llave termomagnética bipolar.",
    variants: [{ name: "Amperaje", options: [{ value: "10A" }, { value: "16A" }, { value: "20A" }, { value: "25A" }, { value: "32A" }] }],
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
    variants: [{ name: "Temperatura", options: [{ value: "Cálida" }, { value: "Fría" }, { value: "Neutra" }] }],
  }),
];

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
