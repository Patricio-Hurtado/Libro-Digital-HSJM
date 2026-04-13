import axios from '../api/axios';

const API = 'http://localhost:3000/api';

export const uploadProfilePhoto = async (file) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await axios.post(`${API}/upload/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data.fotoURL;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al subir la foto');
  }
};

export const updateProfilePhoto = async (userId, fotoURL) => {
  try {
    const response = await axios.put(`${API}/upload/profile/${userId}`, {
      fotoURL
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al actualizar la foto');
  }
};
