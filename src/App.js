
import './Styles/App.css';
import Login from './Pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPrincipal from './Pages/MenuPrincipal.jsx';
import RegistrarUsuarios from './Pages/RegistrarUsuarios.jsx';
import VerUsuarios from './Pages/VerUsuarios.jsx';
import HistorialAsistencias from './Pages/HistorialAsistencias.jsx';
import VerEntrenadores from './Pages/VerEntrenadores.jsx';
import RegistrarEntrenador from './Pages/RegistrarEntrenador.jsx';
function App() {
  return (
   <div className="App">
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<MenuPrincipal />} />
      <Route path="/RegistrarUsuarios" element={<RegistrarUsuarios />} />
      <Route path="/VerUsuarios" element={<VerUsuarios />} />
      <Route path="/Historial" element={<HistorialAsistencias />} />
      <Route path="/VerEntrenadores" element={<VerEntrenadores />} />
      <Route path="/RegistrarEntrenador" element={<RegistrarEntrenador />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
