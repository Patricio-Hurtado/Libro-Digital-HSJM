import { Search, Plus, HeartPulse, Users, FileText, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEstudiantes } from '../services/estudianteService';
import { formatearFecha } from '../utils/dateUtils';



const Identificacion = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    //Cargar datos al mostrar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await getEstudiantes();
                setEstudiantes(data);
            } catch (error) {
                console.error("Error al cargar estudiantes:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    // Filtrar y ordenar estudiantes basado en el término de búsqueda
    const filteredEstudiantes = estudiantes
        .filter(est => {
            const fullName = `${est.nombre || ''} ${est.apellido || ''}`.toLowerCase();
            const rut = (est.rut || '').toLowerCase();
            const term = searchTerm.toLowerCase();
            return fullName.includes(term) || rut.includes(term);
        })
        .sort((a, b) => {
            const nameA = `${a.nombre || ''} ${a.apellido || ''}`.trim().toLowerCase();
            const nameB = `${b.nombre || ''} ${b.apellido || ''}`.trim().toLowerCase();
            return nameA.localeCompare(nameB);
        });

    console.log("Estado actual de estudiantes:", estudiantes);

    return (
        <div className="animate-in fade-in duration-500"> {/* Clase de animación de Tailwind v4 */}
            {/* Header de la vista */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Registro de identificación</h2>
                    <p className="text-sm text-gray-500">Ficha de antecedentes de párvulos de nivel</p>
                </div>
                <Link
                    to="/nuevo-parvulo"
                    className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-blue-100 transition-transform hover:scale-105 active:scale-95"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    <span className="font-semibold">Nuevo Párvulo</span>
                </Link>
            </div>

            {/* Buscador */}
            <div className="input-search-container mb-6">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por nombre o RUT..."
                    className="input-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Tabla dinámica párvulos */}
            <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm bg-white h-75 md:h-100">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/80 text-gray-500 text-[10px] uppercase tracking-widest">
                        <tr>
                            <th className="p-4 font-bold">RUN</th>
                            <th className="p-4 font-bold">Párvulo</th>
                            <th className="p-4 font-bold hidden lg:table-cell">Nivel</th>
                            <th className="p-4 font-bold">Apoderado</th>
                            <th className="p-4 font-bold hidden md:table-cell">Estado</th>
                            <th className="p-4 font-bold text-right">Ficha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="6" className="p-10 text-center text-gray-400 italic font-medium">Sincronizando registros...</td></tr>
                        ) : filteredEstudiantes.length > 0 ? (
                            filteredEstudiantes.map((est) => (
                                <tr key={est.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4 font-medium text-gray-500 text-xs">{est.rut}</td>
                                    <td className="p-4 font-bold text-gray-900">
                                        {est.nombre} {est.apellido}
                                    </td>
                                    <td className="p-4 hidden lg:table-cell">
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                            {est.nivel.nivel || "No definido"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700">{est.apoderados[0]?.apoderado?.nombreApoderado || "Sin apoderado Asignado"}</span>
                                            <span className="text-[10px] text-gray-400">{est.apoderados[0]?.apoderado?.telefono || "Sin teléfono"}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${est.estado === true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {est.estado === true ? 'VIGENTE' : 'RETIRADO'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* BOTÓN CONFIGURADO */}
                                            <Link
                                                to={`/identificacion/${est.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-blue-100 flex items-center justify-center"
                                                title="Ver ficha completa"
                                            >
                                                <FileText size={18} />
                                            </Link>

                                            {/* Aquí podrías poner el botón de editar en el futuro */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="6" className="p-10 text-center text-gray-400">No se encontraron resultados para "{searchTerm}"</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Cards de información al pie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="info-card bg-red-50">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <HeartPulse className="text-red-500" size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">Antecedentes de salud</h4>
                        <p className="text-xs text-gray-500">Alergias, medicamentos y protocolos.</p>
                    </div>
                </div>

                <div className="info-card bg-purple-50">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                        <Users className="text-purple-500" size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">Red de apoyo familiar</h4>
                        <p className="text-xs text-gray-500">Contactos de emergencia y retiros.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Identificacion;