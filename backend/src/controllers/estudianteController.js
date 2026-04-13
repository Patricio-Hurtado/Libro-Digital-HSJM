// backend/src/controllers/estudianteController.js
import * as estudianteService from '../services/estudianteService.js';

export const createEstudiante = async (req, res) => {
  try {
    console.log("Datos recibidos en el server:", req.body); // Esto te mostrará en la terminal qué está llegando
    const nuevo = await estudianteService.registrarEstudiante(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("❌ Error en Controller:", error);
    res.status(400).json({ error: "No se pudo crear el estudiante", details: error.message });
  }
};

export const getAllEstudiantes = async (req, res) => {
  try {
    const lista = await estudianteService.listarEstudiantes();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista" });
  }
};