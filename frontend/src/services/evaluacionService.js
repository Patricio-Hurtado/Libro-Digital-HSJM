// frontend/src/services/evaluacionService.js
import api from '../api/axios';

export const saveEvaluacion = async (evaluacionData) => {
  try {
    const response = await api.post('/evaluaciones', evaluacionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};