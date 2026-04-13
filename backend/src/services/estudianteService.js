// backend/src/services/estudianteService.js
import prisma from '../config/db.js';

export const registrarEstudiante = async (data) => {
  // Aquí es donde transformamos los datos si es necesario
  return await prisma.estudiante.create({
    data: {
      ...data,
      // Convertimos el string de la fecha a un objeto Date real para PostgreSQL
      fechaNacimiento: new Date(data.fechaNacimiento)
    }
  });
};

export const listarEstudiantes = async () => {
  return await prisma.estudiante.findMany({
    orderBy: { apellido: 'asc' }
  });
};