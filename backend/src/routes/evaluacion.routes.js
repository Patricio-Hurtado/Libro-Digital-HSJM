import { Router } from 'express';
import { createEvaluacion, getEvaluacionesByEstudiante } from '../controllers/evaluacionController.js';

const router = Router();

router.post('/', createEvaluacion);
router.get('/estudiante/:id', getEvaluacionesByEstudiante);

export default router;