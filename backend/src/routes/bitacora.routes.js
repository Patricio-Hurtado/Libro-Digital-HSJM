import { Router } from 'express';
import { createBitacora, getBitacoras } from '../controllers/bitacoraController.js';

const router = Router();

router.post('/', createBitacora);
router.get('/', getBitacoras);

export default router;