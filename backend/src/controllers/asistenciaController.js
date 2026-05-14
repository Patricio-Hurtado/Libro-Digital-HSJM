export const registrarAsistencia = async (req, res) => {
  const { fecha, estudianteId, estado, jornada } = req.body;
  const user = req.user; // Obtenido del middleware de auth

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaRegistro = new Date(fecha);

  if (fechaRegistro < hoy && user.role !== 'ADMIN' && user.role !== 'DIRECTORA') {
    return res.status(403).json({ 
      error: "Jornada cerrada. No tiene permisos para modificar asistencia histórica." 
    });
  }

  try {
    const registro = await prisma.asistencia.upsert({
      where: {
        estudianteId_fecha_jornada: { estudianteId, fecha: fechaRegistro, jornada }
      },
      update: { estado, usuarioId: user.id },
      create: { estudianteId, fecha: fechaRegistro, jornada, estado, usuarioId: user.id }
    });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar asistencia" });
  }
};