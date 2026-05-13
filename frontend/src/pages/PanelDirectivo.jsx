import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Users, BookOpen, Filter, UserCheck, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- DATOS SIMULADOS ---
const datosAsistencia = [
  { nivel: 'Sala Cuna Menor', asistencia: 85 },
  { nivel: 'Sala Cuna Mayor', asistencia: 88 },
  { nivel: 'Medio Menor', asistencia: 75 },
  { nivel: 'Medio Mayor', asistencia: 92 },
];

const detalleAlumnos = [
  { id: 1, nombre: 'Cristian Arancibia', nivel: 'Medio Mayor', asistencia: 95 },
  { id: 2, nombre: 'Agustina Fernández', nivel: 'Medio Mayor', asistencia: 89 },
  { id: 3, nombre: 'Diego Gómez', nivel: 'Medio Menor', asistencia: 60 },
  { id: 4, nombre: 'Sofía Flores', nivel: 'Sala Cuna Mayor', asistencia: 88 },
  { id: 5, nombre: 'Carla Flores', nivel: 'Sala Cuna Menor', asistencia: 75 },
  { id: 6, nombre: 'Lucas Martínez', nivel: 'Sala Cuna Menor', asistencia: 80 },
  { id: 7, nombre: 'Sofía López', nivel: 'Sala Cuna Menor', asistencia: 81 },
  { id: 8, nombre: 'Matías Rodríguez', nivel: 'Sala Cuna Menor', asistencia: 78 },
  { id: 9, nombre: 'Valentina González', nivel: 'Sala Cuna Menor', asistencia: 82 },
  { id: 10, nombre: 'Benjamín Pérez', nivel: 'Sala Cuna Menor', asistencia: 77 },
  { id: 11, nombre: 'Patricio Sánchez', nivel: 'Sala Cuna Menor', asistencia: 98 },
  { id: 12, nombre: 'Isidora Ramírez', nivel: 'Sala Cuna Menor', asistencia: 85 },
  { id: 13, nombre: 'Lisandro Martínez', nivel: 'Sala Cuna Menor', asistencia: 100 },
  { id: 14, nombre: 'Matías Gómez', nivel: 'Sala Cuna Menor', asistencia: 60},
  { id: 15, nombre: 'Sofía Ramírez', nivel: 'Sala Cuna Menor', asistencia: 40},
  { id: 16, nombre: 'Diego Sánchez', nivel: 'Sala Cuna Menor', asistencia: 90},
  { id: 17, nombre: 'Valentina López', nivel: 'Sala Cuna Menor', asistencia: 85},
  { id: 18, nombre: 'Benjamín González', nivel: 'Sala Cuna Menor', asistencia: 60},
  { id: 19, nombre: 'Alejandro Arancibia', nivel: 'Sala Cuna Menor', asistencia: 100},
  { id: 20, nombre: 'Isidora Fernández', nivel: 'Sala Cuna Mayor', asistencia: 80},
  { id: 21, nombre: 'Leandro Fernández', nivel: 'Sala Cuna Mayor', asistencia: 88},
  { id: 22, nombre: 'Maria Ramírez', nivel: 'Sala Cuna Mayor', asistencia: 92},
  { id: 23, nombre: 'Santiago Martínez', nivel: 'Sala Cuna Mayor', asistencia: 85},
  { id: 24, nombre: 'Valentina Rodríguez', nivel: 'Sala Cuna Mayor', asistencia: 78},
  { id: 25, nombre: 'Benjamín Ramírez', nivel: 'Sala Cuna Mayor', asistencia: 90},
  { id: 26, nombre: 'Sofía González', nivel: 'Sala Cuna Mayor', asistencia: 82},
  { id: 27, nombre: 'Matías Pérez', nivel: 'Sala Cuna Mayor', asistencia: 88},
  { id: 28, nombre: 'Isidora Sánchez', nivel: 'Sala Cuna Mayor', asistencia: 95},
  { id: 29, nombre: 'Leandro Ramírez', nivel: 'Sala Cuna Mayor', asistencia: 80},
];

const alertasSimuladas = [
  { id: 1, parvulo: 'Diego Gómez', nivel: 'Medio Menor', motivo: 'Baja asistencia mensual (60%)', tipo: 'asistencia' },
  { id: 2, parvulo: 'Sofía Flores', nivel: 'Sala Cuna Mayor', motivo: 'Múltiples evaluaciones en "NO"', tipo: 'evaluacion' },
];

// --- DATOS MULTINIVEL ---
const logroPorAreasGenerales = [
  { nombre: 'Desarrollo Personal', logrado: 80, proceso: 15, no_observado: 5 },
  { nombre: 'Comunicación Integral', logrado: 85, proceso: 10, no_observado: 5 },
  { nombre: 'Entorno', logrado: 70, proceso: 20, no_observado: 10 },
  { nombre: 'Sello Institucional', logrado: 90, proceso: 10, no_observado: 0 },
];

