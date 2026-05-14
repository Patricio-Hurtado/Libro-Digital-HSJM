import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Identificacion from './pages/Identificacion.jsx';
import NuevoEstudiante from './pages/NuevoEstudiante.jsx';
import Asistencia from './pages/Asistencia.jsx';
import Planificacion from './pages/Planificacion.jsx';
import Anecdotas from './pages/Anecdotas.jsx';
import DetalleParvulo from './components/DetalleParvulo.jsx';
import Bitacora from './pages/Bitacora';
import PautaEvaluacion from './pages/PautaEvaluacion';
import PanelDirectivo from './pages/PanelDirectivo';
import RegistroHistorial from './pages/RegistroHistorial.jsx';


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
          <Route path="bitacora" element={<Bitacora />} />
          <Route path="registro-historico" element={<RegistroHistorial />} />
          <Route path="anecdotas" element={<Anecdotas />} />
          <Route path="/identificacion/:id" element={<DetalleParvulo />} />
          <Route path="pauta-evaluacion" element={<PautaEvaluacion />} />
          <Route path="panel-directivo" element={<PanelDirectivo />} />
        </Route>

        {/* Captura cualquier ruta inexistente y manda al login o 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;