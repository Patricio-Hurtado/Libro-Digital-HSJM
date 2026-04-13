import React, { useState, useEffect } from 'react';
import {
    FileEdit, History, ShieldCheck, ShieldAlert,
    User, Clock, Send, ChevronDown,
    Search,
    Check
} from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';

const Anecdotas = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [selectedEstudiante, setSelectedEstudiante] = useState('');
    const [observacion, setObservacion] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    // Datos mock para el historial basándonos en tu imagen
    const historialMock = [
        {
            id: 1,
            estudiante: 'Martina Ignacia Rojas Silva',
            inicial: 'M',
            color: 'bg-blue-100 text-blue-600',
            fecha: '25-03-2026, 10:30:00 a. m.',
            contenido: '"Martina demostró gran interés en la actividad de pintura de hoy, compartiendo sus materiales con sus compañeros de manera espontánea."',
            estado: 'Validada',
            autor: 'Educadora Marta',
            auditoria: 'Creado por Educadora Marta el 2026-03-25 10:30'
        },
        {
            id: 2,
            estudiante: 'Tomás Andrés Vargas Soto',
            inicial: 'T',
            color: 'bg-indigo-100 text-indigo-600',
            fecha: '24-03-2026, 2:15:00 p. m.',
            contenido: '"Tomás presentó dificultades para seguir instrucciones durante el juego grupal, requiriendo apoyo adicional."',
            estado: 'Pendiente',
            autor: 'Técnico Laura',
            auditoria: 'Creado por Técnico Laura el 2026-03-24 14:15 | Editado por Educadora Marta el 2026-03-24 15:00'
        }
    ];

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await getEstudiantes();
                setEstudiantes(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    // Filtrado para el buscador del select
    const estudiantesFiltrados = estudiantes.filter(est =>
        `${est.nombre} ${est.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    // El botón solo se habilita si hay estudiante Y hay texto en la observación
    const canSave = selectedEstudiante && observacion.trim().length > 0;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header de la vista */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Registro de Anécdotas y Observaciones</h2>
                <p className="text-sm text-gray-500">Libro de vida digital con trazabilidad y firma electrónica simple</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* COLUMNA IZQUIERDA: FORMULARIO DE NUEVO REGISTRO */}
                <div className="lg:col-span-5 sticky top-8">
                    <div className="main-card-container p-8 border border-gray-200 rounded-[2rem] shadow-xl shadow-gray-50">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <FileEdit size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Nuevo Registro</h3>
                        </div>

                        <form className="space-y-6">
                            {/* Selector de Párvulo */}
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Seleccionar Párvulo</label>
                                <div
                                    className="form-input bg-gray-50 border-gray-200 flex items-center justify-between cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className={selectedEstudiante ? "text-gray-900" : "text-gray-400"}>
                                        {selectedEstudiante ? `${selectedEstudiante.nombre} ${selectedEstudiante.apellido}` : "Buscar niño/a..."}
                                    </span>
                                    <ChevronDown size={18} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                                        <div className="p-2 border-b border-gray-100 bg-gray-50">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Escribe para filtrar..."
                                                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                                                    value={busqueda}
                                                    onChange={(e) => setBusqueda(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {estudiantesFiltrados.map(est => (
                                                <div
                                                    key={est.id}
                                                    className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                                                    onClick={() => {
                                                        setSelectedEstudiante(est);
                                                        setIsDropdownOpen(false);
                                                        setBusqueda('');
                                                    }}
                                                >
                                                    <span>{est.nombre} {est.apellido}</span>
                                                    {selectedEstudiante?.id === est.id && <Check size={14} className="text-blue-600" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Área de Texto */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Observación</label>
                                <textarea
                                    rows="5"
                                    className="form-input bg-gray-50 border-gray-200 focus:bg-white resize-none"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Info Box Firma */}
                            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                                <ShieldCheck className="text-blue-600 shrink-0" size={20} />
                                <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                                    Al guardar, este registro será firmado con las credenciales de <span className="font-bold">Marta Valenzuela (Educadora)</span> y no podrá ser alterado sin dejar rastro de auditoría.
                                </p>
                            </div>

                            <button
                                disabled={!canSave}
                                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all
                                    ${canSave
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                <Send size={20} />
                                Firmar y Guardar Registro
                            </button>
                        </form>
                    </div>
                </div>

                {/* COLUMNA DERECHA: HISTORIAL DE REGISTROS */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3 px-2 mb-2">
                        <History className="text-gray-400" size={22} />
                        <h3 className="text-lg font-bold text-gray-700">Historial de Registros</h3>
                    </div>

                    {historialMock.map((item) => (
                        <div key={item.id} className="main-card-container p-6 border border-gray-100 hover:border-blue-100 transition-all">
                            {/* Header de la Card */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center font-bold text-sm`}>
                                        {item.inicial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{item.estudiante}</h4>
                                        <div className="flex items-center gap-1.5 text-gray-400 text-[10px] mt-0.5">
                                            <Clock size={12} />
                                            {item.fecha}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido */}
                            <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                                {item.contenido}
                            </p>

                            {/* Footer de Trazabilidad */}
                            <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2 text-green-600 font-bold text-[10px]">
                                        <ShieldCheck size={14} />
                                        Firma Electrónica Validada
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-medium">Autor original: {item.autor}</span>
                                </div>

                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Huella de Auditoría:</p>
                                    <ul className="space-y-1">
                                        {item.auditoria.split('|').map((log, idx) => (
                                            <li key={idx} className="text-[10px] text-gray-500 flex items-center gap-2">
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                {log.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Anecdotas;