const logroPorNucleosEspecificos = {
  'Desarrollo Personal': [
    { nombre: 'Identidad', logrado: 85, proceso: 10, no_observado: 5 },
    { nombre: 'Autonomía', logrado: 75, proceso: 20, no_observado: 5 },
    { nombre: 'Convivencia', logrado: 80, proceso: 15, no_observado: 5 }
  ],
  'Comunicación Integral': [
    { nombre: 'Lenguaje Verbal', logrado: 85, proceso: 10, no_observado: 5 },
    { nombre: 'Lenguajes Artísticos', logrado: 85, proceso: 15, no_observado: 0 }
  ],
  'Entorno': [
    { nombre: 'Entorno Natural', logrado: 75, proceso: 15, no_observado: 10 },
    { nombre: 'Identidad Cultural', logrado: 65, proceso: 25, no_observado: 10 },
    { nombre: 'P. Matemático', logrado: 70, proceso: 20, no_observado: 10 }
  ],
  'Sello Institucional': [
    { nombre: 'Alimentación', logrado: 95, proceso: 5, no_observado: 0 },
    { nombre: 'Higiene', logrado: 90, proceso: 10, no_observado: 0 },
    { nombre: 'Actividad Física', logrado: 85, proceso: 15, no_observado: 0 },
    { nombre: 'C. Corporal', logrado: 88, proceso: 12, no_observado: 0 },
    { nombre: 'C. Entorno', logrado: 92, proceso: 8, no_observado: 0 }
  ]
};

