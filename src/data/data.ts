export const tareas1 = [
  {
    id: 1,
    nombre: "Movimiento de tierras",
    diasPorTrabajar: 5,
    trabajadores: 5,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 10,
    maquinariaCostoPorDia: 1000,
  },
];

export const tareas = [
  {
    id: 1,
    nombre: "Movimiento de tierras",
    diasPorTrabajar: 20,
    trabajadores: 7,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 90,
    maquinariaCostoPorDia: 3270,
  },
  {
    id: 2,
    nombre: "Solado, Izage de columnas y zapatas",
    diasPorTrabajar: 25,
    trabajadores: 10,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 90,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 3,
    nombre: "Vaciado de concreto en cimientos y sobrecimientos",
    diasPorTrabajar: 36,
    trabajadores: 39,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 80,
    maquinariaCostoPorDia: 1120,
  },
  {
    id: 4,
    nombre: "Asentado de ladrillo",
    diasPorTrabajar: 36,
    trabajadores: 60,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 90,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 5,
    nombre: "Encofrado y vaceado de concreto en columnas",
    diasPorTrabajar: 22,
    trabajadores: 30,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 60,
    maquinariaCostoPorDia: 1060,
  },
  {
    id: 6,
    nombre: "Encofrado y vaceado de concreto en techos",
    diasPorTrabajar: 24,
    trabajadores: 8,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 60,
    maquinariaCostoPorDia: 920,
  },
  {
    id: 7,
    nombre: "Instalaciones sanitarias",
    diasPorTrabajar: 22,
    trabajadores: 8,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 110,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 8,
    nombre: "Instalaciones eléctricas",
    diasPorTrabajar: 18,
    trabajadores: 3,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 110,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 9,
    nombre: "Tarrajeo de paredes y pisos",
    diasPorTrabajar: 30,
    trabajadores: 6,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 90,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 10,
    nombre: "Pintura",
    diasPorTrabajar: 31,
    trabajadores: 5,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 80,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 11,
    nombre: "Puertas y vidrios",
    diasPorTrabajar: 32,
    trabajadores: 5,
    categoria: "Viviendas",
    trabajadorCostoPorDia: 80,
    maquinariaCostoPorDia: 0,
  },
  {
    id: 12,
    nombre: "Movimiento de tierras",
    diasPorTrabajar: 10,
    trabajadores: 4,
    categoria: "Habilitación Urbana",
    trabajadorCostoPorDia: 90,
    maquinariaCostoPorDia: 3490,
  },
  {
    id: 13,
    nombre: "Red de agua y desague",
    diasPorTrabajar: 38,
    trabajadores: 16,
    categoria: "Habilitación Urbana",
    trabajadorCostoPorDia: 80,
    maquinariaCostoPorDia: 950,
  },
  {
    id: 14,
    nombre: "Veredas",
    diasPorTrabajar: 20,
    trabajadores: 5,
    categoria: "Habilitación Urbana",
    trabajadorCostoPorDia: 80,
    maquinariaCostoPorDia: 1250,
  },
  {
    id: 15,
    nombre: "Izage de postes y sistema eléctrico",
    diasPorTrabajar: 21,
    trabajadores: 6,
    categoria: "Habilitación Urbana",
    trabajadorCostoPorDia: 100,
    maquinariaCostoPorDia: 1530,
  },
  {
    id: 16,
    nombre: "Pavimento",
    diasPorTrabajar: 12,
    trabajadores: 7,
    categoria: "Habilitación Urbana",
    trabajadorCostoPorDia: 120,
    maquinariaCostoPorDia: 1600,
  },
];

export const PROBABILIDAD_DE_FALTA = 20;
export const PORCENTAJE_TRABAJADORES_MULTIPLES = 20;
export const NRO_DE_SIMULACIONES = 100000;

export type ResultadoTarea = {
  tareaId: number;
  porcentajeTrabajadorAvanzaPorDia: number;
  costoTotalTrabajadoresEsperado: number;
  costoTotalMaquinariaEsperado: number;
  trabajadores: number;
  trabajadoresMultiples: number;
  totalFaltas: number;
  costoTotalTrabajadores: number;
  costoTotalMaquinaria: number;
  diasTrabajados: number;
  categoria: string;
};
export type Tarea = {
  id: number;
  nombre: string;
  diasPorTrabajar: number;
  trabajadores: number;
  categoria: string;
  trabajadorCostoPorDia: number;
  maquinariaCostoPorDia: number;
};

export type ConclusionesCompressed = {
  probabilidadDeFalta: number;
  porcentajeTrabajadoresMultiples: number;
  diasAhorrados: number;
  dineroAhorradoTotal: number;
  dineroAhorradoTrabajadores: number;
  dineroAhorradoMaquinaria: number;
};

export type DiasUsados = {
  "Habilitación Urbana": number;
  Viviendas: number;
};
export type Conclusiones = {
  diasUsados: DiasUsados;
  diasUsadosSinTrabajadoresMultiples: DiasUsados;
  trabajadoresTotal: number;
  trabajadores: number;
  trabajadoresMultiples: number;
  duracionDelProyecto: number;
  duracionDelProyectoSinTrabajadoresMultiples: number;
  costoDelProyecto: number;
  costoDelProyectoSinTrabajadoresMultiples: number;
  costoMaquinarias: number;
  costoMaquinariasSinTrabajadoresMultiples: number;
  costoTrabajadores: number;
  dineroAhorradoMaquinaria: number;
  dineroAhorradoTotal: number;
  diasAhorrados: number;
  nroDeFaltas: number;
};
