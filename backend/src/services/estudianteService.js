import prisma from '../config/db.js';

export const registrarEstudiante = async (datos) => {
  return await prisma.$transaction(async (tx) => {

    // 1. Función interna para procesar apoderados (Upsert)
    const UpsertApoderado = async (ap) => {
      if (!ap || !ap.rut) return null; // Si no hay datos de apoderado, retornamos null para el suplente

      return await tx.apoderado.upsert({
        where: { rutApoderado: ap.rut },
        update: {
          nombreApoderado: ap.nombre,
          telefono: ap.telefono,
          emailApoderado: ap.email
        },
        create: {
          rutApoderado: ap.rut,
          nombreApoderado: ap.nombre,
          telefono: ap.telefono,
          emailApoderado: ap.email
        }
      });
    };

    // 2. Procesamos ambos apoderados
    const titularDb = await UpsertApoderado(datos.apoderadoTitular);
    const suplenteDb = await UpsertApoderado(datos.apoderadoSuplente);

    if (!titularDb) {
      throw new Error("El apoderado titular es obligatorio.");
    }

    // 3. Crear el Estudiante y sus relaciones intermedias
    const nuevoEstudiante = await tx.estudiante.create({
      data: {
        rut: datos.rut,
        nombre: datos.nombre,
        apellido: datos.apellido,
        fechaNacimiento: new Date(datos.fechaNacimiento),
        direccion: datos.direccion,
        prevision: datos.prevision,
        restriccionesAlimentarias: datos.restriccionesAlimentarias,
        alergias: datos.alergias, // Asegúrate que ya hiciste el migrate de este campo
        vacunasAlDia: Boolean(datos.vacunasAlDia),
        fechaIngreso: new Date(datos.fechaIngreso),
        estado: Boolean(datos.estado),

        // IDs Relacionales
        sexoId: datos.sexoId,
        comunaId: datos.comunaId,
        nivelId: datos.nivelId,
        tipoSangreId: datos.tipoSangreId,
        nacionalidadId: datos.nacionalidadId,

        // 4. Crear relaciones en EstudianteApoderado
        apoderados: {
          create: [
            {
              apoderadoId: titularDb.id,
              tipoApoderado: 'TITULAR',
              parentesco: datos.apoderadoTitular.parentesco,
              prioridad: 1
            },
            // Solo agrega el suplente si existe en la base de datos
            ...(suplenteDb ? [{
              apoderadoId: suplenteDb.id,
              tipoApoderado: 'SUPLENTE',
              parentesco: datos.apoderadoSuplente.parentesco,
              prioridad: 2
            }] : [])
          ]
        }
      },
      include: {
        apoderados: {
          include: { apoderado: true }
        }
      }
    });

    return nuevoEstudiante;
  });
};

export const listarEstudiantes = async () => {
  return await prisma.estudiante.findMany({
    orderBy: { nombre: 'asc' },
    include: {
      nivel: true,
      comuna: true,
      sexo: true,
      nacionalidad: true,
      apoderados:
      {
        include: {
          apoderado: true
        },
        where: { prioridad: 1 }
      }
    }
  });
};

export const obtenerPorId = async (id) => {
  return await prisma.estudiante.findUnique({
    where: { id },
    include: {
      sexo: true,
      comuna: true,
      nivel: true,
      tipoSangre: true,
      nacionalidad: true,
      apoderados:
      {
        include: {
          apoderado: true
        }
      }
    }
  });
};