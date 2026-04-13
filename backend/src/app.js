// import express from 'express';
// import cors from 'cors';
// import { checkHealth } from './controllers/testController.js';
// import { login } from './services/authService.js';

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // Ruta de prueba directa
// //app.get('/api/health', checkHealth);

// // Ruta de autenticación
// app.post('/api/auth/login', login);

// app.listen(PORT, () => {
//   console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as authController from './controllers/authController.js';
import * as estudianteController from './controllers/estudianteController.js';
import * as uploadController from './controllers/uploadController.js';
import { upload } from './config/multer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- RUTAS DE AUTENTICACIÓN ---
app.post('/api/auth/login', authController.login);

// --- RUTAS DE UPLOAD ---
app.post('/api/upload/profile', upload.single('photo'), uploadController.uploadProfilePhoto);
app.put('/api/upload/profile/:userId', uploadController.updateProfilePhoto);

// --- RUTAS DE ESTUDIANTES ---
// Delegamos la lógica al controlador
app.post('/api/estudiantes', estudianteController.createEstudiante);
app.get('/api/estudiantes', estudianteController.getAllEstudiantes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});