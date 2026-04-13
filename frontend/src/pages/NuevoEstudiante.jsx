import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, User, HeartPulse, Home, Users } from 'lucide-react';
import { saveEstudiante } from '../services/estudianteService';

const NuevoEstudiante = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Identificación
    rut: '', nombre: '', apellido: '', sexo: '', fechaNacimiento: '', nacionalidad: 'Chilena',
    // Domicilio
    direccion: '', comuna: 'Melipilla',
    // Salud
    prevision: '', tipoSangre: '', alergias: '', restriccionesAlimentarias: '', vacunasAldía: 'Sí',
    // Apoderado
    nombreApoderado: '', rutApoderado: '', parentesco: '', telefono: '', emailApoderado: '',
    // Matrícula
    fechaIngreso: new Date().toISOString().split('T'), nivel: '', estado: 'Vigente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveEstudiante(formData);
      alert('¡Ficha de identificación creada con éxito!');
      navigate('/identificacion');
    } catch (error) {
      alert('Error al guardar: ' + (error.error || 'Problema de conexión'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 transition-colors">
        <ArrowLeft size={18} /> Volver al listado
      </button>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* SECCIÓN: IDENTIFICACIÓN */}
          <div className="main-card-container border-t-4 border-blue-500">
            <div className="flex items-center gap-2 mb-4 text-blue-700">
              <User size={20} />
              <h2 className="font-bold">Identificación del Párvulo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="rut" placeholder="RUN (ej: 25.123.456-7)" className="form-input pl-4" required onChange={handleChange} />
              <select name="sexo" className="form-input pl-4!" required onChange={handleChange}>
                <option value="">Seleccione Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <input name="nombre" placeholder="Nombres" className="form-input pl-4" required onChange={handleChange} />
              <input name="apellido" placeholder="Apellidos" className="form-input pl-4" required onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1">FECHA NACIMIENTO</label>
                <input name="fechaNacimiento" type="date" className="form-input pl-4" required onChange={handleChange} />
              </div>
              <input name="nacionalidad" placeholder="Nacionalidad" defaultValue="Chilena" className="form-input pl-4" onChange={handleChange} />
            </div>
          </div>

          {/* SECCIÓN: DOMICILIO Y MATRÍCULA */}
          <div className="main-card-container border-t-4 border-orange-500">
            <div className="flex items-center gap-2 mb-4 text-orange-700">
              <Home size={20} />
              <h2 className="font-bold">Domicilio y Situación de Matrícula</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input name="direccion" placeholder="Dirección completa" className="form-input pl-4" required onChange={handleChange} />
              <input name="comuna" placeholder="Comuna" defaultValue="Melipilla" className="form-input pl-4" onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <select name="nivel" className="form-input pl-4" required onChange={handleChange}>
                  <option value="">Seleccione Nivel</option>
                  <option value="Sala Cuna Menor">Sala Cuna Menor</option>
                  <option value="Sala Cuna Mayor">Sala Cuna Mayor</option>
                  <option value="Nivel Medio Menor">Nivel Medio Menor</option>
                  <option value="Nivel Medio Mayor">Nivel Medio Mayor</option>
                </select>
                <input name="fechaIngreso" type="date" className="form-input pl-4" required onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* SECCIÓN: SALUD */}
          <div className="main-card-container border-t-4 border-red-500">
            <div className="flex items-center gap-2 mb-4 text-red-700">
              <HeartPulse size={20} />
              <h2 className="font-bold">Información de Salud</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="prevision" className="form-input pl-4" onChange={handleChange}>
                <option value="">Previsión</option>
                <option value="Fonasa">Fonasa</option>
                <option value="Isapre">Isapre</option>
              </select>
              <input name="tipoSangre" placeholder="Grupo Sanguíneo" className="form-input pl-4" onChange={handleChange} />
              <input name="alergias" placeholder="Alergias" className="form-input pl-4" onChange={handleChange} />
              <input name="restriccionesAlimentarias" placeholder="Restricciones Alimentarias" className="form-input pl-4" onChange={handleChange} />
              <select name="vacunasAlDía" className="form-input pl-4" onChange={handleChange}>
                <option value="Sí">Vacunas al día: Sí</option>
                <option value="No">Vacunas al día: No</option>
              </select>
            </div>
          </div>

          {/* SECCIÓN: APODERADO */}
          <div className="main-card-container border-t-4 border-green-500">
            <div className="flex items-center gap-2 mb-4 text-green-700">
              <Users size={20} />
              <h2 className="font-bold">Datos del Apoderado</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nombreApoderado" placeholder="Nombre completo" className="form-input pl-4" required onChange={handleChange} />
              <input name="rutApoderado" placeholder="RUN Apoderado" className="form-input pl-4" required onChange={handleChange} />
              <input name="parentesco" placeholder="Parentesco (ej: Madre)" className="form-input pl-4" required onChange={handleChange} />
              <input name="telefono" type="tel" placeholder="Teléfono" className="form-input pl-4" required onChange={handleChange} />
              <input name="emailApoderado" type="email" placeholder="Correo electrónico" className="form-input pl-4 md:col-span-2" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button type="submit" disabled={loading} className={`btn-primary px-10 py-4 shadow-xl shadow-blue-200 ${loading ? 'opacity-50' : ''}`}>
            <Save size={22} />
            {loading ? 'Procesando...' : 'Finalizar Registro de Matrícula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoEstudiante;