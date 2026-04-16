// backend/prisma/seed.js
import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcrypt';

// 1. Configuración de conexión (Igual que en db.js)
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando poblamiento masivo de EduBook...');

  // 1. LIMPIEZA TOTAL (En orden de dependencia)
  await prisma.estudianteApoderado.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.observation.deleteMany();
  await prisma.evaluacion.deleteMany();
  await prisma.asistencia.deleteMany();
  await prisma.planificacion.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.apoderado.deleteMany();
  await prisma.user.deleteMany();
  await prisma.comuna.deleteMany();
  await prisma.nivel.deleteMany();
  await prisma.sexo.deleteMany();
  await prisma.grupoSanguineo.deleteMany();
  await prisma.nacionalidad.deleteMany();

  // 2. CREAR TABLAS MAESTRAS (Necesarias para los IDs)
  console.log('🏗️ Creando tablas maestras...');
  
  const comunas = {
    'Melipilla': await prisma.comuna.create({ data: { comuna: 'Melipilla' } }),
    'Pomaire': await prisma.comuna.create({ data: { comuna: 'Pomaire' } }),
    'Curacaví': await prisma.comuna.create({ data: { comuna: 'Curacaví' } }),
    'Alhué': await prisma.comuna.create({ data: { comuna: 'Alhué' } }),
    'San Pedro': await prisma.comuna.create({ data: { comuna: 'San Pedro' } })
  };

  const niveles = {
    'SCM': await prisma.nivel.create({ data: { nivel: 'Sala Cuna Menor' } }),
    'SCMY': await prisma.nivel.create({ data: { nivel: 'Sala Cuna Mayor' } }),
    'NMM': await prisma.nivel.create({ data: { nivel: 'Nivel Medio Menor' } }),
    'NMY': await prisma.nivel.create({ data: { nivel: 'Nivel Medio Mayor' } }),
  };

  const sexos = {
    'Masculino': await prisma.sexo.create({ data: { genero: 'Masculino' } }),
    'Femenino': await prisma.sexo.create({ data: { genero: 'Femenino' } })
  };

  const gruposSangre = {
    'O RhD+': await prisma.grupoSanguineo.create({ data: { grupo: 'O RhD+' } }),
    'A RhD+': await prisma.grupoSanguineo.create({ data: { grupo: 'A RhD+' } }),
    'B RhD+': await prisma.grupoSanguineo.create({ data: { grupo: 'B RhD+' } }),
    'AB RhD+': await prisma.grupoSanguineo.create({ data: { grupo: 'AB RHD+' } }),
    'O RhD-': await prisma.grupoSanguineo.create({ data: { grupo: 'O RhD-' } }),
    'A RhD-': await prisma.grupoSanguineo.create({ data: { grupo: 'A RhD-' } }),
    'B RhD-': await prisma.grupoSanguineo.create({ data: { grupo: 'B RhD-' } }),
    'AB RhD-': await prisma.grupoSanguineo.create({ data: { grupo: 'AB RhD-' } }),
  };

  const nacionalidades = {
    'Chilena': await prisma.nacionalidad.create({ data: { nacionalidad: 'Chilena' } }),
    'Argentina': await prisma.nacionalidad.create({ data: { nacionalidad: 'Argentina' } }),
    'Peruana': await prisma.nacionalidad.create({ data: { nacionalidad: 'Peruana' } }),
    'Boliviana': await prisma.nacionalidad.create({ data: { nacionalidad: 'Boliviana' } }),
    'Colombiana': await prisma.nacionalidad.create({ data: { nacionalidad: 'Colombiana' } }),
    'Venezolana': await prisma.nacionalidad.create({ data: { nacionalidad: 'Venezolana' } }),
    'Haitiana': await prisma.nacionalidad.create({ data: { nacionalidad: 'Haitiana' } }),
    'Otra': await prisma.nacionalidad.create({ data: { nacionalidad: 'Otra' } }),
  };


  // 3. CREAR USUARIOS Generamos el hash una sola vez para usarlo en todos los usuarios de prueba
  const saltRounds = 10;
  const hashedDefaultPassword = await bcrypt.hash('password123', saltRounds);

  const usuariosData = [
    { nombre: 'Ana María Rojas', email: 'direccion@hospital.cl', rut: '9.876.543-2', role: 'DIRECTORA' },
    { nombre: 'Marta Valenzuela', email: 'marta.v@hospital.cl', rut: '12.345.678-9', role: 'EDUCADORA' },
    { nombre: 'Juan Pablo Soto', email: 'tecnico@hospital.cl', rut: '15.666.777-8', role: 'TECNICO' },
    { nombre: 'Cristian Admin', email: 'admin@hospital.cl', rut: '18.869.522-1', role: 'ADMIN' },
  ];

  for (const u of usuariosData) {
    await prisma.user.create({
      data: { 
        ...u, 
        password: hashedDefaultPassword // ✅ Guardamos la versión segura
      }
    });
  }
  
  console.log('✅ 4 Usuarios creados con contraseñas hasheadas correctamente.');

  // 4. DATA DE ESTUDIANTES (Mapeada a la nueva estructura)
  const estudiantesRaw = [
    {
      rut: '25.001.001-1', nombre: 'Sofía Valentina', apellido: 'Flores Pérez', sexo: 'Femenino', nacionalidad: 'Chilena',
      fechaNacimiento: new Date('2021-05-15'), direccion: 'Av. Las Torres 123', comuna: 'Melipilla',
      tipoSangre: 'A RhD+', nivel: 'NMY', apoderado: {
        nombre: 'Loreto Pérez', rut: '15.999.888-7', parentesco: 'MADRE'
      }
    },
    {
      rut: '25.002.002-2', nombre: 'Tomás Andrés', apellido: 'Vargas Soto', sexo: 'Masculino', nacionalidad: 'Argentina',
      fechaNacimiento: new Date('2021-02-20'), direccion: 'Calle Pomaire 45', comuna: 'Melipilla',
      tipoSangre: 'O RhD+', nivel: 'NMM', apoderado: {
        nombre: 'Andrés Vargas', rut: '14.777.666-5', parentesco: 'PADRE'
      }
    },
    {
      rut: '25.003.003-3', nombre: 'Isabella Camila', apellido: 'González Rojas', sexo: 'Femenino',  nacionalidad: 'Peruana',
      fechaNacimiento: new Date('2020-11-10'), direccion: 'Pasaje Los Pinos 789', comuna: 'Pomaire',
      tipoSangre: 'B RhD-', nivel: 'NMY', apoderado: {
        nombre: 'María Rojas', rut: '13.555.444-3', parentesco: 'ABUELA_O'
      }
    },
    {
      rut: '25.004.004-4', nombre: 'Matías Sebastián', apellido: 'López Díaz', sexo: 'Masculino', nacionalidad: 'Boliviana',
      fechaNacimiento: new Date('2021-08-05'), direccion: 'Avenida Central 456', comuna: 'Melipilla',
      tipoSangre: 'AB RhD+', nivel: 'NMM', apoderado: {
        nombre: 'Carlos Díaz', rut: '12.444.333-2', parentesco: 'TIA_O'
      }
    },
    {
      rut: '25.005.005-5', nombre: 'Valentina Sofía', apellido: 'Martínez Gómez', sexo: 'Femenino', nacionalidad: 'Colombiana',
      fechaNacimiento: new Date('2021-01-25'), direccion: 'Calle Principal 789', comuna: 'Melipilla',
      tipoSangre: 'O RhD-', nivel: 'NMY', apoderado: {
        nombre: 'Luis Gómez', rut: '11.333.222-1', parentesco: 'HERMANA_O'
      }
      },
    {
      rut: '25.006.006-6', nombre: 'Agustina María', apellido: 'Fernández Ruiz', sexo: 'Femenino', nacionalidad: 'Venezolana',
      fechaNacimiento: new Date('2020-12-30'), direccion: 'Pasaje Los Álamos 321', comuna: 'Pomaire',
      tipoSangre: 'A RhD-', nivel: 'NMM', apoderado: {
        nombre: 'Ana Ruiz', rut: '10.222.111-0', parentesco: 'OTRO'
      }
    },
    {
      rut: '25.007.007-7', nombre: 'Benjamín Alejandro', apellido: 'Sánchez Torres', sexo: 'Masculino', nacionalidad: 'Haitiana',
      fechaNacimiento: new Date('2021-03-15'), direccion: 'Av. Libertador 456', comuna: 'Melipilla',
      tipoSangre: 'B RhD-', nivel: 'NMY', apoderado: {
        nombre: 'Roberto Torres', rut: '9.111.000-9', parentesco: 'MADRE'
      }
    },
    {
      rut: '25.008.008-8', nombre: 'Camila Fernanda', apellido: 'Gómez Herrera', sexo: 'Femenino', nacionalidad: 'Otra',
      fechaNacimiento: new Date('2021-06-20'), direccion: 'Calle Principal 101', comuna: 'Melipilla',
      tipoSangre: 'O RhD+', nivel: 'NMM', apoderado: {
        nombre: 'Elena Herrera', rut: '8.000.999-8', parentesco: 'PADRE'
      }
    },
    {
      rut: '25.009.009-9', nombre: 'Diego Nicolás', apellido: 'Ramírez Castillo', sexo: 'Masculino', nacionalidad: 'Chilena',
      fechaNacimiento: new Date('2020-10-05'), direccion: 'Pasaje Los Robles 654', comuna: 'Pomaire',
      tipoSangre: 'AB RhD-', nivel: 'NMY', apoderado: {
        nombre: 'Sofía Castillo', rut: '7.999.888-7', parentesco: 'ABUELA_O'   
      }
    },
    {
      rut: '25.010.010-0', nombre: 'Lucía Andrea', apellido: 'Morales Vega', sexo: 'Femenino', nacionalidad: 'Chilena',
      fechaNacimiento: new Date('2021-04-12'), direccion: 'Avenida Principal 789', comuna: 'Melipilla',
      tipoSangre: 'B RhD-', nivel: 'NMY', apoderado: {
        nombre: 'Carlos Vega', rut: '6.888.777-6', parentesco: 'TIA_O'
      }
    }
  ];

  console.log('👶 Creando Estudiantes, Apoderados y Relaciones...');

  for (const e of estudiantesRaw) {
  const apoderado = await prisma.apoderado.upsert({
    where: { rutApoderado: e.apoderado.rut },
    update: {},
    create: {
      nombreApoderado: e.apoderado.nombre,
      rutApoderado: e.apoderado.rut,
      telefono: '+56900000000',
      emailApoderado: 'contacto@mail.com'
    }
  });

  const estudiante = await prisma.estudiante.create({
    data: {
      rut: e.rut,
      nombre: e.nombre,
      apellido: e.apellido,
      fechaNacimiento: e.fechaNacimiento,
      direccion: e.direccion,
      vacunasAlDia: true,
      // Agregamos estos para evitar errores de campos vacíos
      prevision: 'Fonasa', 
      fechaIngreso: new Date(), 
      
      // Conexiones por ID
      sexoId: sexos[e.sexo].id,
      comunaId: comunas[e.comuna].id,
      nivelId: niveles[e.nivel].id,
      tipoSangreId: gruposSangre[e.tipoSangre].id,  
      nacionalidadId: nacionalidades[e.nacionalidad].id
    }
  });

  await prisma.estudianteApoderado.create({
    data: {
      estudianteId: estudiante.id,
      apoderadoId: apoderado.id,
      tipoApoderado: 'TITULAR',
      parentesco: e.apoderado.parentesco, // Asegúrate que sea MADRE, PADRE, TUTOR, ABUELO u OTRO
      prioridad: 1
    }
  });
}

  console.log('✅ Estudiantes y Apoderados vinculados correctamente.');
  console.log('🚀 Sembrado relacional finalizado.');
}

main()
  .catch((e) => { console.error("❌ Error en el Seed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });