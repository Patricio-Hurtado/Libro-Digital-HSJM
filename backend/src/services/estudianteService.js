// backend/src/services/estudianteService.js
import prisma from '../config/db.js';

export const registrarEstudiante = async (data) => {
  // Mapeo para convertir el texto del Select al Enum de la base de datos
  const nivelMapper = {
    'Sala Cuna Menor': 'SALA_CUNA_MENOR',
    'Sala Cuna Mayor': 'SALA_CUNA_MAYOR',
    'Nivel Medio Menor': 'NIVEL_MEDIO_MENOR',
    'Nivel Medio Mayor': 'NIVEL_MEDIO_MAYOR'
  };
  // Aquí es donde transformamos los datos si es necesario
  return await prisma.estudiante.create({
    data: {
      // Identificación
      rut: data.rut,
      nombre: data.nombre,
      apellido: data.apellido,
      sexo: data.sexo,
      // Convertimos el string de la fecha a un objeto Date real para PostgreSQL
      fechaNacimiento: new Date(data.fechaNacimiento),
      nacionalidad: data.nacionalidad || 'Chilena',

      // Domicilio
      direccion: data.direccion,
      comuna: data.comuna || 'Melipilla',

      // Salud
      prevision: data.prevision,
      tipoSangre: data.tipoSangre,
      alergias: data.alergias,
      restriccionesAliment: data.restriccionesAlimentarias,
      vacunasAlDia: data.vacunasAlDía === 'Sí', // Convierte el "Sí/No" en Boolean

      // Apoderado
      nombreApoderado: data.nombreApoderado,
      rutApoderado: data.rutApoderado,
      parentesco: data.parentesco,
      telefono: data.telefono,
      emailApoderado: data.emailApoderado,

      // Matrícula
      fechaIngreso: data.fechaIngreso ? new Date(data.fechaIngreso) : new Date(),
      nivel: nivelMapper[data.nivel] || 'NIVEL_MEDIO_MAYOR',
      estado: data.estado === 'Vigente' ? 'VIGENTE' : 'RETIRADO'
    }
  });
};

export const listarEstudiantes = async () => {
  return await prisma.estudiante.findMany({
    orderBy: { apellido: 'asc' }
  });
};