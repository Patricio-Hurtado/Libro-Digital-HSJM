import prisma from '../config/db.js';

export const registrarBitacora = async (data) => {
  return await prisma.bitacora.create({
    data: {
      fecha: new Date(data.fecha),
      ambito: data.ambito,
      nucleo: data.nucleo,
      descripcionOA: data.descripcionOA,
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
    include: { evaluaciones: true }
  });
};