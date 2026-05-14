import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, HeartPulse, Users, Home,
  Calendar, ShieldCheck, Phone, Mail, MapPin
} from 'lucide-react';
import { getEstudianteById } from '../services/estudianteService';
import { formatearFecha } from '../utils/dateUtils';

const DetalleParvulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parvulo, setParvulo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const data = await getEstudianteById(id);
        setParvulo(data);
      } catch (error) {
        console.error("Error al cargar detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) cargarDetalle();
  }, [id]);

  if (loading) return <div className="p-10 text-center italic text-gray-500">Cargando ficha detallada...</div>;
  if (!parvulo) return <div className="p-10 text-center text-red-500">No se encontró el registro del párvulo.</div>;

  // Extraemos apoderados por su tipo/prioridad
  const apoderadoPrincipal = parvulo.apoderados?.find(a => a.tipoApoderado === 'TITULAR');
  const apoderadoSuplente = parvulo.apoderados?.find(a => a.tipoApoderado === 'SUPLENTE');

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      {/* Botón Volver y Título */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Volver al listado
        </button>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {parvulo.nivel?.nivel || "Nivel no definido"}
          </span>
        </div>
      </div>

      {/* HEADER: Perfil Principal */}
      <div className="main-card-container p-8 mb-8 border border-blue-100 bg-blue-50/50 flex flex-col md:flex-row items-center gap-8">
        <div className="w-18 h-18 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
          <User size={38} />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black text-gray-900 leading-tight">
            {parvulo.nombre} {parvulo.apellido}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500 font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} /> {parvulo.rut}</span>
            <span className="flex items-center gap-1.5"><Calendar size={16} /> {formatearFecha(parvulo.fechaNacimiento)}</span>
            <span className="flex items-center gap-1.5 uppercase text-xs border-l pl-4 border-gray-200">{parvulo.sexo?.genero}</span>
          </div>
        </div>
      </div>

      {/* GRID DE INFORMACIÓN DETALLADA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLUMNA 1: SALUD */}
        <div className="main-card-container border-t-4 border-red-500 p-6 space-y-6">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
            <HeartPulse size={20} /> <h3>Salud y Cuidados</h3>
          </div>
          <div className="bg-red-50/50 rounded-2xl p-5 space-y-4">
            <InfoRow label="Alergias" value={parvulo.alergias || "Ninguna"} isWarning={parvulo.alergias && parvulo.alergias !== "no"} />
            <InfoRow label="Restricciones" value={parvulo.restriccionesAlimentarias || "Sin restricciones"} />
            <div className="pt-4 border-t border-gray-50 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Previsión</p>
                <p className="font-bold text-gray-700">{parvulo.prevision || "S/I"}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Vacunas al día</p>
                <p className={`font-bold ${parvulo.vacunasAlDia ? 'text-green-600' : 'text-red-600'}`}>
                  {parvulo.vacunasAlDia ? 'SÍ' : 'NO'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: APODERADOS (Titular y Suplente) */}
        <div className="main-card-container border-t-4 border-green-500 p-6 space-y-6">
          <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
            <Users size={20} /> <h3>Red de Apoyo Familiar</h3>
          </div>
          <div className=" bg-green-50/50 rounded-2xl p-5 space-y-4">
            {/* Titular */}
            {apoderadoPrincipal && (
              <div className="space-y-3">
                <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-black">TITULAR</span>
                <div>
                  <p className="text-sm font-bold text-gray-800 uppercase leading-tight">
                    {apoderadoPrincipal.apoderado?.nombreApoderado}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {apoderadoPrincipal?.parentesco?.replace('_O', '(o)')}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" /> {apoderadoPrincipal.apoderado?.telefono}
                  </p>
                  <p className="flex items-center gap-3 text-xs text-gray-500">
                    <Mail size={14} className="text-gray-400" /> {apoderadoPrincipal.apoderado?.emailApoderado || "No registrado"}
                  </p>
                </div>
              </div>
            )}

            {/* Suplente */}
            {apoderadoSuplente && (
              <div className="space-y-3 pt-6">
                <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-black">SUPLENTE / EMERGENCIA</span>
                <div>
                  <p className="text-sm font-bold text-gray-800 uppercase leading-tight">
                    {apoderadoSuplente.apoderado?.nombreApoderado}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {apoderadoSuplente?.parentesco?.replace('_O', '(o)')}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" /> {apoderadoSuplente.apoderado?.telefono}
                  </p>
                </div>
              </div>
            )}

            {/* Dirección */}
            <div className="pt-4">
              <p className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="text-gray-400 mt-0.5" />
                <span>{parvulo.direccion}, {parvulo.comuna?.comuna}</span>
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: MATRÍCULA */}
        <div className="main-card-container border-t-4 border-blue-500 p-6 space-y-6">
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
            <Calendar size={20} /> <h3>Antecedentes de Matrícula</h3>
          </div>
          <div className="bg-blue-50/50 rounded-2xl p-5 space-y-4">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Fecha de Ingreso</p>
              <p className="font-bold text-gray-700">{formatearFecha(parvulo.fechaIngreso)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Nacionalidad</p>
              <p className="font-bold text-gray-700">{parvulo.nacionalidad?.nacionalidad}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Estado matricula</p>
              <p className={`font-bold ${parvulo.estado === true ? 'text-green-700' : 'text-red-700'}`}>
                {parvulo.estado === true ? 'VIGENTE' : 'RETIRADO'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, isWarning }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-gray-400 font-bold uppercase">{label}</span>
    <span className={`text-sm font-semibold ${isWarning ? 'text-red-600 font-black' : 'text-gray-700'}`}>
      {value}
    </span>
  </div>
);

export default DetalleParvulo;