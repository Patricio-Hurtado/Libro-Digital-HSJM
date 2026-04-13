// backend/prisma/seed.js
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

  // 1. LIMPIEZA TOTAL
  await prisma.auditLog.deleteMany();
  await prisma.observation.deleteMany();
  await prisma.evaluacion.deleteMany();
  await prisma.asistencia.deleteMany();
  await prisma.planificacion.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.user.deleteMany();

  // 1. Generamos el hash una sola vez para usarlo en todos los usuarios de prueba
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

  // 3. CREAR 10 ESTUDIANTES (Con las 10 columnas de datos)
  const dataEstudiantes = [
    {
      rut: '25.001.001-1',
      nombre: 'Sofía Valentina',
      apellido: 'Flores Pérez',
      sexo: 'Femenino',
      fechaNacimiento: new Date('2021-05-15'),
      nacionalidad: 'Chilena',
      direccion: 'Av. Las Torres 123',
      comuna: 'Melipilla',
      prevision: 'Fonasa',
      tipoSangre: 'A+',
      alergias: 'Polen',
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'Loreto Pérez',
      rutApoderado: '15.999.888-7',
      parentesco: 'Madre',
      telefono: '+56911112222',
      emailApoderado: 'loreto@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.002.002-2',
      nombre: 'Tomás Andrés',
      apellido: 'Vargas Soto',
      sexo: 'Masculino',
      fechaNacimiento: new Date('2021-02-20'),
      nacionalidad: 'Chilena',
      direccion: 'Calle Pomaire 45',
      comuna: 'Melipilla',
      prevision: 'Isapre',
      tipoSangre: 'O+',
      alergias: 'Nueces',
      restriccionesAliment: 'Sin sal',
      vacunasAlDia: true,
      nombreApoderado: 'Andrés Vargas',
      rutApoderado: '14.777.666-5',
      parentesco: 'Padre',
      telefono: '+56933334444',
      emailApoderado: 'andres@mail.com',
      nivel: 'NIVEL_MEDIO_MENOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.003.003-3',
      nombre: 'Valentina Sofía',
      apellido: 'Gómez Rojas',
      sexo: 'Femenino',
      fechaNacimiento: new Date('2021-08-10'),
      nacionalidad: 'Chilena',
      direccion: 'Calle Principal 789',
      comuna: 'Melipilla',
      prevision: 'Fonasa',
      tipoSangre: 'B-',
      alergias: 'Lactosa',
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'María Gómez',
      rutApoderado: '13.555.444-3',
      parentesco: 'Madre',
      telefono: '+56955556666',
      emailApoderado: 'maria@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.004.004-4',
      nombre: 'Matías Alejandro',
      apellido: 'López Fernández',
      sexo: 'Masculino',
      fechaNacimiento: new Date('2021-11-05'),
      nacionalidad: 'Chilena',
      direccion: 'Av. Los Pinos 321',
      comuna: 'Melipilla',
      prevision: 'Isapre',
      tipoSangre: 'AB+',
      alergias: 'Penicilina',
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'Carlos López',
      rutApoderado: '16.444.333-2',
      parentesco: 'Padre',
      telefono: '+56977778888',
      emailApoderado: 'carlos@mail.com',
      nivel: 'NIVEL_MEDIO_MENOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.005.005-5',
      nombre: 'Isidora Emilia',
      apellido: 'Martínez Díaz',
      sexo: 'Femenino',
      fechaNacimiento: new Date('2021-03-25'),
      nacionalidad: 'Chilena',
      direccion: 'Calle Principal 789',
      comuna: 'Melipilla',
      prevision: 'Fonasa',
      tipoSangre: 'A-',
      alergias: 'Huevos',
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'Ana Martínez',
      rutApoderado: '17.333.222-1',
      parentesco: 'Madre',
      telefono: '+56999990000',
      emailApoderado: 'ana@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.006.006-6',  
      nombre: 'Benjamín Nicolás',
      apellido: 'Rojas Silva',
      sexo: 'Masculino',
      fechaNacimiento: new Date('2021-07-30'),
      nacionalidad: 'Chilena',
      direccion: 'Av. Las Torres 123',
      comuna: 'Melipilla',
      prevision: 'Isapre',
      tipoSangre: 'O-',
      alergias: 'Gluten',
      restriccionesAliment: 'Sin azúcar',
      vacunasAlDia: true,
      nombreApoderado: 'Sofía Silva',
      rutApoderado: '18.222.111-0',
      parentesco: 'Madre',
      telefono: '+56911112222',
      emailApoderado: 'sofia@mail.com',
      nivel: 'NIVEL_MEDIO_MENOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.007.007-7',
      nombre: 'Agustina María',
      apellido: 'Fernández Torres',
      sexo: 'Femenino',
      fechaNacimiento: new Date('2021-12-15'),
      nacionalidad: 'Chilena',
      direccion: 'Calle Pomaire 45',
      comuna: 'Melipilla',
      prevision: 'Fonasa',
      tipoSangre: 'B+',
      alergias: 'Mariscos',
      restriccionesAliment: 'Ninguna', 
      vacunasAlDia: true,
      nombreApoderado: 'Ricardo Fernández',
      rutApoderado: '19.111.000-9',
      parentesco: 'Padre',
      telefono: '+56933334444',
      emailApoderado: 'ricardo@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.008.008-8',
      nombre: 'Diego Sebastián',
      apellido: 'Gómez Rojas',
      sexo: 'Masculino',
      fechaNacimiento: new Date('2021-05-20'),
      nacionalidad: 'Chilena',
      direccion: 'Av. Los Pinos 321',
      comuna: 'Melipilla',
      prevision: 'Isapre',
      tipoSangre: 'AB-',
      alergias: 'Penicilina',
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'María Gómez',
      rutApoderado: '13.555.444-3',
      parentesco: 'Madre',
      telefono: '+56955556666',
      emailApoderado: 'maria@mail.com',
      nivel: 'NIVEL_MEDIO_MENOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.009.009-9',
      nombre: 'Camila Fernanda',
      apellido: 'López Martínez',
      sexo: 'Femenino',
      fechaNacimiento: new Date('2021-09-10'),  
      nacionalidad: 'Chilena',
      direccion: 'Calle Principal 789',
      comuna: 'Melipilla',
      prevision: 'Fonasa',
      tipoSangre: 'A+',
      alergias: 'Lactosa',  
      restriccionesAliment: 'Ninguna',
      vacunasAlDia: true,
      nombreApoderado: 'Carlos López',
      rutApoderado: '16.444.333-2',
      parentesco: 'Padre',
      telefono: '+56977778888',
      emailApoderado: 'carlos@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    },
    {
      rut: '25.010.010-0',
      nombre: 'Lucas Gabriel',
      apellido: 'Martínez Díaz',
      sexo: 'Masculino',
      fechaNacimiento: new Date('2021-04-25'),
      nacionalidad: 'Chilena',
      direccion: 'Av. Las Torres 123',
      comuna: 'Melipilla',
      prevision: 'Isapre',
      tipoSangre: 'O+',
      alergias: 'Gluten',
      restriccionesAliment: 'Sin azúcar',
      vacunasAlDia: true,
      nombreApoderado: 'Ana Martínez',
      rutApoderado: '17.333.222-1',
      parentesco: 'Madre',
      telefono: '+56999990000',
      emailApoderado: 'ana@mail.com',
      nivel: 'NIVEL_MEDIO_MAYOR',
      estado: 'VIGENTE'
    }
  ];

  for (const est of dataEstudiantes) {
    await prisma.estudiante.create({ data: est });
  }
  console.log('✅ 10 Estudiantes creados con su ficha técnica completa.');

  // 4. CREAR ASISTENCIAS INICIALES (Mañana)
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  for (const est of dataEstudiantes) {
    await prisma.asistencia.create({
      data: {
        fecha: hoy,
        jornada: 'MAÑANA',
        presente: true,
        estudiante: { connect: { rut: est.rut } },
        registradoPor: { connect: { rut: '12.345.678-9' } } // Marta
      }
    });
  }

  console.log('✅ Asistencia de la mañana registrada para los 10 niños.');
  console.log('🚀 Base de datos poblada al 100%.');
}

main()
  .catch((e) => {
    console.error("❌ Error en el Seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });