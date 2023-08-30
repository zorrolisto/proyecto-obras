import fs from "fs/promises";
import {
  tareas,
  Tarea,
  NRO_DE_SIMULACIONES,
  ResultadoTarea,
  Conclusiones,
} from "./data/data";

const obtenerFaltas = (trabajadores: number, probabilidadDeFalta: number) => {
  let faltas = 0;
  for (let i = 0; i < trabajadores; i++) {
    if (Math.random() <= probabilidadDeFalta / 100) faltas++;
  }
  return faltas;
};
const obtenerResultadosTarea = (
  tarea: Tarea,
  probabilidadDeFalta: number,
  porcentajeTrabajadoresMultiples: number
): ResultadoTarea => {
  const resultado = {
    tareaId: tarea.id,
    porcentajeTrabajadorAvanzaPorDia:
      100 / tarea.diasPorTrabajar / tarea.trabajadores,
    costoTotalTrabajadoresEsperado:
      tarea.trabajadores * tarea.trabajadorCostoPorDia * tarea.diasPorTrabajar,
    costoTotalMaquinariaEsperado:
      tarea.maquinariaCostoPorDia * tarea.diasPorTrabajar,
    trabajadoresMultiples: Math.ceil(
      tarea.trabajadores * (porcentajeTrabajadoresMultiples / 100)
    ),
    trabajadores: tarea.trabajadores,
    totalFaltas: 0,
    costoTotalTrabajadores: 0,
    costoTotalMaquinaria: 0,
    diasTrabajados: 0,
    categoria: tarea.categoria,
  };

  let diasTrabajados = 0;
  let porcentajeAvanzado = 0;

  while (porcentajeAvanzado < 100) {
    diasTrabajados++;

    const porcentajeQueFalta = 100 - porcentajeAvanzado;
    const trabajadoresNecesarios = Math.ceil(
      porcentajeQueFalta / resultado.porcentajeTrabajadorAvanzaPorDia
    );
    let trabajadoresQueAsistirán = tarea.trabajadores;
    if (trabajadoresNecesarios < tarea.trabajadores) {
      trabajadoresQueAsistirán = trabajadoresNecesarios;
    }
    let faltasDelDia = obtenerFaltas(
      trabajadoresQueAsistirán,
      probabilidadDeFalta
    );
    resultado.totalFaltas += faltasDelDia;
    if (faltasDelDia > resultado.trabajadoresMultiples) {
      faltasDelDia = faltasDelDia - resultado.trabajadoresMultiples;
    } else {
      faltasDelDia = 0;
    }
    const trabajadoresQueAsistieron = trabajadoresQueAsistirán - faltasDelDia;
    resultado.costoTotalTrabajadores +=
      tarea.trabajadorCostoPorDia * trabajadoresQueAsistieron;
    porcentajeAvanzado +=
      resultado.porcentajeTrabajadorAvanzaPorDia * trabajadoresQueAsistieron;
  }
  resultado.costoTotalMaquinaria = diasTrabajados * tarea.maquinariaCostoPorDia;
  resultado.diasTrabajados = diasTrabajados;
  return resultado;
};

const obtenerResultadosDeTodasLasTareas = (
  tareas: Tarea[],
  probabilidadDeFalta: number,
  porcentajeDeTrabajadoresMultiples: number
) => {
  const resultadosTareas: ResultadoTarea[] = [];
  tareas.forEach((tarea) => {
    const resultadoTarea = obtenerResultadosTarea(
      tarea,
      probabilidadDeFalta,
      porcentajeDeTrabajadoresMultiples
    );
    resultadosTareas.push(resultadoTarea);
  });
  return resultadosTareas;
};

