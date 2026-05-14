import React, { useState, useEffect } from 'react';
import { Save, BarChart3, AlertCircle, CheckCircle2, UserCircle, FileDown, Loader2 } from 'lucide-react';
import { getEstudiantes } from '../services/estudianteService';
import { saveEvaluacion } from '../services/evaluacionService';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import logoHospital from '../assets/logo-hospital.png';
import logoJardin from '../assets/logo-salacuna.png';

const matrizEvaluacion = {
  "Desarrollo Personal": ["Identidad", "Autonomía", "Convivencia"],
  "Comunicación Integral": ["Lenguaje Verbal", "Lenguajes Artísticos"],
  "Entorno": ["Exploración del Entorno Natural", "Identidad Cultural", "Pensamiento Matemático"],
  "Sello Institucional": ["Alimentación Consciente", "Higiene y Autocuidado", "Actividad Física", "Conciencia Corporal", "Cuidado del Entorno"]
};

const PautaEvaluacion = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
  const [tipoEvaluacion, setTipoEvaluacion] = useState('Trimestral');
  const [pestanaActiva, setPestanaActiva] = useState('Desarrollo Personal');
  const [observaciones, setObservaciones] = useState('');
  const [notas, setNotas] = useState({}); 

  const estudianteObj = estudiantes.find(e => e.id === estudianteSeleccionado);

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

      doc.addImage(logoHospital, 'PNG', 14, 10, 40, 25); // Logo Izquierda
      doc.addImage(logoJardin, 'PNG', 160, 10, 40, 25);  // Logo Derecha
       // 2. Título y Encabezado
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text("Informe Pedagógico al Hogar", 14, 40);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100);
      doc.text("Hospital San José de Melipilla - Aula Hospitalaria", 14, 46);

      // 3. Datos del Alumno
      doc.setTextColor(0);
      doc.setFontSize(11);
      doc.text(`Párvulo: ${estudianteObj.nombre} ${estudianteObj.apellido}`, 14, 60);
      doc.text(`RUT: ${estudianteObj.rut}`, 14, 66);
      doc.text(`Nivel: ${estudianteObj.nivel}`, 120, 60);
      doc.text(`Periodo: ${tipoEvaluacion}`, 120, 66);

      // 4. Preparar datos para la tabla
      const filasDeTabla = [];
      Object.entries(matrizEvaluacion).forEach(([area, nucleos]) => {
        filasDeTabla.push([
          { content: area.toUpperCase(), colSpan: 2, styles: { fillColor: [235, 245, 255], textColor: [40, 40, 40], fontStyle: 'bold' } }
        ]);
        nucleos.forEach(nucleo => {
          filasDeTabla.push([nucleo, notas[nucleo] || '-']);
        });
      });

      // 5. Tabla
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

  if (loading) return <div className="h-[calc(100vh-240px)] flex items-center justify-center font-bold text-gray-400">Cargando registros del HSJM...</div>;

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col animate-in fade-in duration-500 overflow-hidden relative">
      
      {/* HEADER COMPACTO */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
             Evaluación Pedagógica
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Hospital San José de Melipilla</p>
        </div>
        <div className="flex items-center gap-3">
          {mensaje && (
             <div className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 ${mensaje.tipo === 'exito' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
               {mensaje.tipo === 'exito' ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>} {mensaje.texto}
             </div>
          )}
          
          <button 
            onClick={generarPDF} 
            disabled={!estudianteSeleccionado || generandoPDF}
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50"
          >
            {generandoPDF ? <Loader2 size={16} className="animate-spin text-gray-500" /> : <FileDown size={16} className="text-red-500" />}
            {generandoPDF ? 'Generando...' : 'Descargar PDF'}
          </button>
          
          <button onClick={handleGuardar} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow hover:bg-blue-700 active:scale-95 transition-all">
            <Save size={16} /> Guardar
          </button>
        </div>
      </div>

      {/* DISEÑO A 2 COLUMNAS */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="lg:w-1/3 flex flex-col shrink-0 min-h-0">
          <div className="p-1 flex flex-col flex-1 min-h-0">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 shrink-0">Datos del Párvulo</h3>
            
            <div className="space-y-4 flex flex-col flex-1 min-h-0">
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Seleccionar Estudiante</label>
                  <div className="relative">
                    <select 
                      value={estudianteSeleccionado} 
                      onChange={(e) => setEstudianteSeleccionado(e.target.value)} 
                      className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl text-sm font-bold text-gray-700 bg-white shadow-sm"
                    >
                      <option value="">Seleccione un alumno de la nómina...</option>
                      {estudiantes.map(est => (
                        <option key={est.id} value={est.id}>{est.nombre} {est.apellido} - {est.rut}</option>
                      ))}
                    </select>
                  </div>
              </div>
              
              <div className="shrink-0">
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Periodo de Evaluación</label>
                  <select value={tipoEvaluacion} onChange={(e) => setTipoEvaluacion(e.target.value)} className="w-full p-3 border border-gray-200 focus:border-blue-500 outline-none rounded-xl text-sm bg-white shadow-sm">
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
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

        <div className="lg:w-2/3 flex flex-col min-h-0 pt-1">
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
              <div className="bg-gray-50/80 p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
                 <h3 className="font-bold text-gray-700 text-sm">{pestanaActiva}</h3>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">L = Logrado | EP = En Proceso | NO = No Observado</span>
              </div>
              
              <div className="overflow-y-auto custom-scrollbar flex-1 p-2">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-gray-100">
                    {matrizEvaluacion[pestanaActiva].map(nucleo => (
                      <tr key={nucleo} className="hover:bg-gray-50/50">
                        <td className="p-4">
                          <div className="font-bold text-gray-800 text-sm">{nucleo}</div>
                        </td>
                        <td className="p-4 flex justify-end gap-2">
                          {['L', 'EP', 'NO'].map(n => (
                            <button
                              key={n}
                              onClick={() => handleNota(nucleo, n)}
                              className={`w-12 h-10 rounded-xl font-bold text-xs transition-all ${
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
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400">
               <UserCircle size={48} className="mb-2 text-gray-300" />
               <p className="font-bold">Selecciona un estudiante</p>
               <p className="text-sm">Para comenzar la evaluación pedagógica</p>
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