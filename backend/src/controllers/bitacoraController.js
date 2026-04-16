import * as bitacoraService from '../services/bitacoraService.js';

export const createBitacora = async (req, res) => {
  try {
    const nuevaBitacora = await bitacoraService.registrarBitacora(req.body);
    res.status(201).json({ message: "Bitácora guardada con éxito", data: nuevaBitacora });
  } catch (error) {
    console.error("❌ Error al guardar bitácora:", error);
    res.status(400).json({ error: "No se pudo guardar la bitácora", details: error.message });
  }
};

export const getBitacoras = async (req, res) => {
  try {
    const lista = await bitacoraService.listarBitacoras();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener bitácoras" });
  }
};