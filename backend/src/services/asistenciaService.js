export const getResumenNivel = async (req, res) => {
  const { mes, anio } = req.query;

  const totalAsistencias = await prisma.asistencia.findMany({
    where: {
      fecha: {
        gte: new Date(anio, mes - 1, 1),
        lte: new Date(anio, mes, 0)
      }
    }
  });

  const presentes = totalAsistencias.filter(a => a.estado === 'P').length;
  const justificados = totalAsistencias.filter(a => a.estado === 'J').length;
  const total = totalAsistencias.length;

  const promedioNivel = total > 0 ? ((presentes + justificados) / total) * 100 : 0;

  res.json({
    promedioGeneral: promedioNivel.toFixed(1),
    totalRegistros: total,
    alertaBaja: promedioNivel < 80 // Para que el sistema avise si hay poca asistencia
  });
};