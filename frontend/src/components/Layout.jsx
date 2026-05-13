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
    // { name: 'Planificación', icon: <ClipboardList size={20} />, path: '/planificacion' },
    { name: 'Bitacora', icon: <ClipboardList size={20} />, path: '/bitacora' },
    // { name: 'Evaluación', icon: <BarChart3 size={20} />, path: '/evaluacion' },
    { name: 'Pauta Evaluación', icon: <BarChart3 size={20} />, path: '/pauta-evaluacion' },
    // { name: 'Anécdotas y vida', icon: <BookOpen size={20} />, path: '/anecdotas' },
    // { name: 'Dashboard', icon: <BarChart3 size={20} />, path: '/dashboard' },
    { name: 'Panel Directivo', icon: <BarChart3 size={20} />, path: '/panel-directivo' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <aside className={`
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-72 overflow-hidden rounded-r-3xl
        bg-white shadow-[8px_0_40px_rgba(15,23,42,0.12)] border-r border-slate-200
        transition-transform duration-300 xl:relative xl:translate-x-0
      `}>
        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                <BookOpen size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900">EduBook</h1>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Educación parvularia</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    group flex items-center gap-4 rounded-full px-4 py-3 text-sm font-medium
                    transition duration-300 ease-out
                    ${isActive
                      ? 'bg-blue-500 text-white shadow-[0_8px_24px_rgba(148,163,184,0.1)]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition group-hover:bg-slate-200">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-6 rounded-4xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
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
                      className="h-12 w-12 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <UserCircle size={28} />
                    </div>
                  )}
                  <Camera
                    size={14}
                    className="absolute bottom-0 right-0 rounded-full bg-slate-200 p-1 text-slate-700 opacity-0 transition group-hover:opacity-100"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{usuario.nombre}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{usuario.role}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
            >
              <LogOut />Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="xl:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center">
          <span className="font-bold text-slate-900">EduBook</span>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-slate-900">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        <main className="p-4 md:p-10 overflow-y-auto">
          <nav className="text-xs text-slate-500 mb-4">
            Libro de clases digital / <span className="text-slate-700 font-medium">{currentTitle}</span>
          </nav>

          <div className="bg-white rounded-4xl shadow-xl border border-slate-200 p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

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