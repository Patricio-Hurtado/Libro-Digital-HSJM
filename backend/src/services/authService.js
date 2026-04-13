import prisma from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email, password) => {
  // 1. Buscar usuario
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  // 2. Verificar contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  // 3. Generar Token (Validez de 8 horas para la jornada laboral)
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'secret_melipilla_2026',
    { expiresIn: '8h' }
  );

  return {
    token,
    user: { 
      id: user.id,
      nombre: user.nombre, 
      role: user.role, 
      email: user.email,
      fotoUrl: user.fotoUrl || null
    }
  };
};