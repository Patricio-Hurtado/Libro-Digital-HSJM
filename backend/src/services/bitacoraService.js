import prisma from '../config/db.js';

export const registrarBitacora = async (data) => {
  // Prisma nos permite guardar la clase y TODAS las notas de los niños al mismo tiempo
  return await prisma.bitacora.create({
    data: {
      fecha: new Date(data.fecha),
      ambito: data.ambito,
      nucleo: data.nucleo,
      descripcionOA: data.descripcionOA,
      // Aquí creamos las notas enganchadas a esta bitácora
      evaluaciones: {
        create: data.evaluaciones.map(nota => ({
          estudianteId: nota.estudianteId,
          calificacion: nota.calificacion
        }))
      }
    }
  });
};

export const listarBitacoras = async () => {
  return await prisma.bitacora.findMany({
    orderBy: { fecha: 'desc' },
    include: { evaluaciones: true } // Trae también las notas
  });
};