const obtenerConclusionesDeResultadosDeProyectos = (
  resultadosSimulaciones: ResultadoTarea[][],
  resultadosSimulacionesSinTrabajadoresMultiples: ResultadoTarea[][]
): Conclusiones => {
  const conclusionesPromedio = {
    diasUsados: {
      "Habilitación Urbana": 0,
      Viviendas: 0,
    },
    diasUsadosSinTrabajadoresMultiples: {
      "Habilitación Urbana": 0,
      Viviendas: 0,
    },
    trabajadores: 0,
    trabajadoresTotal: 0,
    trabajadoresMultiples: 0,
    duracionDelProyecto: 0,
    duracionDelProyectoSinTrabajadoresMultiples: 0,
    costoDelProyecto: 0,
    costoDelProyectoSinTrabajadoresMultiples: 0,
    costoMaquinarias: 0,
    costoMaquinariasSinTrabajadoresMultiples: 0,
    costoTrabajadores: 0,
    costoTrabajadoresSinTrabajadoresMultiples: 0,
    dineroAhorradoMaquinaria: 0,
    dineroAhorradoTotal: 0,
    diasAhorrados: 0,
    nroDeFaltas: 0,
  };
  const getProm = (n: number) => n / resultadosSimulaciones.length;
  let trabajadores = 0;
  let trabajadoresMultiples = 0;
  let duracionDelProyectoPromViviendas = 0;
  let duracionDelProyectoPromHabilitacion = 0;
  let costoTrabajadoresProm = 0;
  let costoMaquinariasProm = 0;
  let nroDeFaltasProm = 0;
  resultadosSimulaciones.forEach((resultadosSimulacion) => {
    resultadosSimulacion.forEach((resultadoTarea) => {
      if (resultadoTarea.categoria === "Viviendas") {
        duracionDelProyectoPromViviendas += resultadoTarea.diasTrabajados;
      } else {
        duracionDelProyectoPromHabilitacion += resultadoTarea.diasTrabajados;
      }
      trabajadores += resultadoTarea.trabajadores;
      trabajadoresMultiples += resultadoTarea.trabajadoresMultiples;
      costoTrabajadoresProm += resultadoTarea.costoTotalTrabajadores;
      costoMaquinariasProm += resultadoTarea.costoTotalMaquinaria;
      nroDeFaltasProm += resultadoTarea.totalFaltas;
    });
  });
  conclusionesPromedio.trabajadores = getProm(trabajadores);
  conclusionesPromedio.trabajadoresMultiples = getProm(trabajadoresMultiples);
  conclusionesPromedio.trabajadoresTotal =
    conclusionesPromedio.trabajadores +
    conclusionesPromedio.trabajadoresMultiples;
  conclusionesPromedio.nroDeFaltas = getProm(nroDeFaltasProm);
  conclusionesPromedio.diasUsados.Viviendas = getProm(
    duracionDelProyectoPromViviendas
  );
  conclusionesPromedio.diasUsados["Habilitación Urbana"] = getProm(
    duracionDelProyectoPromHabilitacion
  );
  conclusionesPromedio.duracionDelProyecto = Math.max(
    conclusionesPromedio.diasUsados.Viviendas,
    conclusionesPromedio.diasUsados["Habilitación Urbana"]
  );
  conclusionesPromedio.costoTrabajadores = getProm(costoTrabajadoresProm);
  conclusionesPromedio.costoMaquinarias = getProm(costoMaquinariasProm);
  conclusionesPromedio.costoDelProyecto =
    conclusionesPromedio.costoTrabajadores +
    conclusionesPromedio.costoMaquinarias;
  duracionDelProyectoPromViviendas = 0;
  duracionDelProyectoPromHabilitacion = 0;
  costoTrabajadoresProm = 0;
  costoMaquinariasProm = 0;
  resultadosSimulacionesSinTrabajadoresMultiples.forEach(
    (resultadosSimulacion) => {
      resultadosSimulacion.forEach((resultadoTarea) => {
        if (resultadoTarea.categoria === "Viviendas") {
          duracionDelProyectoPromViviendas += resultadoTarea.diasTrabajados;
        } else {
          duracionDelProyectoPromHabilitacion += resultadoTarea.diasTrabajados;
        }
        costoTrabajadoresProm += resultadoTarea.costoTotalTrabajadores;
        costoMaquinariasProm += resultadoTarea.costoTotalMaquinaria;
      });
    }
  );
  conclusionesPromedio.diasUsadosSinTrabajadoresMultiples.Viviendas = getProm(
    duracionDelProyectoPromViviendas
  );
  conclusionesPromedio.diasUsadosSinTrabajadoresMultiples[
    "Habilitación Urbana"
  ] = getProm(duracionDelProyectoPromHabilitacion);
  conclusionesPromedio.duracionDelProyectoSinTrabajadoresMultiples = Math.max(
    conclusionesPromedio.diasUsadosSinTrabajadoresMultiples.Viviendas,
    conclusionesPromedio.diasUsadosSinTrabajadoresMultiples[
      "Habilitación Urbana"
    ]
  );
  conclusionesPromedio.costoTrabajadoresSinTrabajadoresMultiples = getProm(
    costoTrabajadoresProm
  );
  conclusionesPromedio.costoMaquinariasSinTrabajadoresMultiples =
    getProm(costoMaquinariasProm);
  conclusionesPromedio.costoDelProyectoSinTrabajadoresMultiples =
    conclusionesPromedio.costoTrabajadoresSinTrabajadoresMultiples +
    conclusionesPromedio.costoMaquinariasSinTrabajadoresMultiples;

  conclusionesPromedio.dineroAhorradoMaquinaria =
    conclusionesPromedio.costoMaquinariasSinTrabajadoresMultiples -
    conclusionesPromedio.costoMaquinarias;
  conclusionesPromedio.diasAhorrados =
    conclusionesPromedio.diasUsadosSinTrabajadoresMultiples.Viviendas +
    conclusionesPromedio.diasUsadosSinTrabajadoresMultiples[
      "Habilitación Urbana"
    ] -
    (conclusionesPromedio.diasUsados.Viviendas +
      conclusionesPromedio.diasUsados["Habilitación Urbana"]);
  conclusionesPromedio.duracionDelProyectoSinTrabajadoresMultiples -
    conclusionesPromedio.duracionDelProyecto;
  conclusionesPromedio.dineroAhorradoTotal =
    conclusionesPromedio.dineroAhorradoMaquinaria;

  return conclusionesPromedio;
};

const formatearConSoloUnDecimal = (conclusionesPromedio: Conclusiones) => {
  Object.entries(conclusionesPromedio).forEach(([key, value]) => {
    const keyDef = key as keyof typeof conclusionesPromedio;
    if (
      keyDef === "diasUsados" ||
      keyDef === "diasUsadosSinTrabajadoresMultiples"
    ) {
      return;
    }
    conclusionesPromedio[keyDef] = Math.round(Number(value) * 10) / 10;
  });
  conclusionesPromedio.diasUsados.Viviendas =
    Math.round(conclusionesPromedio.diasUsados.Viviendas * 10) / 10;
  conclusionesPromedio.diasUsados["Habilitación Urbana"] =
    Math.round(conclusionesPromedio.diasUsados["Habilitación Urbana"] * 10) /
    10;
  conclusionesPromedio.diasUsadosSinTrabajadoresMultiples.Viviendas =
    Math.round(
      conclusionesPromedio.diasUsadosSinTrabajadoresMultiples.Viviendas * 10
    ) / 10;
  conclusionesPromedio.diasUsadosSinTrabajadoresMultiples[
    "Habilitación Urbana"
  ] =
    Math.round(
      conclusionesPromedio.diasUsadosSinTrabajadoresMultiples[
        "Habilitación Urbana"
      ] * 10
    ) / 10;

  return conclusionesPromedio;
};

const simularProyecto = (
  probabilidadDeFalta: number,
  porcentajeTrabajadoresMultiples: number
) => {
  const resultadosSimulaciones = [];
  for (let i = 0; i < NRO_DE_SIMULACIONES; i++) {
    const resultadosTareas = obtenerResultadosDeTodasLasTareas(
      tareas,
      probabilidadDeFalta,
      porcentajeTrabajadoresMultiples
    );
    resultadosSimulaciones.push(resultadosTareas);
  }
  const resultadosSimulacionesSinTrabajadoresMultiples = [];
  for (let i = 0; i < NRO_DE_SIMULACIONES; i++) {
    const resultadosTareas = obtenerResultadosDeTodasLasTareas(
      tareas,
      probabilidadDeFalta,
      0
    );
    resultadosSimulacionesSinTrabajadoresMultiples.push(resultadosTareas);
  }
  const conclusionesPromedio = obtenerConclusionesDeResultadosDeProyectos(
    resultadosSimulaciones,
    resultadosSimulacionesSinTrabajadoresMultiples
  );

  return formatearConSoloUnDecimal(conclusionesPromedio);
};

const main = () => {
  const conclusiones: ({
    probabilidadDeFalta: number;
    porcentajeTrabajadoresMultiples: number;
  } & Conclusiones)[] = [];

  for (let j = 1; j <= 100; j++) {
    console.log("-------------------");
    console.log(
      `probabilidadDeFalta: ${10}% y porcentajeTrabajadoresMultiples: ${j}%`
    );
    const conclusionesPromedio = simularProyecto(10, j);
    conclusiones.push({
      probabilidadDeFalta: 10,
      porcentajeTrabajadoresMultiples: j,
      ...conclusionesPromedio,
    });
    console.log(
      `Porcentaje Avanzado: ${Math.round(((j * 100) / 100) * 10) / 10}% `
    );
  }
  const jsonData = JSON.stringify(conclusiones);
  fs.writeFile("data.json", jsonData);
};

main();
