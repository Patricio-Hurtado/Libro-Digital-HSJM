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

const datosPruebaEstudiantes = [
  // --- SALA CUNA MENOR (15) ---
  { id: 'SCM-01', rut: '26.123.456-1', nombre: 'Mateo', apellido: 'Silva', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-02', rut: '26.234.567-2', nombre: 'Isabella', apellido: 'Rojas', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-03', rut: '26.345.678-3', nombre: 'Agustín', apellido: 'Soto', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-04', rut: '26.456.789-4', nombre: 'Emilia', apellido: 'Muñoz', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-05', rut: '26.567.890-5', nombre: 'Lucas', apellido: 'Contreras', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-06', rut: '26.678.901-6', nombre: 'Sofía', apellido: 'Sepúlveda', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-07', rut: '26.789.012-7', nombre: 'Benjamín', apellido: 'Morales', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-08', rut: '26.890.123-8', nombre: 'Florencia', apellido: 'Díaz', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-09', rut: '26.901.234-9', nombre: 'Vicente', apellido: 'Fuentes', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-10', rut: '26.012.345-K', nombre: 'Maite', apellido: 'Castro', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-11', rut: '26.111.222-3', nombre: 'Maximiliano', apellido: 'Vargas', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-12', rut: '26.222.333-4', nombre: 'Josefa', apellido: 'Reyes', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-13', rut: '26.333.444-5', nombre: 'Tomás', apellido: 'Herrera', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-14', rut: '26.444.555-6', nombre: 'Martina', apellido: 'Carrasco', nivel: 'SALA_CUNA_MENOR' },
  { id: 'SCM-15', rut: '26.555.666-7', nombre: 'Joaquín', apellido: 'Medina', nivel: 'SALA_CUNA_MENOR' },

  // --- SALA CUNA MAYOR (15) ---
  { id: 'SCM-16', rut: '25.666.777-8', nombre: 'Martín', apellido: 'Pizarro', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-17', rut: '25.777.888-9', nombre: 'Amanda', apellido: 'Valdés', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-18', rut: '25.888.999-0', nombre: 'Gaspar', apellido: 'Tapia', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-19', rut: '25.999.000-1', nombre: 'Antonella', apellido: 'Cortés', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-20', rut: '25.121.212-2', nombre: 'Alonso', apellido: 'Núñez', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-21', rut: '25.232.323-3', nombre: 'Julieta', apellido: 'Araya', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-22', rut: '25.343.434-4', nombre: 'Facundo', apellido: 'Moya', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-23', rut: '25.454.545-5', nombre: 'Isidora', apellido: 'Venegas', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-24', rut: '25.565.656-6', nombre: 'Santiago', apellido: 'Escobar', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-25', rut: '25.676.767-7', nombre: 'Catalina', apellido: 'Navarro', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-26', rut: '25.787.878-8', nombre: 'León', apellido: 'Cárdenas', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-27', rut: '25.898.989-9', nombre: 'Renato', apellido: 'Riquelme', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-28', rut: '25.909.090-K', nombre: 'Valentina', apellido: 'Salazar', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-29', rut: '25.010.101-1', nombre: 'Ignacio', apellido: 'Gómez', nivel: 'SALA_CUNA_MAYOR' },
  { id: 'SCM-30', rut: '25.131.313-2', nombre: 'Fernanda', apellido: 'Ríos', nivel: 'SALA_CUNA_MAYOR' },

  // --- MEDIO MENOR (15) ---
  { id: 'MM-31', rut: '24.242.424-3', nombre: 'Diego', apellido: 'Gómez', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-32', rut: '24.353.535-4', nombre: 'Agustina', apellido: 'Fernández', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-33', rut: '24.464.646-5', nombre: 'Simón', apellido: 'Lagos', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-34', rut: '24.575.757-6', nombre: 'Ignacia', apellido: 'Orellana', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-35', rut: '24.686.868-7', nombre: 'Bruno', apellido: 'Garrido', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-36', rut: '24.797.979-8', nombre: 'Trinidad', apellido: 'Sanhueza', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-37', rut: '24.808.080-9', nombre: 'Julián', apellido: 'Bravo', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-38', rut: '24.919.191-K', nombre: 'Rafaela', apellido: 'Cares', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-39', rut: '24.020.202-1', nombre: 'Dante', apellido: 'Mellado', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-40', rut: '24.141.414-2', nombre: 'Constanza', apellido: 'Godoy', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-41', rut: '24.252.525-3', nombre: 'Liam', apellido: 'Pino', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-42', rut: '24.363.636-4', nombre: 'Pía', apellido: 'Araneda', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-43', rut: '24.474.747-5', nombre: 'Bastián', apellido: 'Toledo', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-44', rut: '24.585.858-6', nombre: 'Samantha', apellido: 'Fierro', nivel: 'NIVEL_MEDIO_MENOR' },
  { id: 'MM-45', rut: '24.696.969-7', nombre: 'Samuel', apellido: 'Leal', nivel: 'NIVEL_MEDIO_MENOR' },

  // --- MEDIO MAYOR (15) ---
  { id: 'MMY-46', rut: '23.707.070-8', nombre: 'Cristian', apellido: 'Arancibia', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-47', rut: '23.818.181-9', nombre: 'Laura', apellido: 'Miranda', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-48', rut: '23.929.292-0', nombre: 'Matías', apellido: 'Valenzuela', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-49', rut: '23.030.303-1', nombre: 'Victoria', apellido: 'Yáñez', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-50', rut: '23.151.515-2', nombre: 'Gabriel', apellido: 'Osorio', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-51', rut: '23.262.626-3', nombre: 'Dominga', apellido: 'Becerra', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-52', rut: '23.373.737-4', nombre: 'Sebastián', apellido: 'Bustos', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-53', rut: '23.484.848-5', nombre: 'Rocío', apellido: 'Varela', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-54', rut: '23.595.959-6', nombre: 'Emiliano', apellido: 'Saavedra', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-55', rut: '23.606.060-7', nombre: 'Paz', apellido: 'Albornoz', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-56', rut: '23.717.171-8', nombre: 'Nicolás', apellido: 'Parra', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-57', rut: '23.828.282-9', nombre: 'Magdalena', apellido: 'Palma', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-58', rut: '23.939.393-K', nombre: 'Ian', apellido: 'Jaramillo', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-59', rut: '23.040.404-1', nombre: 'Colomba', apellido: 'Urrutia', nivel: 'NIVEL_MEDIO_MAYOR' },
  { id: 'MMY-60', rut: '23.161.616-2', nombre: 'Franco', apellido: 'Guzmán', nivel: 'NIVEL_MEDIO_MAYOR' }
];

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

  // useEffect(() => {
  //   const cargarDatos = async () => {
  //     try {
  //       const data = await getEstudiantes();
  //       setEstudiantes(data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   cargarDatos();
  // }, []);

  useEffect(() => {
    // Simulamos que el servidor tarda 1 segundo en responder
    setTimeout(() => {
      setEstudiantes(datosPruebaEstudiantes); 
      setLoading(false);
    }, 1000);
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

  // if (loading) return <div className=" flex items-center justify-center font-bold text-gray-400">Cargando nómina...</div>;

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col animate-in fade-in duration-500 overflow-hidden">
      
      {/* HEADER COMPACTO */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
             Experiencias Pedagógicas
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Hospital San José de Melipilla</p>
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
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 shrink-0">Datos Actividad</h3>
            
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