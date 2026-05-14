import React, { useState, useEffect } from 'react';
import { 
    Search, ChevronDown, Check, User, Clock, 
    FileText, Calendar, ClipboardList,
    AlertCircle, Download, History, Eye, Edit3
} from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';

const HistorialRegistros = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    const historialData = [
        {
            id: 1,
            tipo: 'Bitácora',
            fecha: '2024-04-15 09:30',
            titulo: 'Observación de Conducta',
            descripcion: 'El párvulo participó activamente en la actividad grupal de motricidad fina, mostrando avances significativos.',
            autor: 'Técnico Carlos Pérez',
            editadoPor: 'Educadora Marta Valenzuela',
            color: 'bg-blue-100 text-blue-600',
            icon: <FileText size={18} />
        },
        {
            id: 2,
            tipo: 'Evaluación',
            fecha: '2024-04-14 14:20',
            titulo: 'Pauta de Cotejo Semestral',
            descripcion: 'Resultados satisfactorios en el núcleo de Identidad y Autonomía.',
            autor: 'Técnico Laura González',
            editadoPor: 'Educadora Marta Valenzuela',
            color: 'bg-purple-100 text-purple-600',
            icon: <ClipboardList size={18} />
        }
    ];

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await getEstudiantes();
                setEstudiantes(data);
            } catch (error) {
                console.error("Error al cargar estudiantes:", error);
            }
        };
        cargarDatos();
    }, []);

    const estudiantesFiltrados = estudiantes.filter(e =>
        `${e.nombre} ${e.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Historial de Registros</h2>
                <p className="text-sm text-gray-500">Cronología completa de actividades y evoluciones del párvulo</p>
            </div>

            {/* BUSCADOR E INFO */}
            <div className="flex flex-col md:flex-row items-end gap-4 mb-8 z-30 relative">
                <div className="w-full max-w-xl relative">
                    <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block">Seleccionar Párvulo</label>
                    <div
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="flex items-center gap-3">
                            <Search size={20} className="text-gray-400" />
                            <span className={selectedEstudiante ? "text-lg text-gray-900 font-medium" : "text-gray-400"}>
                                {selectedEstudiante ? `${selectedEstudiante.nombre} ${selectedEstudiante.apellido}` : "Buscar niño/a..."}
                            </span>
                        </div>
                        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute left-0 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 z-40">
                            <div className="p-3 border-b border-gray-100 bg-gray-50">
                                <input
                                    autoFocus
                                    className="w-full pl-4 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
                                    placeholder="Escribe para filtrar..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                />
                            </div>
                            <div className="max-h-60 overflow-y-auto">
                                {estudiantesFiltrados.map(est => (
                                    <div 
                                        key={est.id}
                                        className="px-6 py-3 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors"
                                        onClick={() => {
                                            setSelectedEstudiante(est);
                                            setIsDropdownOpen(false);
                                            setBusqueda('');
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-700">{est.nombre} {est.apellido}</span>
                                            <span className="text-[10px] text-gray-400">{est.rut}</span>
                                        </div>
                                        {selectedEstudiante?.id === est.id && <Check size={16} className="text-blue-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* INFO DEL PÁRVULO  */}
                {selectedEstudiante && (
                    <div className="flex-1 min-w-70 bg-blue-50 border border-blue-100 rounded-2xl p-3 flex items-center justify-between animate-in slide-in-from-left-4 duration-300">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                                <User size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold text-gray-900 truncate">
                                    {selectedEstudiante.nombre} {selectedEstudiante.apellido}
                                </p>
                                <p className="text-[10px] text-blue-600 font-bold uppercase">RUT: {selectedEstudiante.rut}</p>
                            </div>
                        </div>
                        <button className="p-2 bg-white text-gray-500 hover:text-blue-600 rounded-lg shadow-sm transition-colors">
                            <Download size={16} />
                        </button>
                    </div>
                )}
            </div>

            {selectedEstudiante ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <History className="text-gray-400" size={20} />
                        <h3 className="font-bold text-gray-700">Línea de Tiempo</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {historialData.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-100 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl ${item.color}`}>{item.icon}</div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.tipo}</span>
                                            <h4 className="font-bold text-gray-800">{item.titulo}</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded-lg">
                                        <Clock size={12} /> {item.fecha}
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-600 leading-relaxed italic mb-4">"{item.descripcion}"</p>
                                
                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-end">
                                    <div className="flex flex-col gap-1"> 
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                            <span className="text-[10px] text-gray-400 font-medium">Autor: {item.autor}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                                            <span className="text-[10px] text-gray-500 font-bold">Editado por: {item.editadoPor}</span>
                                        </div>
                                    </div>

                                    {/* BOTONES DE ACCIÓN */}
                                    <div className="flex gap-2">
                                        <button 
                                            title="Ver Detalle"
                                            className="p-2 bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all active:scale-95 border border-gray-100"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button 
                                            title="Editar Registro"
                                            className="p-2 bg-gray-50 text-gray-500 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all active:scale-95 border border-gray-100"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-4xl italic">
                    <Search size={40} className="mb-2 opacity-20" />
                    Selecciona un párvulo para cargar su historial
                </div>
            )}
        </div>
    );
};

export default HistorialRegistros;