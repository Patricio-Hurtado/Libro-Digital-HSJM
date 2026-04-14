import express from 'express';
import * as estudianteController from '../controllers/estudianteController.js';

const router = express.Router();
// Definición de rutas
router.post('/', estudianteController.createEstudiante);     // Crear
router.get('/', estudianteController.getAllEstudiantes);        // Listar todos
// Ruta para obtener un estudiante específico por ID
router.get('/:id', estudianteController.getEstudianteById);  // Ver detalle

export default router;