import prisma from '../config/db.js';

export const obtenerOpcionesFormulario = async () => {
  const [comunas, niveles, sexos, sangres, nacionalidades] = await Promise.all([
    prisma.comuna.findMany({ orderBy: { comuna: 'asc' } }),
    prisma.nivel.findMany({ orderBy: { nivel: 'asc' } }),
    prisma.sexo.findMany({ orderBy: { genero: 'asc' } }),
    prisma.grupoSanguineo.findMany({ orderBy: { grupo: 'asc' } }),
    prisma.nacionalidad.findMany({ orderBy: { nacionalidad: 'asc' } })
  ]);

  return {
    comunas,
    niveles,
    sexos,
    sangres,
    nacionalidades
  };
};