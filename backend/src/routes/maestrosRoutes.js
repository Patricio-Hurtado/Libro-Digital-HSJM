import express from 'express';
import * as maestrosController from '../controllers/maestrosController.js';

const router = express.Router();
// Definición de rutas
router.get('/opciones-formulario', maestrosController.getOpcionesFormulario);

export default router;