import {   BookOpen, CheckCircle2, Users } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Resumen semanal</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Nivel: medio mayor | Eduacadora: Marta Valenzuela</p>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Card Matricula */}
                <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start p-4 md:p-6 min-h-35 md:min-h-37.5 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <Users size={44} className="sm:w-13.75 sm:h-13.75" />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Matrícula Total</p>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-800">10</h3>
                    </div>
                </div>

                {/* Card Asistencia */}
                <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start p-4 md:p-6 min-h-35 md:min-h-37.5 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <CheckCircle2 size={44} className="sm:w-13.75 sm:h-13.75" />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asistencia Hoy</p>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-800">92%</h3>
                    </div>
                </div>

                {/* Card Pendientes */}
                <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start p-4 md:p-6 min-h-35 md:min-h-37.5 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                    <div className="w-20 h-20 sm:w-22 sm:h-22 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0 mb-4 sm:mb-0 sm:mr-4">
                        <BookOpen size={44} className="sm:w-13.75 sm:h-13.75" />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Planes pendientes</p>
                        <h3 className="text-2xl sm:text-3xl font-black text-gray-800">1</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;