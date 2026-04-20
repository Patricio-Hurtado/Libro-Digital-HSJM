import React, { useState, useEffect } from 'react';
import { FileCheck, Users, CheckCircle2, Info, AlertTriangle, Sun, Moon } from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';

const Asistencia = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  
  // 1. Nivel inicial configurado con el ID de la base de datos
  const [nivelSeleccionado, setNivelSeleccionado] = useState('SALA_CUNA_MENOR');
  
  // Detecta automáticamente la jornada según la hora
  const [jornadaVista, setJornadaVista] = useState(new Date().getHours() < 14 ? 'manana' : 'tarde');

  // 2. Estado de carga y datos vacíos al inicio (esperando al servidor)
  const [loading, setLoading] = useState(true);
  const [parvulos, setParvulos] = useState([]);

  // 3. Arreglo de niveles adaptado: 'id' para la lógica, 'label' para lo visual
  const niveles = [
    { id: 'SALA_CUNA_MENOR', label: 'SALA CUNA MENOR' },
    { id: 'SALA_CUNA_MAYOR', label: 'SALA CUNA MAYOR' },
    { id: 'NIVEL_MEDIO_MENOR', label: 'MEDIO MENOR' },
    { id: 'NIVEL_MEDIO_MAYOR', label: 'MEDIO MAYOR' }
  ];

  // 4. El useEffect que hace la magia de ir a buscar los datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getEstudiantes();
        
        // Adaptamos la respuesta de la BD para que tu tabla la entienda
        const datosAdaptados = data.map(nino => ({
          id: nino.id,
          rut: nino.rut,
          nombre: `${nino.nombre} ${nino.apellido}`, 
          nivel: nino.nivel, 
          manana: '-', 
          tarde: '-',  
          porcentaje: 100 
        }));

        setParvulos(datosAdaptados);
      } catch (error) {
        console.error("Error al cargar estudiantes del HSJM:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // --- LÓGICA DE CÁLCULOS ---
  const parvulosNivel = parvulos.filter(p => p.nivel === nivelSeleccionado);
  const totalNivel = parvulosNivel.length;
  
  const presentesEnJornada = parvulosNivel.filter(p => p[jornadaVista] === 'P').length;
  const justificadosEnJornada = parvulosNivel.filter(p => p[jornadaVista] === 'J').length;
  const promedioNivel = totalNivel > 0 ? (parvulosNivel.reduce((acc, p) => acc + p.porcentaje, 0) / totalNivel).toFixed(1) : 0;

  const actualizarAsistencia = (id, jornada, nuevoEstado) => {
    setParvulos(prev => prev.map(p => p.id === id ? { ...p, [jornada]: nuevoEstado } : p));
  };

  // Pantalla de carga mientras se obtienen los datos
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-gray-500 font-bold">Cargando registros del Hospital...</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 flex flex-col w-full">
      
      {/* HEADER - Responsivo: apilado en móvil, en línea en PC */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 sm:mb-8 gap-4 w-full">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Control Asistencia HSJM</h2>
          <p className="text-xs text-gray-500 font-medium mt-1">Hospital San José de Melipilla</p>
        </div>
        {/* Los controles se adaptan al 100% del ancho en móvil */}
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
           <input 
             type="date" 
             value={fecha} 
             onChange={(e) => setFecha(e.target.value)} 
             className="p-3 sm:p-2 border border-gray-200 rounded-xl text-sm font-bold shadow-sm w-full sm:w-auto" 
           />
           <button className="bg-blue-600 text-white px-6 py-3 sm:py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md transition-all active:scale-95 w-full sm:w-auto">
             <FileCheck size={18} /> Guardar Cambios
           </button>
        </div>
      </div>

      {/* CARDS DE RESUMEN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><Users size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promedio Nivel</p>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-gray-800">{promedioNivel}%</span>
              <span className={`text-[10px] font-bold ${promedioNivel < 85 ? 'text-red-500' : 'text-green-500'}`}>{promedioNivel < 85 ? 'Bajo' : 'Óptimo'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${jornadaVista === 'manana' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-600'}`}><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Presentes Hoy</p>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-gray-800">{presentesEnJornada}</span>
              <span className="text-gray-400 text-xs font-medium">/ {totalNivel} Párvulos</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl shrink-0"><Info size={24} /></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Justificados (J)</p>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-gray-800">{justificadosEnJornada}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER CIERRE */}
      <div className="bg-orange-50 border border-orange-100 p-3 sm:p-4 rounded-2xl mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="p-2 bg-white rounded-lg text-orange-600 shadow-sm shrink-0"><AlertTriangle size={20} /></div>
        <p className="text-xs text-orange-800 leading-relaxed">
            El sistema registrará automáticamente los datos no ingresados como inasistencia a las 23:59 hrs.
            Recuerde <span className="font-bold">guardar los cambios</span> antes del término de su jornada.
        </p>
      </div>

      {/* SELECTOR DE JORNADA */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <button 
          onClick={() => setJornadaVista('manana')}
          className={`flex-1 flex items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl font-bold transition-all border
            ${jornadaVista === 'manana' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-white border-gray-100 text-gray-400'}`}
        >
          <Sun size={18} /> Jornada Mañana
        </button>
        <button 
          onClick={() => setJornadaVista('tarde')}
          className={`flex-1 flex items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl font-bold transition-all border
            ${jornadaVista === 'tarde' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-100 text-gray-400'}`}
        >
          <Moon size={18} /> Jornada Tarde
        </button>
      </div>

      {/* TABS DE NIVELES (Scroll horizontal suave en móviles) */}
      <div className="flex border-b border-gray-200 mb-6 sm:mb-8 overflow-x-auto custom-scrollbar bg-white rounded-t-2xl px-2 sm:px-4 font-bold">
        {niveles.map(n => (
          <button
            key={n.id}
            onClick={() => setNivelSeleccionado(n.id)}
            className={`px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-bold transition-all border-b-2 whitespace-nowrap
              ${nivelSeleccionado === n.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* TABLA DE ASISTENCIA */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left min-w-[320px]">
          <thead className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50/50">
            <tr>
              <th className="p-3 sm:p-5 font-bold">Párvulo</th>
              <th className="p-3 sm:p-5 text-center w-36 sm:w-48 font-bold">Estado</th>
              <th className="p-3 sm:p-5 text-center hidden md:table-cell font-bold">Rendimiento Mes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {parvulosNivel.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 sm:p-8 text-center text-gray-500 font-medium text-sm">
                  No hay párvulos matriculados en este nivel todavía.
                </td>
              </tr>
            ) : (
              parvulosNivel.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="p-3 sm:p-5">
                    <div className="font-bold text-gray-900 text-xs sm:text-sm">{p.nombre}</div>
                    <div className="text-[10px] sm:text-[12px] text-gray-400 font-bold">{p.rut}</div>
                  </td>
                  <td className="p-3 sm:p-5">
                    <div className="flex gap-1 sm:gap-2 justify-center">
                      {['P', 'A', 'J'].map(estado => (
                        <button
                          key={estado}
                          onClick={() => actualizarAsistencia(p.id, jornadaVista, estado)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl font-bold text-white text-[10px] sm:text-xs transition-all shadow-sm
                            ${p[jornadaVista] === estado 
                              ? (estado === 'P' ? 'bg-green-500' : estado === 'A' ? 'bg-red-500' : 'bg-amber-500') 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                            hover:scale-105 active:scale-95`}
                        >
                          {estado}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 sm:p-5 hidden md:table-cell">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-32 bg-gray-100 h-2 sm:h-3 rounded-full overflow-hidden">
                        <div className={`h-full ${p.porcentaje < 85 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${p.porcentaje}%` }}></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700 w-10">{p.porcentaje}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default Asistencia;