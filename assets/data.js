const PROGRAMS = [
  {
    icon: "🌱",
    name: "Inicio Full Body",
    desc: "Base de fuerza para principiantes. 3 días por semana.",
    tags: ["Principiante", "Fuerza"],
    plan: [
      ["Lunes", "Sentadilla 3×10 · Press banca 3×10 · Remo con mancuerna 3×10 · Plancha 3×30s"],
      ["Miércoles", "Peso muerto rumano 3×10 · Press militar 3×10 · Jalón al pecho 3×12 · Zancadas 3×10"],
      ["Viernes", "Prensa 3×12 · Flexiones 3×máx · Remo en polea 3×12 · Elevación de piernas 3×12"],
    ],
  },
  {
    icon: "🏋️",
    name: "Hipertrofia PPL",
    desc: "Push / Pull / Legs para ganar masa muscular. 6 días.",
    tags: ["Intermedio", "Músculo"],
    plan: [
      ["Push (L/J)", "Press banca 4×8 · Press inclinado 3×10 · Press militar 3×10 · Fondos 3×12 · Extensión tríceps 3×12"],
      ["Pull (M/V)", "Dominadas 4×8 · Remo con barra 4×8 · Face pull 3×15 · Curl bíceps 3×12 · Curl martillo 3×12"],
      ["Legs (X/S)", "Sentadilla 4×8 · Peso muerto rumano 3×10 · Prensa 3×12 · Curl femoral 3×12 · Gemelos 4×15"],
    ],
  },
  {
    icon: "🔥",
    name: "HIIT Quema Grasa",
    desc: "Sesiones cortas e intensas de 25 minutos. 4 días.",
    tags: ["Todos", "Cardio"],
    plan: [
      ["Día 1", "Burpees · Mountain climbers · Jumping jacks · Sentadilla con salto — 40/20 × 8"],
      ["Día 2", "Sprint en bici 30/30 × 10 + core 10 min"],
      ["Día 3", "Kettlebell swing · Flexiones · Zancadas con salto · Plancha — 40/20 × 8"],
      ["Día 4", "Remo ergómetro 250 m × 8 (descanso 1 min)"],
    ],
  },
  {
    icon: "🧘",
    name: "Movilidad & Core",
    desc: "Flexibilidad, postura y un core sólido. 3 días.",
    tags: ["Todos", "Movilidad"],
    plan: [
      ["Día A", "Cat-cow · 90/90 cadera · Puente de glúteo 3×15 · Dead bug 3×10 · Plancha lateral 3×30s"],
      ["Día B", "Saludo al sol × 5 · Estiramiento de isquios · Bird dog 3×10 · Hollow hold 3×20s"],
      ["Día C", "Rotaciones torácicas · Sentadilla profunda 3×60s · Pallof press 3×12 · Rueda abdominal 3×8"],
    ],
  },
];

const EXERCISES = [
  { name: "Sentadilla", group: "Piernas", level: "Básico", tip: "Pies al ancho de hombros, rodillas en línea con los pies, espalda neutra." },
  { name: "Peso muerto", group: "Espalda", level: "Intermedio", tip: "Barra pegada al cuerpo, empuja el suelo y bloquea con glúteos." },
  { name: "Press banca", group: "Pecho", level: "Básico", tip: "Escápulas retraídas, baja la barra al esternón de forma controlada." },
  { name: "Dominadas", group: "Espalda", level: "Intermedio", tip: "Inicia deprimiendo escápulas y lleva el pecho hacia la barra." },
  { name: "Press militar", group: "Hombros", level: "Básico", tip: "Core apretado, empuja la barra en línea recta sobre la cabeza." },
  { name: "Zancadas", group: "Piernas", level: "Básico", tip: "Paso largo, rodilla trasera casi toca el suelo, torso erguido." },
  { name: "Remo con barra", group: "Espalda", level: "Intermedio", tip: "Torso a 45°, tira hacia el ombligo y junta escápulas." },
  { name: "Flexiones", group: "Pecho", level: "Básico", tip: "Cuerpo en bloque, codos a ~45° del torso." },
  { name: "Fondos", group: "Brazos", level: "Intermedio", tip: "Inclínate ligeramente hacia delante para más pecho, recto para tríceps." },
  { name: "Curl de bíceps", group: "Brazos", level: "Básico", tip: "Codos fijos a los costados, sin balancear el cuerpo." },
  { name: "Plancha", group: "Core", level: "Básico", tip: "Glúteos y abdomen activos, línea recta de cabeza a talones." },
  { name: "Hip thrust", group: "Piernas", level: "Básico", tip: "Barbilla al pecho, extiende cadera apretando glúteos arriba." },
  { name: "Elevaciones laterales", group: "Hombros", level: "Básico", tip: "Ligera flexión de codo, sube hasta la altura del hombro." },
  { name: "Dead bug", group: "Core", level: "Básico", tip: "Zona lumbar pegada al suelo mientras extiendes brazo y pierna opuestos." },
  { name: "Burpees", group: "Cardio", level: "Intermedio", tip: "Fluido y rítmico: plancha, flexión, salto con brazos arriba." },
  { name: "Kettlebell swing", group: "Cardio", level: "Intermedio", tip: "Movimiento de bisagra de cadera, no de sentadilla." },
  { name: "Rueda abdominal", group: "Core", level: "Avanzado", tip: "No dejes que la zona lumbar se hunda; avanza solo hasta donde controles." },
  { name: "Pistol squat", group: "Piernas", level: "Avanzado", tip: "Trabaja primero con apoyo o a un banco para ganar control." },
];
