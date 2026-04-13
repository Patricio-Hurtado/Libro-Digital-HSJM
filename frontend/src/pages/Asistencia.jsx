import React, { useState } from 'react';
import { FileCheck, Users, CheckCircle2, Info, AlertTriangle, Sun, Moon } from 'lucide-react';

const Asistencia = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [nivelSeleccionado, setNivelSeleccionado] = useState('SALA CUNA MENOR');
  
  // Detecta automáticamente la jornada según la hora
  const [jornadaVista, setJornadaVista] = useState(new Date().getHours() < 14 ? 'manana' : 'tarde');

  const niveles = ['SALA CUNA MENOR', 'SALA CUNA MAYOR', 'MEDIO MENOR', 'MEDIO MAYOR'];

  const [parvulos, setParvulos] = useState([
    { id: 1, rut: '25.123.456-7', nombre: 'Sofía Valentina Flores Pérez', nivel: 'SALA CUNA MENOR', manana: 'P', tarde: 'P', porcentaje: 92 },
    { id: 2, rut: '25.888.777-k', nombre: 'Tomás Andrés Vargas Soto', nivel: 'SALA CUNA MENOR', manana: 'A', tarde: 'J', porcentaje: 85 },
    { id: 3, rut: '26.111.222-3', nombre: 'Martina Ignacia Flores Pérez', nivel: 'SALA CUNA MENOR', manana: 'P', tarde: 'A', porcentaje: 78 },
  ]);

  // --- LÓGICA DE CÁLCULOS ---
  const parvulosNivel = parvulos.filter(p => p.nivel === nivelSeleccionado);
  const totalNivel = parvulosNivel.length;
  
  const presentesEnJornada = parvulosNivel.filter(p => p[jornadaVista] === 'P').length;
  const justificadosEnJornada = parvulosNivel.filter(p => p[jornadaVista] === 'J').length;
  const promedioNivel = totalNivel > 0 ? (parvulosNivel.reduce((acc, p) => acc + p.porcentaje, 0) / totalNivel).toFixed(1) : 0;

  const actualizarAsistencia = (id, jornada, nuevoEstado) => {
    setParvulos(prev => prev.map(p => p.id === id ? { ...p, [jornada]: nuevoEstado } : p));
  };

  return (
    <div className="animate-in fade-in duration-500">
      
      {/* HEADER - Recuperando estilos de letras anteriores */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Control Asistencia HSJM</h2>
          <p className="text-xs text-gray-500 font-medium">Hospital San José de Melipilla</p>
        </div>
        <div className="flex gap-3">
           <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="p-2 border border-gray-200 rounded-xl text-sm font-bold shadow-sm" />
           <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg transition-all active:scale-95">
             <FileCheck size={18} /> Guardar Cambios
           </button>
        </div>
      </div>

      {/* CARDS DE RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promedio Nivel</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-800">{promedioNivel}%</span>
              <span className={`text-[10px] font-bold ${promedioNivel < 85 ? 'text-red-500' : 'text-green-500'}`}>{promedioNivel < 85 ? 'Bajo' : 'Óptimo'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl ${jornadaVista === 'manana' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600'}`}><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Presentes Hoy</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-800">{presentesEnJornada}</span>
              <span className="text-gray-400 text-xs font-medium">/ {totalNivel} Párvulos</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Info size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Justificados (J)</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-800">{justificadosEnJornada}</span>
              <span className="text-amber-600 text-[10px] font-bold italic ml-1 font-medium">Por revisar</span>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CIERRE */}
      <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-8 flex items-center gap-4">
        <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm"><AlertTriangle size={20} /></div>
        <p className="text-xs text-orange-800">
            El sistema registrará automáticamente los datos no ingresados como inasistencia a las 23:59 hrs.
            Recuerde <span className="font-bold">guardar los cambios</span> antes del término de su jornada laboral.
        </p>
      </div>

      {/* SELECTOR DE JORNADA - Nuevo pero con estilo "HSJM" */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setJornadaVista('manana')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all border
            ${jornadaVista === 'manana' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-100 text-gray-400'}`}
        >
          <Sun size={18} /> Jornada Mañana
        </button>
        <button 
          onClick={() => setJornadaVista('tarde')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all border
            ${jornadaVista === 'tarde' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-100 text-gray-400'}`}
        >
          <Moon size={18} /> Jornada Tarde
        </button>
      </div>

      {/* TABS DE NIVELES */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto bg-white rounded-t-2xl px-4 font-bold">
        {niveles.map(n => (
          <button
            key={n}
            onClick={() => setNivelSeleccionado(n)}
            className={`px-6 py-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap
              ${nivelSeleccionado === n ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* TABLA ÚNICA - Recuperando el diseño de filas exacto */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50/50">
            <tr>
              <th className="p-5 font-bold">Párvulo</th>
              <th className="p-5 text-center w-48 font-bold">Estado</th>
              <th className="p-5 text-center hidden md:table-cell font-bold">Rendimiento Mes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {parvulosNivel.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-5">
                  <div className="font-bold text-gray-900 text-sm">{p.nombre}</div>
                  <div className="text-[12px] text-gray-400 font-bold">{p.rut}</div>
                </td>
                <td className="p-5">
                  <div className="flex gap-1 justify-center">
                    {['P', 'A', 'J'].map(estado => (
                      <button
                        key={estado}
                        onClick={() => actualizarAsistencia(p.id, jornadaVista, estado)}
                        className={`w-10 h-10 rounded-xl font-bold text-white text-xs transition-all shadow-sm
                          ${p[jornadaVista] === estado 
                            ? (estado === 'P' ? 'bg-green-500' : estado === 'A' ? 'bg-red-500' : 'bg-amber-500') 
                            : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}
                          hover:scale-105 active:scale-95`}
                      >
                        {estado}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="p-5 hidden md:table-cell">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${p.porcentaje < 85 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${p.porcentaje}%` }}></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">{p.porcentaje}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Asistencia;