import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Identificacion from './pages/Identificacion.jsx';
import NuevoEstudiante from './pages/NuevoEstudiante.jsx';
import Asistencia from './pages/Asistencia.jsx';
import Planificacion from './pages/Planificacion.jsx';
import Evaluacion from './pages/Evaluacion.jsx';
import Anecdotas from './pages/Anecdotas.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DetalleParvulo from './components/DetalleParvulo.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de acceso (fuera del Layout principal) */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas con el Sidebar y Header del Layout */}
        <Route path="/" element={<Layout />}>
          {/* Al entrar a "/" te manda directo a la tabla */}
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="identificacion" element={<Identificacion />} />
          <Route path="nuevo-parvulo" element={<NuevoEstudiante />} />
          <Route path="asistencia" element={<Asistencia/>} />
          <Route path="planificacion" element={<Planificacion />} />
          <Route path="evaluacion" element={<Evaluacion />} />
          <Route path="anecdotas" element={<Anecdotas />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/identificacion/:id" element={<DetalleParvulo />} />
        </Route>

        {/* Captura cualquier ruta inexistente y manda al login o 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;