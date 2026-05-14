import prisma from '../config/db.js';

export const guardarEvaluacion = async (data) => {
  return await prisma.evaluacion.create({
    data: {
      tipo: data.tipo,
      resultado: data.resultado,
      comentario: data.comentario,
      estudianteId: data.estudianteId
    }
  });
};

export const obtenerEvaluacionesEstudiante = async (estudianteId) => {
  return await prisma.evaluacion.findMany({
    where: { estudianteId: estudianteId },
    orderBy: { createdAt: 'desc' }
  });
};