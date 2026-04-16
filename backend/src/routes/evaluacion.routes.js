import { Router } from 'express';
import { createEvaluacion, getEvaluacionesByEstudiante } from '../controllers/evaluacionController.js';

const router = Router();

// Guardar una nueva evaluación
router.post('/', createEvaluacion);

// Obtener todas las evaluaciones de un niño específico (usando su ID)
router.get('/estudiante/:id', getEvaluacionesByEstudiante);

export default router;