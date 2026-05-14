import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { BookOpen, Mail, Lock, LogIn, AlertTriangle, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.nombre);
      localStorage.setItem('userRole', user.role);
      if (user.fotoUrl) {
        localStorage.setItem('userFoto', user.fotoUrl);
      }

      setIsLoading(false);
      navigate('/identificacion');
    } catch (err) {
      setIsLoading(false);
      const message = err.response?.data?.message || 'Error al iniciar sesión. Por favor, verifica tu credenciales o la conexión.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6 font-sans antialiased animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-300 p-8 md:p-10">
        {/* Sección del Logo */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-5">
            <BookOpen size={36} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tighter">
            EduBook
          </h1>
          <p className="text-xs uppercase tracking-widest text-blue-500 font-semibold mt-1">
            Libro de clases digital
          </p>
          <p className="text-sm text-gray-500 mt-3 max-w-xs">
            Ingresa tus credenciales para acceder al sistema de Melipilla.
          </p>
        </div>

        {error && (
          <div className="error-message mb-6">
            <AlertTriangle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Campo Email/RUT */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700 pl-1" htmlFor="email">
              Correo electrónico o RUT
            </label>
            <div className="form-input-container">
              <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              <input 
                id="email"
                type="email" 
                placeholder="ej: educadora@melipilla.cl" 
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                Contraseña
              </label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="form-input-container">
              <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Botón de Acción */}
          <button 
            type="submit" 
            className={`btn-primary w-full p-3.5 rounded-xl text-base shadow-lg shadow-blue-100 mt-8 
                       ${isLoading ? 'btn-loading' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verificando...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* Pie de página */}
        <div className="text-center mt-10 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            ¿Problemas para acceder? Contacta al soporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;