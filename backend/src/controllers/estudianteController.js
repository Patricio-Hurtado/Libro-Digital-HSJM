// backend/src/controllers/estudianteController.js
import * as estudianteService from '../services/estudianteService.js';

export const createEstudiante = async (req, res) => {
  try {
    console.log("Datos recibidos en el server:", req.body); // Esto te mostrará en la terminal qué está llegando
    const nuevo = await estudianteService.registrarEstudiante(req.body);
    res.status(201).json({
      message: "Estudiante creado con éxito",
      data: nuevo
    });
  } catch (error) {
    console.error("❌ Error en Controller:", error);
    // Manejo de error por RUT duplicado (Código P2002 de Prisma)
    if (error.message.includes('Unique constraint')) {
      return res.status(400).json({ error: "El RUT ya existe en el sistema." });
    }
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

export const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  console.log("📥 [BACKEND CONTROLLER] Petición recibida para ID:", id);

  try {
    // Verificamos si el ID tiene un formato válido (si usas UUID)
    console.log("🕵️ [BACKEND] Llamando al servicio para buscar en la BD...");
    const estudiante = await estudianteService.obtenerPorId(id);
    
    if (!estudiante) {
      console.log("⚠️ [BACKEND] No se encontró ningún párvulo con ese ID");
      return res.status(404).json({ error: "Párvulo no encontrado" });
    }

    console.log("✅ [BACKEND] Estudiante encontrado:", estudiante.nombre);
    res.json(estudiante);

  } catch (error) {
    // ESTE LOG ES EL MÁS IMPORTANTE
    console.error("🔥 [BACKEND CRASH] Error detallado:");
    console.error(error); 
    
    res.status(500).json({ 
      error: "Error interno en el servidor de Melipilla",
      details: error.message 
    });
  }
};
