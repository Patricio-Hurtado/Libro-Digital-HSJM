import api from '../api/axios';

export const saveEstudiante = async (estudianteData) => {
  try {
    const response = await api.post('/estudiantes', estudianteData);
    return response.data;
  } catch (error) {
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

export const getEstudianteById = async (id) => {
  try {
    const response = await api.get(`/estudiantes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComunas = async () => {
    const response = await api.get('/comunas');
    return response.data;
};

export const getNiveles = async () => {
    const response = await api.get('/niveles');
    return response.data;
};

export const getSexos = async () => {
    const response = await api.get('/sexos');
    return response.data;
};

export const getGruposSanguineos = async () => {
    const response = await api.get('/tipos-sangre');
    return response.data;
};