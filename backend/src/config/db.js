import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

// 1. Forzamos la carga de variables de entorno aquí mismo
dotenv.config();

// 2. Extraemos la URL y verificamos que exista
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ ERROR: DATABASE_URL no está definida en el archivo .env");
}

// 3. Configuramos el pool con la URL explícita
const pool = new pg.Pool({ 
  connectionString: connectionString 
});

const adapter = new PrismaPg(pool);

// 4. Instanciamos el cliente con el adaptador
const prisma = new PrismaClient({ adapter });

export default prisma;