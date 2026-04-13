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
    { rut: '25.001.001-1', nombre: 'Sofía Valentina', apellido: 'Flores Pérez', fechaNacimiento: new Date('2021-01-10'), direccion: 'Melipilla Centro 123', tipoSangre: 'A+', alergias: 'Polen', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Loreto Pérez', rutApoderado: '15.111.111-1', telefono: '911111111', emailApoderado: 'loreto@mail.com' },
    { rut: '25.002.002-2', nombre: 'Tomás Andrés', apellido: 'Vargas Soto', fechaNacimiento: new Date('2021-02-15'), direccion: 'Pomaire Sur 45', tipoSangre: 'O+', alergias: 'Nueces', enfermedades: 'Asma', medicamentos: 'Inhalador', nombreApoderado: 'Andrés Vargas', rutApoderado: '14.222.222-2', telefono: '922222222', emailApoderado: 'andres@mail.com' },
    { rut: '25.003.003-3', nombre: 'Martina Ignacia', apellido: 'Galdames Cid', fechaNacimiento: new Date('2021-03-20'), direccion: 'Vicicuña Mackenna 78', tipoSangre: 'B-', alergias: 'Lactosa', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Carla Cid', rutApoderado: '16.333.333-3', telefono: '933333333', emailApoderado: 'carla@mail.com' },
    { rut: '25.004.004-4', nombre: 'Mateo Javier', apellido: 'Zúñiga Muñoz', fechaNacimiento: new Date('2021-04-25'), direccion: 'Los Jazmines 90', tipoSangre: 'A-', alergias: 'Ninguna', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Javier Zúñiga', rutApoderado: '12.444.444-4', telefono: '944444444', emailApoderado: 'javier@mail.com' },
    { rut: '25.005.005-5', nombre: 'Lucía Paz', apellido: 'Contreras Rivas', fechaNacimiento: new Date('2021-05-30'), direccion: 'Serrano 500', tipoSangre: 'O+', alergias: 'Penicilina', enfermedades: 'Rinitis', medicamentos: 'Antihistamínico', nombreApoderado: 'Patricia Rivas', rutApoderado: '18.555.555-5', telefono: '955555555', emailApoderado: 'paty@mail.com' },
    { rut: '25.006.006-6', nombre: 'Benjamín Alexis', apellido: 'Hurtado Cerda', fechaNacimiento: new Date('2021-06-05'), direccion: 'Huerto Melipilla 12', tipoSangre: 'AB+', alergias: 'Ninguna', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Juan Hurtado', rutApoderado: '17.666.666-6', telefono: '966666666', emailApoderado: 'juan@mail.com' },
    { rut: '25.007.007-7', nombre: 'Agustín Ignacio', apellido: 'Palma Vera', fechaNacimiento: new Date('2021-07-10'), direccion: 'Ortúzar 800', tipoSangre: 'A+', alergias: 'Polvo', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'María Vera', rutApoderado: '13.777.777-7', telefono: '977777777', emailApoderado: 'maria@mail.com' },
    { rut: '25.008.008-8', nombre: 'Emilia Ignacia', apellido: 'Rojas Toro', fechaNacimiento: new Date('2021-08-15'), direccion: 'Libertad 33', tipoSangre: 'O-', alergias: 'Ninguna', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Hugo Rojas', rutApoderado: '11.888.888-8', telefono: '988888888', emailApoderado: 'hugo@mail.com' },
    { rut: '25.009.009-9', nombre: 'Facundo Leonel', apellido: 'Silva Castro', fechaNacimiento: new Date('2021-09-20'), direccion: 'Las Torres 44', tipoSangre: 'B+', alergias: 'Ninguna', enfermedades: 'Ninguna', medicamentos: 'Ninguno', nombreApoderado: 'Leonel Silva', rutApoderado: '19.999.999-9', telefono: '999999999', emailApoderado: 'leo@mail.com' },
    { rut: '25.010.010-0', nombre: 'Isabella Monserrat', apellido: 'Pinto Soto', fechaNacimiento: new Date('2021-10-25'), direccion: 'San Bernardo 10', tipoSangre: 'A+', alergias: 'Ninguna', enfermedades: 'Dermatitis', medicamentos: 'Crema base', nombreApoderado: 'Rosa Soto', rutApoderado: '20.000.000-0', telefono: '900000000', emailApoderado: 'rosa@mail.com' },
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