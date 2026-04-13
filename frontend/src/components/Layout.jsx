import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  UserCheck,
  Calendar,
  ClipboardList,
  BarChart3,
  BookOpen,
  LogOut,
  UserCircle,
  Camera
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PhotoUploadModal from './PhotoUploadModal';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [usuario, setUsuario] = useState({ nombre: 'Usuario', role: 'Invitado', foto: null, id: null });

  // Cargar datos de sesión desde localStorage al montar
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    const userFoto = localStorage.getItem('userFoto');
    if (userName || userRole || userFoto) {
      setUsuario({ 
        id: userId,
        nombre: userName || 'Usuario', 
        role: userRole || 'Invitado',
        foto: userFoto ? `http://localhost:3000${userFoto}` : null
      });
    }
  }, []);

  const routeTitles = {
    '/identificacion': 'Identificación',
    '/asistencia': 'Asistencia diaria',
    '/planificacion': 'Planificación',
    '/evaluacion': 'Evaluación',
    '/anecdotas': 'Anécdotas y vida',
    '/nuevo-parvulo': 'Nuevo párvulo',
    '/dashboard': 'Dashboard',
  };

  const currentTitle = routeTitles[location.pathname] || 'Panel';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Identificación', icon: <UserCheck size={20} />, path: '/identificacion' },
    { name: 'Asistencia diaria', icon: <Calendar size={20} />, path: '/asistencia' },
    { name: 'Planificación', icon: <ClipboardList size={20} />, path: '/planificacion' },
    { name: 'Evaluación', icon: <BarChart3 size={20} />, path: '/evaluacion' },
    { name: 'Anécdotas y vida', icon: <BookOpen size={20} />, path: '/anecdotas' },
    { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/dashboard' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* SIDEBAR (Escritorio: fijo | Móvil: absolute/hidden) */}
      <aside className={`
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transition-transform duration-300 md:relative md:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-blue-900">EduBook</h1>
              <p className="text-xs text-gray-500">Educación parvularia</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-xl transition
                  ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.icon}</span> {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Perfil al pie del Sidebar */}
        <div className="absolute bottom-0 w-full p-6 border-t bg-gray-100">
          <div 
            className="group relative cursor-pointer"
            onClick={() => setIsPhotoModalOpen(true)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                {usuario.foto ? (
                  <img 
                    src={usuario.foto} 
                    alt={usuario.nombre}
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-200 flex-shrink-0"
                  />
                ) : (
                  <UserCircle size={35} className="flex items-center justify-center text-lg flex-shrink-0" />
                )}
                <Camera 
                  size={14} 
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{usuario.nombre}</p>
                <p className="text-xs text-gray-500">{usuario.role}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600">
            <LogOut />Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header móvil para abrir el menú */}
        <header className="md:hidden bg-white p-4 border-b flex justify-between items-center">
          <span className="font-bold text-blue-900">EduBook</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-blue-900">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {/* El Contenedor que cambia (Registro de Identificación, etc) */}
        <main className="p-4 md:p-10 overflow-y-auto">
          {/* Breadcrumb */}
          <nav className="text-xs text-gray-400 mb-4">
            Libro de clases digital / <span className="text-gray-600 font-medium">{currentTitle}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6  ">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay para cerrar menú en móvil al hacer click fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Modal para cambiar foto de perfil */}
      <PhotoUploadModal 
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        userId={usuario.id}
        onPhotoUpdated={(fotoURL) => {
          setUsuario(prev => ({
            ...prev,
            foto: `http://localhost:3000${fotoURL}`
          }));
        }}
      />
    </div>
  );
};

export default Layout;