import express from 'express';
import * as maestrosController from '../controllers/maestrosController.js';

const router = express.Router();

// Esta ruta entregará todo lo necesario para los formularios de una sola vez
router.get('/opciones-formulario', maestrosController.getOpcionesFormulario);

export default router;