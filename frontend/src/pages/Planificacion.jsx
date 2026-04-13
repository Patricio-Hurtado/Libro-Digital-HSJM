import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Upload, ChevronRight, 
  Calendar, Folder, ArrowUpRight, Search 
} from 'lucide-react';
// import { getPlanificaciones } from '../services/planificacionService'; // Simulado

const Planificacion = () => {
  const [tabActiva, setTabActiva] = useState('Todas');
  const [planificaciones, setPlanificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['Todas', 'Anuales', 'Sectoriales', 'Transversales'];

  // Carga de datos (usando los datos que inyectamos en el seed)
  useEffect(() => {
    const cargarPlanificaciones = async () => {
      try {
        const data = await getPlanificaciones();
        setPlanificaciones(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar planificaciones:", error);
        setLoading(false);
      }
    };
    cargarPlanificaciones();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Planificación Pedagógica</h2>
          <p className="text-sm text-gray-500 mt-1">Conforme a las Bases Curriculares de Educación Parvularia</p>
        </div>
        
        <button className="btn-primary flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 transition-transform hover:scale-105">
          <Upload size={18} strokeWidth={2.5} />
          <span className="font-semibold text-sm">Subir Planificación</span>
        </button>
      </div>

      {/* Tabs de Filtro */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setTabActiva(tab)}
            className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
              tabActiva === tab 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tarjeta: Nueva Planificación (Dashed) */}
        <div className="group cursor-pointer">
          <div className="h-full min-h-[220px] bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all hover:bg-blue-100 hover:border-blue-300">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-100">
              <Plus size={24} strokeWidth={3} />
            </div>
            <h4 className="text-blue-900 font-bold text-lg mb-2">Nueva planificación</h4>
            <p className="text-blue-600/70 text-xs px-4">
              Crea una planificación desde plantilla o sube un documento PDF.
            </p>
          </div>
        </div>

        {/* Tarjeta: Ejemplo de Unidad (Mapeada de tus datos) */}
        <div className="main-card-container !p-0 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-gray-100 transition-all border border-gray-100 rounded-3xl">
          <div className="p-8 flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-5">
              <FileText size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-4 leading-tight">
              Unidad: Conociendo mi entorno
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Folder size={14} />
                <span>Tipo: Sectorial</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar size={14} />
                <span>Modificado el 13-03-26</span>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Por Educadora Marta</span>
            <button className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:gap-2 transition-all">
              Revisa <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Tarjeta: Planificación Anual */}
        <div className="main-card-container !p-0 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-gray-100 transition-all border border-gray-100 rounded-3xl">
          <div className="p-8 flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-5">
              <FileText size={24} />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-4 leading-tight">
              Planificación anual nivel medio mayor
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Folder size={14} />
                <span>Tipo: Anual</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar size={14} />
                <span>Modificado el 28-02-26</span>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Por Educadora Marta</span>
            <button className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:gap-2 transition-all">
              Revisa <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Planificacion;