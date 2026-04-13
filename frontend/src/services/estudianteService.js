// frontend/src/services/estudianteService.js
import api from '../api/axios';

export const saveEstudiante = async (estudianteData) => {
  try {
    // Aquí recibimos el objeto del formulario y lo lanzamos al túnel
    const response = await api.post('/estudiantes', estudianteData);
    return response.data;
  } catch (error) {
    // Si el backend responde con error, lo lanzamos para que el componente lo atrape
    throw error.response?.data || error.message;
  }
};

export const getEstudiantes = async () => {
  try {
    const response = await api.get('/estudiantes');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};