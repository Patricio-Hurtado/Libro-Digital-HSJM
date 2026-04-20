import React, { useState, useEffect } from 'react';
import { Save, BookOpen, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';
import { saveBitacora } from '../services/bitacoraService';

const matrizCurricular = {
  "Desarrollo personal": ["Identidad", "Autonomía", "Convivencia"],
  "Comunicación Integral": ["Lenguaje Verbal", "Lenguajes Artísticos"],
  "Interacción y Comprensión del Entorno": ["Exploración del Entorno Natural", "Identidad Cultural", "Pensamiento Matemático"],
  "Estilo de vida Saludable": ["Alimentación Consciente", "Higiene y autocuidado", "Actividad Física", "Conciencia Corporal", "Cuidado del Entorno"]
};

const nivelesFiltro = [
  { id: 'TODOS', label: 'Todos los niveles' },
  { id: 'SALA_CUNA_MENOR', label: 'Sala Cuna Menor' },
  { id: 'SALA_CUNA_MAYOR', label: 'Sala Cuna Mayor' },
  { id: 'NIVEL_MEDIO_MENOR', label: 'Medio Menor' },
  { id: 'NIVEL_MEDIO_MAYOR', label: 'Medio Mayor' }
];

const Bitacora = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [ambito, setAmbito] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [descripcionOA, setDescripcionOA] = useState('');
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [evaluaciones, setEvaluaciones] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  const [busqueda, setBusqueda] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState('TODOS');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getEstudiantes();
        setEstudiantes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const handleGuardar = async () => {
    // 1. Validar que la actividad tenga datos
    if (!ambito || !nucleo || !descripcionOA) {
      setMensaje({ tipo: 'error', texto: 'Faltan datos de la actividad.' });
      setTimeout(() => setMensaje(null), 3000);
      return;
    }

    // --- EL CANDADO DE SEGURIDAD PARA EL JEFE ---
    // Filtramos las notas para extraer ÚNICAMENTE las de los alumnos que están visibles ahora mismo en pantalla
    const evaluacionesSeguras = Object.entries(evaluaciones)
      .filter(([idDelNino]) => estudiantesFiltrados.some(est => est.id === idDelNino))
      .map(([estudianteId, calificacion]) => ({ estudianteId, calificacion }));

    // 2. Validar que haya evaluado a alguien del nivel que está mirando
    if (evaluacionesSeguras.length === 0) {
      setMensaje({ tipo: 'error', texto: 'No has evaluado a ningún alumno de este nivel.' });
      setTimeout(() => setMensaje(null), 3000);
      return;
    }
    
   const paquete = {
      fecha, 
      ambito, 
      nucleo, 
      descripcionOA,
      evaluaciones: evaluacionesSeguras // <--- Aquí va la magia
    };

   try {
      await saveBitacora(paquete);
      setMensaje({ tipo: 'exito', texto: `¡Guardado con éxito para ${nivelSeleccionado === 'TODOS' ? 'todos los niveles' : nivelSeleccionado}!` });
      setAmbito(''); setNucleo(''); setDescripcionOA(''); setEvaluaciones({});
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error de servidor.' });
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const estudiantesFiltrados = estudiantes.filter((est) => {
    const coincideNivel = nivelSeleccionado === 'TODOS' || est.nivel === nivelSeleccionado;
    const termino = busqueda.toLowerCase();
    const nombreCompleto = `${est.nombre} ${est.apellido}`.toLowerCase();
    const coincideBusqueda = nombreCompleto.includes(termino) || est.rut.includes(termino);
    return coincideNivel && coincideBusqueda;
  });

  if (loading) return <div className=" flex items-center justify-center font-bold text-gray-400">Cargando nómina...</div>;

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col animate-in fade-in duration-500 overflow-hidden">
      
      {/* HEADER COMPACTO */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
             Experiencias Pedagógicas
          </h2>
          <p className="text-xs text-gray-500 font-medium">Hospital San José de Melipilla</p>
        </div>
        <div className="flex items-center gap-4">
          {mensaje && (
             <div className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {mensaje.tipo === 'exito' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>} {mensaje.texto}
             </div>
          )}
          <button onClick={handleGuardar} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition-all">
            <Save size={16} /> Guardar Cambios
          </button>
        </div>
      </div>

      {/* DISEÑO A 2 COLUMNAS */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* COLUMNA IZQUIERDA: Formulario de la Actividad */}
        <div className="lg:w-1/3 flex flex-col shrink-0 min-h-0">
          <div className="p-1 flex flex-col flex-1 min-h-0">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 shrink-0">1. Datos Actividad</h3>
            
            <div className="space-y-4 flex flex-col flex-1 min-h-0">
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Fecha</label>
                  <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="w-full p-2.5 border border-gray-200 focus:border-blue-500 outline-none rounded-lg text-sm" />
              </div>
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Ámbito</label>
                  <select value={ambito} onChange={(e) => {setAmbito(e.target.value); setNucleo('');}} className="w-full p-2.5 border border-gray-200 focus:border-blue-500 outline-none rounded-lg text-sm bg-white">
                    <option value="">Seleccionar...</option>
                    {Object.keys(matrizCurricular).map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
              </div>
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Núcleo</label>
                  <select value={nucleo} onChange={(e) => setNucleo(e.target.value)} disabled={!ambito} className="w-full p-2.5 border border-gray-200 focus:border-blue-500 outline-none rounded-lg disabled:bg-gray-50 text-sm bg-white">
                    <option value="">Seleccionar...</option>
                    {ambito && matrizCurricular[ambito].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0 pt-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Objetivo de Aprendizaje</label>
                  <textarea value={descripcionOA} onChange={(e) => setDescripcionOA(e.target.value)} className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-lg flex-1 resize-none text-sm" placeholder="Escriba el OA aquí..." />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Filtros y Tabla */}
        <div className="lg:w-2/3 flex flex-col gap-4 min-h-0 pt-1">
          
          {/* Barra de Filtros */}
          <div className="flex gap-3 items-center shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Buscar alumno..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full pl-8 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs" />
            </div>
            <div className="relative w-48 shrink-0">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <select value={nivelSeleccionado} onChange={(e) => setNivelSeleccionado(e.target.value)} className="w-full pl-8 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs font-bold bg-white">
                {nivelesFiltro.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl shadow-sm bg-white flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/80 text-gray-500 text-[10px] uppercase tracking-widest sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="p-4 font-bold border-b border-gray-200">Párvulo ({estudiantesFiltrados.length})</th>
                    <th className="p-4 text-center font-bold border-b border-gray-200">Evaluación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {estudiantesFiltrados.length === 0 ? (
                    <tr><td colSpan="2" className="p-8 text-center text-gray-400 text-sm">No hay resultados.</td></tr>
                  ) : (
                    estudiantesFiltrados.map(est => (
                      <tr key={est.id} className="hover:bg-gray-50/50">
                        <td className="p-4">
                          <div className="font-bold text-gray-800 text-sm">{est.nombre} {est.apellido}</div>
                          <div className="text-[10px] text-gray-400">{est.rut}</div>
                        </td>
                        <td className="p-4 flex justify-center gap-1.5">
                          {['L', 'ED', 'NO'].map(n => (
                            <button
                              key={n}
                              onClick={() => setEvaluaciones({...evaluaciones, [est.id]: n})}
                              className={`w-10 h-8 rounded-lg font-bold text-[10px] transition-all ${
                                evaluaciones[est.id] === n 
                                  ? (n === 'L' ? 'bg-green-500 text-white shadow-sm scale-105' : n === 'ED' ? 'bg-amber-500 text-white shadow-sm scale-105' : 'bg-red-500 text-white shadow-sm scale-105') 
                                  : 'bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
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
      
      
    </div>
  );
};

export default Bitacora;