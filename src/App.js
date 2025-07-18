
import './Styles/App.css';
import Login from './Pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPrincipal from './Pages/MenuPrincipal.jsx';
import RegistrarUsuarios from './Pages/RegistrarUsuarios.jsx';
function App() {
  return (
   <div className="App">
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<MenuPrincipal />} />
      <Route path="/RegistrarUsuarios" element={<RegistrarUsuarios />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
