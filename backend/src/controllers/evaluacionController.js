import * as evaluacionService from '../services/evaluacionService.js';

export const createEvaluacion = async (req, res) => {
  try {
    const nuevaEvaluacion = await evaluacionService.guardarEvaluacion(req.body);
    res.status(201).json({ message: "Evaluación pedagógica guardada", data: nuevaEvaluacion });
  } catch (error) {
    console.error("❌ Error al guardar evaluación:", error);
    res.status(400).json({ error: "No se pudo guardar la evaluación", details: error.message });
  }
};

export const getEvaluacionesByEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const lista = await evaluacionService.obtenerEvaluacionesEstudiante(id);
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial del estudiante" });
  }
};