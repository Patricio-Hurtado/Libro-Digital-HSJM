import React, { useState } from 'react';
import { CheckCircle, XCircle, FileCheck, AlertTriangle } from 'lucide-react';

const Asistencia = () => {
  // Estado para la fecha
  const [fecha, setFecha] = useState('2026-03-26');

  const parvulosMock = [
    { id: 1, rut: '25.123.456-7', nombre: 'Sofía Valentina Flores Pérez', manana: true, tarde: false, porcentaje: 92 },
    { id: 2, rut: '25.123.456-7', nombre: 'Tomás Andrés Vargas Soto', manana: true, tarde: false, porcentaje: 92 },
    { id: 3, rut: '25.123.456-7', nombre: 'Martina Ignacia Flores Pérez', manana: true, tarde: false, porcentaje: 92 },
  ];

  // Componente interno para los iconos de Check/X
  const StatusIcon = ({ present, onClick }) => {
    if (present) {
      return (
        <CheckCircle
          size={36}
          className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
          onClick={onClick}
        />
      );
    } else {
      return (
        <XCircle
          size={36}
          className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
          onClick={onClick}
        />
      );
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header de la vista */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Control de Asistencia Diaria</h2>
          <p className="text-sm text-gray-500">Registro obligatorio</p>
        </div>
        <div className="relative">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="form-input pr-10 border-gray-500 font-medium text-gray-700"
          />
        </div>
        <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-lg shadow-blue-100 transition-transform hover:scale-105 active:scale-95">
          <FileCheck size={20} strokeWidth={2.5} />
          <span className="font-semibold">Firmar y Guardar</span>
        </button>
      </div>

      {/* Cards de información cierre automatico */}
      <div className=" info-card bg-orange-100 mb-8">
        <div className=" p-3 bg-white rounded-xl shadow-sm">
          <AlertTriangle className="text-orange-600" size={24} />
        </div>
        <div>
          <h4 className="font-bold text-sm text-orange-950">Cierre diario automático</h4>
          <p className="text-xs text-orange-800">
            El sistema registrará automáticamente los datos no ingresados como inasistencia a las 23:59 hrs.
            Recuerde <span className="font-bold">guardar los cambios</span> antes del término de su jornada laboral.
          </p>
        </div>
      </div>

      {/* TABLA DE ASISTENCIA */}
      <div className=" overflow-x-auto border border-gray-300 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="p-4 font-semibold">Parvulo</th>
              <th className="p-4 font-semibold text-center w-48">Jornada Mañana</th>
              <th className="p-4 font-semibold text-center w-48">Jornada Tarde</th>
              <th className="p-4 font-semibold hidden md:table-cell">Asistencia Mes %</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm divide-gray-50">
            {parvulosMock.map((parvulo) => (
              <tr key={parvulo.id} className="hover:bg-blue-50/40 transition-colors group">
                {/* Nombre y RUT */}
                <td className="p-4">
                  <div className=" font-semibold text-gray-900">{parvulo.nombre}</div>
                  <div className="text-xs font-medium text-gray-600 mt-1">{parvulo.rut}</div>
                </td>

                {/* Jornada Mañana */}
                <td className="p-5">
                  <div className="flex justify-center items-center h-full">
                    <StatusIcon present={parvulo.manana} />
                  </div>
                </td>

                {/* Jornada Tarde */}
                <td className="p-5">
                  <div className="flex justify-center items-center h-full">
                    <StatusIcon present={parvulo.tarde} />
                  </div>
                </td>

                {/* Barra de Progreso del Mes */}
                <td className="p-5 w-56 hidden md:table-cell">
                  <div className="flex items-center gap-4">
                    {/* Contenedor de la barra gris */}
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                      {/* Barra verde dinámica */}
                      <div className="bg-green-500 h-full w-[92%] rounded-full shadow"></div>
                    </div>
                    {/* Porcentaje numérico */}
                    <span className="text-sm font-bold text-gray-700">
                      {parvulo.porcentaje}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Asistencia;