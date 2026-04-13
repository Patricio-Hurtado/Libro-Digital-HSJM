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
            <div className="overflow-x-auto border border-gray-300 rounded-xl h-[300px] md:h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="p-4 font-semibold">RUT</th>
                            <th className="p-4 font-semibold">Nombre completo</th>
                            <th className="p-4 font-semibold">Apoderado</th>
                            {/* Columna responsiva */}
                            <th className="p-4 font-semibold hidden md:table-cell">Fecha Nac.</th>
                            <th className="p-4 font-semibold text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-sm divide-gray-50">
                        {loading ? (
                            <tr><td colSpan="5" className="p-10 text-center text-gray-400 italic">Cargando datos...</td></tr>
                        ) : (filteredEstudiantes && filteredEstudiantes.length > 0) ? (
                            filteredEstudiantes.map((est) => (
                                <tr key={est.id} className="hover:bg-blue-50/50 transition-colors group">
                                    <td className="p-4 font-medium text-gray-600">
                                        {est.rut || "S/R"}
                                    </td>
                                    <td className="p-4 font-semibold text-gray-900">
                                        {`${est.nombre || ''} ${est.apellido || ''}`}
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {est.nombreApoderado || "No asignado"}
                                    </td>
                                    {/* Se oculta igual que el header en móvil */}
                                    <td className="p-4 text-gray-600 hidden md:table-cell">
                                        {formatearFecha(est.fechaNacimiento) || "No asignado"}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Ver ficha">
                                                <FileText size={18} />
                                            </button>
                                            {/* <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button> */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="p-10 text-center text-gray-400">No hay párvulos registrados aún.</td></tr>
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