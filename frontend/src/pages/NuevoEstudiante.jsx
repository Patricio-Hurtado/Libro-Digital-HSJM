import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Save, ArrowLeft, User, HeartPulse, Home, Users, Loader2, Plus, Trash2
} from 'lucide-react';
import api from '../api/axios';

const NuevoEstudiante = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [showSuplente, setShowSuplente] = useState(false);

  const [options, setOptions] = useState({
    comunas: [], niveles: [], sexos: [], sangres: [], nacionalidades: []
  });

  const [formData, setFormData] = useState({
    rut: '', 
    nombre: '', 
    apellido: '', 
    fechaNacimiento: '',
    nacionalidadId: '', 
    direccion: '', 
    sexoId: '', 
    comunaId: '',
    nivelId: '', 
    tipoSangreId: '', 
    prevision: 'Fonasa', 
    alergias: '',
    restriccionesAlimentarias: '', 
    vacunasAlDia: true,
    fechaIngreso: new Date().toISOString().split('T'),
    estado: true,
    // Apoderados estructurados para el backend
    apoderadoTitular: {
      nombre: '', rut: '', parentesco: 'MADRE', telefono: '', email: ''
    },
    apoderadoSuplente: {
      nombre: '', rut: '', parentesco: 'OTRO', telefono: '', email: ''
    }
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await api.get('/maestros/opciones-formulario');
        setOptions(response.data);
      } catch (error) {
        console.error("Error al cargar opciones:", error);
      } finally {
        setInitLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejador específico para los objetos de apoderados
  const handleApoderadoChange = (e, tipo) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [tipo]: { ...prev[tipo], [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Si no se mostró el suplente, enviamos esos campos vacíos o nulos
      const dataToSend = { ...formData };
      if (!showSuplente) {
        dataToSend.apoderadoSuplente = null;
      }

      await api.post('/estudiantes', dataToSend);
      alert('¡Matrícula relacional creada con éxito!');
      navigate('/identificacion');
    } catch (error) {
      alert('Error al guardar: ' + (error.response?.data?.error || 'Error de servidor'));
    } finally {
      setLoading(false);
    }
  };

  if (initLoading) return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 italic">
      <Loader2 className="animate-spin mb-2" />
      Cargando configuración relacional...
    </div>
  );

  return (
    <div className="transition-opacity duration-500 opacity-100 ">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 transition-colors">
        <ArrowLeft size={18} /> Volver al listado
      </button>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* SECCIÓN: IDENTIFICACIÓN */}
          <div className="main-card-container border-t-4 border-blue-500 p-6">
            <div className="flex items-center gap-2 mb-4 text-blue-700">
              <User size={20} /> <h2 className="font-bold">Identificación del Párvulo</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="rut" placeholder="RUN Párvulo" className="form-input pl-4" required onChange={handleChange} />
              <select name="sexoId" className="form-input pl-4" required onChange={handleChange} value={formData.sexoId}>
                <option value="">Seleccione Sexo</option>
                {options.sexos.map(s => <option key={s.id} value={s.id}>{s.genero}</option>)}
              </select>
              <input name="nombre" placeholder="Nombres" className="form-input pl-4" required onChange={handleChange} />
              <input name="apellido" placeholder="Apellidos" className="form-input pl-4" required onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Fecha Nacimiento</label>
                <input name="fechaNacimiento" type="date" className="form-input pl-4" required onChange={handleChange} />
              </div>
              <select name="nacionalidadId" className="form-input pl-4" required onChange={handleChange} value={formData.nacionalidadId}>
                <option value="">Nacionalidad</option>
                {options.nacionalidades.map(n => <option key={n.id} value={n.id}>{n.nacionalidad}</option>)}
              </select>
            </div>
          </div>

          {/* SECCIÓN: DOMICILIO Y MATRÍCULA */}
          <div className="main-card-container border-t-4 border-orange-500 p-6">
            <div className="flex items-center gap-2 mb-4 text-orange-700">
              <Home size={20} /> <h2 className="font-bold">Domicilio y Matrícula</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input name="direccion" placeholder="Dirección completa" className="form-input pl-4" required onChange={handleChange} />
              <select name="comunaId" className="form-input pl-4" required onChange={handleChange} value={formData.comunaId}>
                <option value="">Seleccione Comuna</option>
                {options.comunas.map(c => <option key={c.id} value={c.id}>{c.comuna}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <select name="nivelId" className="form-input pl-4" required onChange={handleChange} value={formData.nivelId}>
                  <option value="">Seleccione Nivel</option>
                  {options.niveles.map(n => <option key={n.id} value={n.id}>{n.nivel}</option>)}
                </select>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Fecha Ingreso</label>
                  <input name="fechaIngreso" type="date" value={formData.fechaIngreso} className="form-input pl-4" required onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: SALUD */}
          <div className="main-card-container border-t-4 border-red-500 p-6">
            <div className="flex items-center gap-2 mb-4 text-red-700">
              <HeartPulse size={20} /> <h2 className="font-bold">Información de Salud</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="prevision" className="form-input pl-4" onChange={handleChange} value={formData.prevision}>
                <option value="Fonasa">Fonasa</option>
                <option value="Isapre">Isapre</option>
                <option value="Particular">Particular</option>
              </select>
              <select name="tipoSangreId" className="form-input pl-4" onChange={handleChange} value={formData.tipoSangreId}>
                <option value="">Grupo Sanguíneo</option>
                {options.sangres.map(g => <option key={g.id} value={g.id}>{g.grupo}</option>)}
              </select>
              <input name="alergias" placeholder="Alergias" className="form-input pl-4" onChange={handleChange} />
              <input name="restriccionesAlimentarias" placeholder="Restricciones Alimentarias" className="form-input pl-4" onChange={handleChange} />
              <select name="vacunasAlDia" className="form-input pl-4" onChange={(e) => setFormData(prev => ({ ...prev, vacunasAlDia: e.target.value === 'true' }))}>
                <option value="true">Vacunas al día: Sí</option>
                <option value="false">Vacunas al día: No</option>
              </select>
            </div>
          </div>

          {/* SECCIÓN: APODERADO TITULAR */}
          <div className="main-card-container border-t-4 border-green-500 p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-green-700">
                <Users size={20} /> <h2 className="font-bold">Apoderado Titular</h2>
              </div>
              {!showSuplente && (
                <button
                  type="button"
                  onClick={() => setShowSuplente(true)}
                  className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold flex items-center gap-1 hover:bg-green-200 transition-colors"
                >
                  <Plus size={12} /> AGREGAR SUPLENTE
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nombre" placeholder="Nombre completo" className="form-input pl-4" required onChange={(e) => handleApoderadoChange(e, 'apoderadoTitular')} />
              <input name="rut" placeholder="RUN Apoderado" className="form-input pl-4" required onChange={(e) => handleApoderadoChange(e, 'apoderadoTitular')} />
              <select 
                name="parentesco" 
                className="form-input pl-4" 
                required 
                onChange={(e) => handleApoderadoChange(e, 'apoderadoTitular')} 
                value={formData.apoderadoTitular.parentesco}
              >
                <option value="MADRE">Madre</option>
                <option value="PADRE">Padre</option>
                <option value="ABUELA_O">Abuelo/a</option>
                <option value="TIA_O">Tío/a</option>
                <option value="HERMANA_O">Hermano/a</option>
                <option value="OTRO">Otro</option>
              </select>
              <input name="telefono" type="tel" placeholder="Teléfono (+569...)" className="form-input pl-4" required onChange={(e) => handleApoderadoChange(e, 'apoderadoTitular')} />
              <input name="email" type="email" placeholder="Correo electrónico" className="form-input pl-4 md:col-span-2" onChange={(e) => handleApoderadoChange(e, 'apoderadoTitular')} />
            </div>
          </div>

          {/* SECCIÓN: APODERADO SUPLENTE (Condicional) */}
          {showSuplente && (
            <div className="main-card-container border-t-4 border-teal-500 p-6 animate-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-teal-700">
                  <Users size={20} /> <h2 className="font-bold">Apoderado Suplente</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuplente(false)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="nombre" placeholder="Nombre completo" className="form-input pl-4" onChange={(e) => handleApoderadoChange(e, 'apoderadoSuplente')} />
                <input name="rut" placeholder="RUN Apoderado" className="form-input pl-4" onChange={(e) => handleApoderadoChange(e, 'apoderadoSuplente')} />
                <select 
                  name="parentesco" 
                  className="form-input pl-4" 
                  onChange={(e) => handleApoderadoChange(e, 'apoderadoSuplente')} 
                  value={formData.apoderadoSuplente.parentesco}
                >
                  <option value="MADRE">Madre</option>
                  <option value="PADRE">Padre</option>
                  <option value="ABUELA_O">Abuelo/a</option>
                  <option value="TIA_O">Tío/a</option>
                  <option value="HERMANA_O">Hermano/a</option>
                  <option value="OTRO">Otro</option>
                </select>
                <input name="telefono" type="tel" placeholder="Teléfono" className="form-input pl-4" onChange={(e) => handleApoderadoChange(e, 'apoderadoSuplente')} />
                <input name="email" type="email" placeholder="Correo electrónico" className="form-input pl-4 md:col-span-2" onChange={(e) => handleApoderadoChange(e, 'apoderadoSuplente')} />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center pb-10">
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary px-10 py-4 shadow-xl shadow-blue-200 flex items-center gap-2 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {loading ? <Loader2 className="animate-spin" size={22} /> : <Save size={22} />}
            {loading ? 'Guardando en Base de Datos...' : 'Finalizar Registro de Matrícula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoEstudiante;