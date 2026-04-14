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

export const getEstudianteById = async (id) => {
  // LOG 1: Entramos a la función del servicio
  console.log("🔍 [SERVICIO] Entrando a getEstudianteById con ID:", id);
  
  try {
    // LOG 2: Antes de disparar la bala (Axios)
    console.log(`🌐 [SERVICIO] Enviando petición al túnel: /estudiantes/${id}`);
    
    const response = await api.get(`/estudiantes/${id}`);
    
    // LOG 3: El servidor respondió
    console.log("✅ [SERVICIO] Servidor respondió con éxito:", response.data);
    return response.data;
    
  } catch (error) {
    // LOG 4: Algo salió mal en el camino
    console.error("❌ [SERVICIO] Error capturado en el catch:", error.message);
    throw error;
  }
};