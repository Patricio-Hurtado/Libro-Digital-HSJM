import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, User, HeartPulse, ShieldAlert } from 'lucide-react';
// 1. IMPORTAMOS EL SERVICIO
import { saveEstudiante } from '../services/estudianteService';

const NuevoEstudiante = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rut: '', nombre: '', apellido: '', fechaNacimiento: '',
    nombreApoderado: '', rutApoderado: '', telefono: ''
    // ... puedes añadir el resto de los campos del modelo aquí
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveEstudiante(formData);

      alert('¡Estudiante guardado exitosamente en Melipilla!');
      navigate('/identificacion');
    } catch (error) {
      alert('Error al guardar: ' + (error.error || 'Problema de conexión'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto ">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6">
        <ArrowLeft size={18} /> Volver
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="main-card-container border-l-4 border-red-500">
            <h2 className="font-bold mb-3">Ficha de Ingreso</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="RUT del Estudiante"
                className="form-input !pl-4"
                required
                onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
              />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombres"
                className="form-input !pl-4 w-1/2"
                required
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
              <input
                type="text"
                placeholder="Apellidos"
                className="form-input !pl-4 w-1/2"
                required
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              />
            </div>
            <input
              type="date"
              className="form-input !pl-4"
              required
              onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
            />
          </div>
        </div>

        {/* Datos Apoderado Simplificados para la prueba */}
        <div className="main-card-container border-l-4 border-green-500">
          <h3 className="font-bold mb-3">Datos del Apoderado</h3>
          <input
            type="text"
            placeholder="Nombre Apoderado"
            className="form-input !pl-4 mb-3"
            required
            onChange={(e) => setFormData({ ...formData, nombreApoderado: e.target.value })}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="RUT Apoderado"
              className="form-input !pl-4 w-1/2"
              required
              onChange={(e) => setFormData({ ...formData, rutApoderado: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="form-input !pl-4 w-1/2"
              required
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
        </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-auto mx-auto  ${loading ? 'opacity-50' : ''}`}
        >
          <Save size={20} />
          {loading ? 'Guardando...' : 'Confirmar Registro'}
        </button>
      </form>
    </div>
  );
};

export default NuevoEstudiante;