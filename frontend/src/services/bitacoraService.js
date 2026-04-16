import api from '../api/axios';

export const saveBitacora = async (bitacoraData) => {
  try {
    // Enviamos el paquete completo (clase + evaluaciones de los niños)
    const response = await api.post('/bitacoras', bitacoraData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBitacoras = async () => {
  try {
    const response = await api.get('/bitacoras');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};