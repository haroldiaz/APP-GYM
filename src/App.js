
import './Styles/App.css';
import Login from './Pages/Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
   <div className="App">
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  </div>
  );
}

export default App;
