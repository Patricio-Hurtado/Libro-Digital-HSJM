import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadProfilePhoto, updateProfilePhoto } from '../services/uploadService';

const PhotoUploadModal = ({ isOpen, onClose, userId, onPhotoUpdated }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validar tipo de archivo
      if (!selectedFile.type.startsWith('image/')) {
        setError('Por favor selecciona una imagen válida');
        return;
      }
      
      // Validar tamaño (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Mostrar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor selecciona una imagen');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Subir archivo
      const fotoURL = await uploadProfilePhoto(file);
      
      // Actualizar URL en base de datos
      await updateProfilePhoto(userId, fotoURL);
      
      // Guardar en localStorage
      localStorage.setItem('userFoto', fotoURL);
      
      // Notificar al componente padre
      if (onPhotoUpdated) {
        onPhotoUpdated(fotoURL);
      }

      // Limpiar y cerrar
      setFile(null);
      setPreview(null);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Cambiar foto de perfil</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
            />
          </div>
        )}

        {/* Input de archivo */}
        <label htmlFor="photo-input" className="block mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
            id="photo-input"
          />
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition">
            <Upload size={24} className="mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-700">
              {file ? file.name : 'Selecciona una imagen'}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (máx. 5MB)</p>
          </div>
        </label>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Subiendo...
              </>
            ) : (
              'Guardar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal;
