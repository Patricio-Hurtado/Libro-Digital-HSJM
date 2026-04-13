import prisma from '../config/db.js';

export const uploadProfilePhoto = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    // Retornar la ruta del archivo
    const fotoURL = `/uploads/${req.file.filename}`;
    
    res.json({
      message: 'Foto subida exitosamente',
      fotoURL
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fotoURL } = req.body;

    if (!fotoURL) {
      return res.status(400).json({ error: 'URL de foto requerida' });
    }

    // Actualizar el usuario con la nueva foto
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { fotoUrl: fotoURL }
    });

    res.json({
      message: 'Foto de perfil actualizada',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

