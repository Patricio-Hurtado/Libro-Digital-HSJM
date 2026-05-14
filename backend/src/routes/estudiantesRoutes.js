import express from 'express';
import * as estudianteController from '../controllers/estudianteController.js';

const router = express.Router();
// Definición de rutas
router.post('/', estudianteController.createEstudiante);     
router.get('/', estudianteController.getAllEstudiantes);      
// Ruta para obtener un estudiante específico por ID
router.get('/:id', estudianteController.getEstudianteById);  

export default router;