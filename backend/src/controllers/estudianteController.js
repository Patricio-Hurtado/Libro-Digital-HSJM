import * as estudianteService from '../services/estudianteService.js';

export const createEstudiante = async (req, res) => {
  try {
    console.log("📥 [CONTROLLER] Datos recibidos:", req.body);
    
    const nuevo = await estudianteService.registrarEstudiante(req.body);
    
    res.status(201).json({
      message: "Estudiante y Apoderado registrados con éxito",
      data: nuevo
    });
  } catch (error) {
    console.error("❌ [CONTROLLER ERROR]:", error);

    // 1. Error de RUT Duplicado (P2002)
    if (error.code === 'P2002') {
      const campo = (error.meta && error.meta.target) ? error.meta.target : 'dato';
      
      return res.status(400).json({ 
        error: `El registro falló porque el ${campo} ya existe en el sistema.` 
      });
    }

    // 2. Error de Llave Foránea (P2003) - Muy común en el modelo relacional
    if (error.code === 'P2003' || error.message?.includes('Foreign key constraint')) {
      return res.status(400).json({ 
        error: "Error de relación: Uno de los IDs (Comuna, Nivel, Sexo o Sangre) es inválido o no existe." 
      });
    }

    res.status(400).json({ 
      error: "No se pudo crear el registro", 
      details: error.message 
    });
  }
};

export const getAllEstudiantes = async (req, res) => {
  try {
    const lista = await estudianteService.listarEstudiantes();
    console.log(`✅ [CONTROLLER] Se enviaron ${lista.length} estudiantes al frontend.`);
    res.json(lista);
  } catch (error) {
    console.error("❌ [CONTROLLER ERROR]:", error);
    res.status(500).json({ error: "Error al obtener la lista de párvulos" });
  }
};

export const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  console.log("📥 [CONTROLLER] Buscando detalle para ID:", id);

  try {
    const estudiante = await estudianteService.obtenerPorId(id);
    
    if (!estudiante) {
      console.log("⚠️ [CONTROLLER] Ficha no encontrada para ID:", id);
      return res.status(404).json({ error: "El registro del párvulo no existe." });
    }

    res.json(estudiante);
  } catch (error) {
    console.error("🔥 [CONTROLLER CRASH]:", error);
    res.status(500).json({ 
      error: "Error interno en el servidor",
      details: error.message 
    });
  }
};
