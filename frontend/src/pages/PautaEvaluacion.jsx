import React, { useState, useEffect } from 'react';
import { Save, BarChart3, AlertCircle, CheckCircle2, UserCircle, FileDown, Loader2 } from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';
import { saveEvaluacion } from '../services/evaluacionService';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import logoHospital from '../assets/logo-hospital.png';
import logoJardin from '../assets/logo-salacuna.png';

// --- ESTRUCTURA DEL EXCEL DEL JEFE ---
const matrizEvaluacion = {
  "Desarrollo Personal": ["Identidad", "Autonomía", "Convivencia"],
  "Comunicación Integral": ["Lenguaje Verbal", "Lenguajes Artísticos"],
  "Entorno": ["Exploración del Entorno Natural", "Identidad Cultural", "Pensamiento Matemático"],
  "Sello Institucional": ["Alimentación Consciente", "Higiene y Autocuidado", "Actividad Física", "Conciencia Corporal", "Cuidado del Entorno"]
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
const PautaEvaluacion = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  
  const [generandoPDF, setGenerandoPDF] = useState(false);

  // NUEVO: Estado para el filtro de nivel
  const [nivelFiltro, setNivelFiltro] = useState('TODOS');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
  const [tipoEvaluacion, setTipoEvaluacion] = useState('Trimestral');
  const [pestanaActiva, setPestanaActiva] = useState('Desarrollo Personal');
  const [observaciones, setObservaciones] = useState('');
  const [notas, setNotas] = useState({}); 

  // NUEVO: Lógica para filtrar estudiantes según el nivel seleccionado
  const estudiantesFiltrados = nivelFiltro === 'TODOS' 
    ? estudiantes 
    : estudiantes.filter(est => est.nivel === nivelFiltro);

  const estudianteObj = estudiantes.find(e => e.id === estudianteSeleccionado);


  useEffect(() => {
    // Simulamos que el servidor tarda 1 segundo en responder
    setTimeout(() => {
      setEstudiantes(datosPruebaEstudiantes); 
      setLoading(false);
    }, 1000);
  }, []);

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

  const handleNota = (nucleo, valor) => {
    setNotas(prev => ({ ...prev, [nucleo]: valor }));
  };

  const handleGuardar = async () => {
    if (!estudianteSeleccionado) {
      setMensaje({ tipo: 'error', texto: 'Debes seleccionar un estudiante primero.' });
      setTimeout(() => setMensaje(null), 3000);
      return;
    }

    const paquete = {
      tipo: tipoEvaluacion,
      estudianteId: estudianteSeleccionado,
      resultado: notas, 
      comentario: observaciones
    };

    try {
      await saveEvaluacion(paquete);
      setMensaje({ tipo: 'exito', texto: '¡Evaluación Pedagógica guardada con éxito!' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error al conectar con el servidor.' });
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  // --- GENERADOR DE PDF ---
  const generarPDF = () => {
    if (!estudianteObj) return;
    
    setGenerandoPDF(true);

    try {
      // 1. Crear el documento
      const doc = new jsPDF();

      doc.addImage(logoHospital, 'PNG', 14, 10, 40, 25); 
      doc.addImage(logoJardin, 'PNG', 160, 10, 40, 25);  
      
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text("Informe Pedagógico al Hogar", 14, 40);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100);
      doc.text("Hospital San José de Melipilla - Aula Hospitalaria", 14, 46);

      // 3. Datos del Alumno (También movidos hacia abajo)
      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.text(`Párvulo: ${estudianteObj.nombre} ${estudianteObj.apellido}`, 14, 60);
      doc.text(`RUT: ${estudianteObj.rut}`, 14, 66);
      doc.text(`Nivel: ${estudianteObj.nivel}`, 120, 60);
      doc.text(`Periodo: ${tipoEvaluacion}`, 120, 66);

      // 4. Construir las filas de la tabla
      const filasDeTabla = [];
      Object.entries(matrizEvaluacion).forEach(([area, nucleos]) => {
        filasDeTabla.push([
          { content: area.toUpperCase(), colSpan: 2, styles: { fillColor: [235, 245, 255], textColor: [40, 40, 40], fontStyle: 'bold' } }
        ]);
        nucleos.forEach(nucleo => {
          filasDeTabla.push([nucleo, notas[nucleo] || '-']);
        });
      });

      // 5. Tabla (Movida hacia abajo a la posición startY: 75)
      autoTable(doc, {
        startY: 75,
        head: [['Área de Desarrollo y Núcleos', 'Evaluación (L / EP / NO)']],
        body: filasDeTabla,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255 }, 
        styles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 140 },
          1: { cellWidth: 'auto', halign: 'center', fontStyle: 'bold' }
        }
      });

      // 6. Observaciones
      const dondeTerminoLaTabla = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text("Observaciones Cualitativas:", 14, dondeTerminoLaTabla);
      
      doc.setFont(undefined, 'normal');
      const textoDividido = doc.splitTextToSize(observaciones || 'La educadora no ha registrado observaciones adicionales en este periodo.', 180);
      doc.text(textoDividido, 14, dondeTerminoLaTabla + 7);

      // 7. Firmas 
      let firmasY = dondeTerminoLaTabla + 15 + (textoDividido.length * 5) + 30;
      if (firmasY > 270) {
        doc.addPage();
        firmasY = 40;
      }

      doc.line(30, firmasY, 80, firmasY);
      doc.text("Firma Educadora", 42, firmasY + 6);

      doc.line(130, firmasY, 180, firmasY);
      doc.text("Firma Dirección", 142, firmasY + 6);

      // 8. ¡Guardar y Descargar!
      doc.save(`Informe_${estudianteObj.nombre}_${estudianteObj.apellido}.pdf`);
      setMensaje({ tipo: 'exito', texto: '¡PDF descargado al instante!' });

    } catch (error) {
      console.error("Error exacto del PDF:", error);
      setMensaje({ tipo: 'error', texto: 'Hubo un error al crear el archivo.' });
    } finally {
      setGenerandoPDF(false);
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  // if (loading) return <div className="h-[calc(100vh-240px)] flex items-center justify-center font-bold text-gray-400">Cargando registros del HSJM...</div>;

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col animate-in fade-in duration-500 overflow-hidden relative">
      
      {/* HEADER RESPONSIVO: Pasa de fila en PC a columna en Celular */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 shrink-0 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
             Evaluación Pedagógica
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Hospital San José de Melipilla</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {mensaje && (
             <div className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {mensaje.tipo === 'exito' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>} {mensaje.texto}
             </div>
          )}
          
          <button 
            onClick={generarPDF} 
            disabled={!estudianteSeleccionado || generandoPDF}
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 w-full sm:w-auto"
          >
            {generandoPDF ? <Loader2 size={16} className="animate-spin text-gray-500" /> : <FileDown size={16} className="text-red-500" />}
            {generandoPDF ? 'Generando...' : 'Descargar PDF'}
          </button>
          
          <button onClick={handleGuardar} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition-all w-full sm:w-auto">
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>

      {/* DISEÑO A 2 COLUMNAS */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* COLUMNA IZQUIERDA: Formularios y Filtros */}
        <div className="lg:w-1/3 flex flex-col shrink-0 min-h-0">
          <div className="p-1 flex flex-col flex-1 min-h-0">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 shrink-0">Datos del Párvulo</h3>
            
            <div className="space-y-4 flex flex-col flex-1 min-h-0">
              
              {/* NUEVO FILTRO POR NIVEL */}
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Filtrar por Nivel</label>
                    <select 
                      value={nivelFiltro} 
                      onChange={(e) => {
                        setNivelFiltro(e.target.value);
                        setEstudianteSeleccionado(''); // 1. Suelta al alumno anterior
                        setNotas({});                  // 2. Limpia los botones L, EP, NO
                        setObservaciones('');          // 3. Borra el texto escrito
                      }} 
                      className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm"
                    >
                    <option value="TODOS">Todos los Niveles</option>
                    <option value="SALA_CUNA_MENOR">Sala Cuna Menor</option>
                    <option value="SALA_CUNA_MAYOR">Sala Cuna Mayor</option>
                    <option value="NIVEL_MEDIO_MENOR">Medio Menor</option>
                    <option value="NIVEL_MEDIO_MAYOR">Medio Mayor</option>
                  </select>
              </div>

              {/* SELECTOR DE ESTUDIANTE (Ahora usa estudiantesFiltrados) */}
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Seleccionar Estudiante</label>
                  <div className="relative">
                    <select 
                      value={estudianteSeleccionado} 
                      onChange={(e) => setEstudianteSeleccionado(e.target.value)} 
                      className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm"
                    >
                      <option value="">Seleccione un alumno...</option>
                      {estudiantesFiltrados.map(est => (
                        <option key={est.id} value={est.id}>{est.nombre} {est.apellido} - {est.rut}</option>
                      ))}
                    </select>
                  </div>
              </div>
              
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Periodo de Evaluación</label>
                  <select value={tipoEvaluacion} onChange={(e) => setTipoEvaluacion(e.target.value)} className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm">
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    {/* <option value="Anual">Anual</option> */}
                  </select>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0 pt-4">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Observaciones Generales (Reporte al Hogar)</label>
                  <textarea 
                    value={observaciones} 
                    onChange={(e) => setObservaciones(e.target.value)} 
                    className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl flex-1 resize-none text-sm shadow-sm" 
                    placeholder="Escriba aquí los comentarios cualitativos para la familia..." 
                  />
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Matriz de evaluación */}
        <div className="lg:w-2/3 flex flex-col min-h-0 pt-1 mt-6 lg:mt-0">
          <div className="flex overflow-x-auto custom-scrollbar border-b border-gray-200 mb-4 shrink-0">
            {Object.keys(matrizEvaluacion).map(pestana => (
              <button
                key={pestana}
                onClick={() => setPestanaActiva(pestana)}
                className={`px-4 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                  pestanaActiva === pestana 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {pestana}
              </button>
            ))}
          </div>

          {estudianteSeleccionado ? (
            <div className="border border-gray-200 rounded-2xl shadow-sm bg-white flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="bg-gray-50/80 p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center shrink-0 gap-2">
                 <h3 className="font-bold text-gray-700 text-sm">{pestanaActiva}</h3>
                 <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">L = Logrado | EP = En Proceso | NO = No Observado</span>
              </div>
              
              <div className="overflow-y-auto custom-scrollbar flex-1 p-1 sm:p-2">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-gray-100">
                    {matrizEvaluacion[pestanaActiva].map(nucleo => (
                      <tr key={nucleo} className="hover:bg-gray-50/50 flex flex-col sm:table-row">
                        <td className="p-3 sm:p-4 pb-1 sm:pb-4">
                          <div className="font-bold text-gray-800 text-sm">{nucleo}</div>
                        </td>
                        <td className="p-3 sm:p-4 pt-1 sm:pt-4 flex justify-start sm:justify-end gap-2">
                          {['L', 'EP', 'NO'].map(n => (
                            <button
                              key={n}
                              onClick={() => handleNota(nucleo, n)}
                              className={`w-10 sm:w-12 h-10 rounded-xl font-bold text-xs transition-all ${
                                notas[nucleo] === n 
                                  ? (n === 'L' ? 'bg-green-500 text-white shadow-sm scale-105' : n === 'EP' ? 'bg-amber-500 text-white shadow-sm scale-105' : 'bg-red-500 text-white shadow-sm scale-105') 
                                  : 'bg-gray-50 text-gray-400 border border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 p-6 text-center">
               <UserCircle size={48} className="mb-2 text-gray-300" />
               <p className="font-bold">Selecciona un estudiante</p>
               <p className="text-sm mt-1">Filtra por nivel y elige un alumno para comenzar</p>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}} />
    </div>
  );
};

export default PautaEvaluacion;