const PanelDirectivo = () => {
  const [filtroNivel, setFiltroNivel] = useState('TODOS');
  const [filtroPeriodo, setFiltroPeriodo] = useState('Abril 2026');
  const [filtroArea, setFiltroArea] = useState('TODAS'); 

  // --- LÓGICA DE FILTRADO DINÁMICO ---
  const datosFiltradosAsistencia = filtroNivel === 'TODOS' ? datosAsistencia : datosAsistencia.filter(d => d.nivel === filtroNivel);
  const alertasFiltradas = filtroNivel === 'TODOS' ? alertasSimuladas : alertasSimuladas.filter(a => a.nivel === filtroNivel);
  const alumnosFiltrados = filtroNivel === 'TODOS' ? detalleAlumnos : detalleAlumnos.filter(a => a.nivel === filtroNivel);

  // MÁGIA DEL GRÁFICO: Cambia de Áreas a Núcleos según el filtro
  const datosGraficoLogro = filtroArea === 'TODAS' ? logroPorAreasGenerales : logroPorNucleosEspecificos[filtroArea];

  // --- CÁLCULO AUTOMÁTICO DE KPIs ---
  const promedioAsistencia = datosFiltradosAsistencia.length > 0 
    ? Math.round(datosFiltradosAsistencia.reduce((acc, curr) => acc + curr.asistencia, 0) / datosFiltradosAsistencia.length) : 0;
    
  const totalAlertas = alertasFiltradas.length;
  
  // KPI Dinámico de Logro
  const tituloKpiDinamico = filtroArea === 'TODAS' ? 'Promedio Todas las Áreas' : `Logro en ${filtroArea}`;
  const valorKpiDinamico = `${Math.round(datosGraficoLogro.reduce((acc, curr) => acc + curr.logrado, 0) / datosGraficoLogro.length)}%`;
  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500">
      
      {/* HEADER Y FILTROS: Ajustado para que se apile en celulares */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 shrink-0 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Panel Directivo
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Vista gerencial de indicadores - HSJM</p>
        </div>
        
        {/* Contenedor de filtros responsivo */}
        <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm w-full lg:w-auto">
          <div className="flex items-center gap-2 px-2 pb-2 sm:pb-0 sm:border-r border-b sm:border-b-0 border-gray-100 w-full sm:w-auto">
            <Filter size={14} className="text-gray-400 shrink-0" />
            <select value={filtroPeriodo} onChange={e => setFiltroPeriodo(e.target.value)} className="text-xs font-bold text-gray-600 outline-none bg-transparent cursor-pointer w-full sm:w-auto">
              <option>Abril 2026</option>
              <option>Primer Trimestre</option>
              <option>Semestre 1</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-2 pb-2 sm:pb-0 sm:border-r border-b sm:border-b-0 border-gray-100 w-full sm:w-auto">
            <select value={filtroArea} onChange={e => setFiltroArea(e.target.value)} className="text-xs font-bold text-gray-600 outline-none bg-transparent cursor-pointer w-full sm:w-auto max-w-full truncate">
              <option value="TODAS">Todas las Áreas</option>
              <option value="Desarrollo Personal">Desarrollo Personal</option>
              <option value="Comunicación Integral">Comunicación Integral</option>
              <option value="Entorno">Comprensión del Entorno</option>
              <option value="Sello Institucional">Sello Institucional</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-2 w-full sm:w-auto">
            <select value={filtroNivel} onChange={e => setFiltroNivel(e.target.value)} className="text-xs font-bold text-gray-600 outline-none bg-transparent cursor-pointer w-full sm:w-auto">
              <option value="TODOS">Todos los Niveles</option>
              <option value="Sala Cuna Menor">Sala Cuna Menor</option>
              <option value="Sala Cuna Mayor">Sala Cuna Mayor</option>
              <option value="Medio Menor">Medio Menor</option>
              <option value="Medio Mayor">Medio Mayor</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        
        {/* TARJETAS DE RESUMEN (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Users size={24} /></div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Promedio Asistencia</p>
              <p className="text-2xl font-black text-gray-800">{promedioAsistencia}%</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600"><TrendingUp size={24} /></div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">% Logro General</p>
              <p className="text-2xl font-black text-gray-800">78%</p>
            </div>
          </div>
          {/* TARJETA DINÁMICA DE ÁREA */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><CheckCircle size={24} /></div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{tituloKpiDinamico}</p>
              <p className="text-2xl font-black text-gray-800">{valorKpiDinamico}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm flex items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"><AlertTriangle size={24} /></div>
            <div>
              <p className="text-[10px] text-red-400 font-black uppercase tracking-wider">Alertas Activas</p>
              <p className="text-2xl font-black text-red-700">{totalAlertas} {totalAlertas === 1 ? 'Niño' : 'Niños'}</p>
            </div>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-80 flex flex-col">
            <h3 className="text-sm font-bold text-gray-700 mb-4">Promedio de Asistencia por Nivel</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datosFiltradosAsistencia}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="nivel" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="asistencia" stroke="#2563EB" strokeWidth={4} dot={{ r: 6, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} name="% Asistencia" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-80 flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-sm font-bold text-gray-700">% de Logro Pedagógico</h3>
               <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                 {filtroArea === 'TODAS' ? 'Vista General' : 'Vista Específica'}
               </span>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {/* GRÁFICO QUE CAMBIA MÁGICAMENTE (dataKey="nombre" para que sirva con áreas o núcleos) */}
                <BarChart data={datosGraficoLogro} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="nombre" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#6B7280' }} dy={10} interval={0} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} domain={[0, 100]} />
                  <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="logrado" name="L (Logrado)" stackId="a" fill="#22C55E" radius={[0, 0, 4, 4]} barSize={40} />
                  <Bar dataKey="proceso" name="EP (En Proceso)" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="no_observado" name="NO (No Observado)" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* TABLAS INFERIORES: Asistencia individual y Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-blue-50/50 p-4 border-b border-gray-200 flex justify-between items-center">
               <h3 className="font-bold text-blue-700 text-sm flex items-center gap-2"><UserCheck size={16}/> Asistencia Mensual por Párvulo</h3>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 max-h-60">
              <table className="w-full text-left">
                <thead className="bg-gray-50/80 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="p-3">Párvulo</th>
                    <th className="p-3 text-center">% Mensual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {alumnosFiltrados.map(alumno => (
                    <tr key={alumno.id} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-800 text-sm">
                        {alumno.nombre}
                        <div className="text-[10px] text-gray-400 font-normal">{alumno.nivel}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${alumno.asistencia >= 85 ? 'bg-green-100 text-green-700' : alumno.asistencia >= 70 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {alumno.asistencia}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-red-50/50 p-4 border-b border-gray-200 flex justify-between items-center">
               <h3 className="font-bold text-red-700 text-sm flex items-center gap-2"><AlertTriangle size={16}/> Listado de Alertas</h3>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 max-h-60">
              <table className="w-full text-left">
                <thead className="bg-gray-50/80 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="p-3">Párvulo</th>
                    <th className="p-3">Motivo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {alertasFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="p-6 text-center text-sm font-bold text-gray-400">
                        No hay alertas para el nivel seleccionado.
                      </td>
                    </tr>
                  ) : (
                    alertasFiltradas.map(alerta => (
                      <tr key={alerta.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-800 text-sm">
                          {alerta.parvulo}
                          <div className="text-[10px] text-gray-400 font-normal">{alerta.nivel}</div>
                        </td>
                        <td className="p-3 text-sm">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${alerta.tipo === 'asistencia' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {alerta.motivo}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default PanelDirectivo;