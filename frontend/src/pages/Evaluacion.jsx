import React, { useState, useEffect } from 'react';
import {
    Search, FileText, CheckSquare, TrendingUp,
    ChevronRight, Download, User, ExternalLink
} from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';

const Evaluacion = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await getEstudiantes();
                setEstudiantes(data);
                if (data.length > 0) setSelectedId(data.id);
            } catch (error) {
                console.error("Error al cargar estudiantes:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const estudianteSeleccionado = estudiantes.find(e => e.id === selectedId);

    // Filtrado simple para el buscador lateral
    const estudiantesFiltrados = estudiantes.filter(e =>
        `${e.nombre} ${e.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Evaluación y diagnóstico</h2>
                <p className="text-sm text-gray-500">Bitácoras, escalas de apreciación y reportes de progreso</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                {/* PANEL LATERAL: BUSCADOR Y LISTA */}
                <div className="w-full lg:w-80 shrink-0 bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col h-100">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar párvulo..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 transition-all"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <p className="p-10 text-center text-xs text-gray-400 italic">Cargando lista...</p>
                        ) : estudiantesFiltrados.map(est => (
                            <button
                                key={est.id}
                                onClick={() => setSelectedId(est.id)}
                                className={`w-full p-4 text-left border-b border-gray-50 transition-all flex flex-col gap-1
                  ${selectedId === est.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-50'}`}
                            >
                                <span className={`font-bold text-sm ${selectedId === est.id ? 'text-blue-900' : 'text-gray-700'}`}>
                                    {est.nombre} {est.apellido}
                                </span>
                                <span className="text-xs text-gray-400 tracking-wider">{est.rut}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* PANEL PRINCIPAL: DETALLE DEL PÁRVULO */}
                <div className="flex-1 space-y-6">
                    {estudianteSeleccionado ? (
                        <>
                            {/* Card de Identidad */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                                        <User size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-gray-900 leading-tight">
                                            {estudianteSeleccionado.nombre} {estudianteSeleccionado.apellido}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-widest">
                                            RUT: {estudianteSeleccionado.rut} / Nivel Medio Mayor
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                                    <Download size={16} />
                                    Reporte Integral
                                </button>
                            </div>

                            {/* Grid de Evaluaciones */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                {/* 1. Bitácora */}
                                <div className="main-card-container border border-gray-100 p-6 group hover:shadow-xl transition-all">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                        <FileText size={20} />
                                    </div>
                                    <h4 className="font-bold text-gray-900">Bitácora diagnóstica</h4>
                                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                                        Evaluación inicial marzo, completado el 15-03-26
                                    </p>
                                    <div className="mt-60 flex justify-end">
                                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                            Ver detalle <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                             
                                {/* 2. Escala de Apreciación */}
                                <div className="main-card-container border border-gray-100 p-6 group hover:shadow-xl transition-all">
                                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 mb-4">
                                        <CheckSquare size={20} />
                                    </div>
                                    <h4 className="font-bold text-gray-900">Escala de apreciación</h4>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Ámbito: Desarrollo personal y social
                                    </p>
                                    <div className="mt-60 flex justify-end">
                                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                            Ver detalle <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* 3. Reporte de Progreso */}
                                <div className="main-card-container border border-gray-100 p-6 group hover:shadow-xl transition-all">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h4 className="font-bold text-gray-900">Reporte de progreso</h4>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Resumen semestral basado en OAs
                                    </p>
                                    <div className="mt-60 flex justify-end">
                                        <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                            Configurar <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 italic">
                            Selecciona un párvulo para ver sus evaluaciones
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Evaluacion;