import prisma from '../config/db.js';

export const guardarEvaluacion = async (data) => {
  return await prisma.evaluacion.create({
    data: {
      tipo: data.tipo, // Guardará si es "Trimestral" o "Semestral"
      resultado: data.resultado, // Guardará todo el formulario con las L, EP y NO
      comentario: data.comentario, // El campo de texto libre final
      estudianteId: data.estudianteId // A qué niño le pertenece
    }
  });
};

export const obtenerEvaluacionesEstudiante = async (estudianteId) => {
  return await prisma.evaluacion.findMany({
    where: { estudianteId: estudianteId },
    orderBy: { createdAt: 'desc' }
  });
};