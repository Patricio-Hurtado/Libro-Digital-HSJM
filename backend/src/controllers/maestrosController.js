import * as maestrosService from '../services/maestrosService.js';

export const getOpcionesFormulario = async (req, res) => {
  try {
    const opciones = await maestrosService.obtenerOpcionesFormulario();
    res.json(opciones);
  } catch (error) {
    console.error("❌ [MAESTROS CONTROLLER ERROR]:", error);
    res.status(500).json({ 
      error: "Error al cargar las tablas maestras para el formulario" 
    });
  }
};