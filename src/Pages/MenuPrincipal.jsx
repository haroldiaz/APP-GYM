import React from "react";

import Navbar from "../Components/NavBar";
import '../Styles/MenuPrincipal.css'
import { useNavigate } from "react-router-dom";
export default function MenuPrincipal(){
    
    const navigate = useNavigate();
    
    const handleNavegar = () => {
        navigate("/RegistrarUsuarios");
    };
    const handleNavegarUsuarios = () => {
        navigate("/VerUsuarios");
    };
    return (
        <div>
            <Navbar/>
            <div>
              <div className="card-pages" onClick={handleNavegarUsuarios} >
                 <h3>Ver Usuarios</h3>
              </div>
              <div className="card-pages" onClick={handleNavegar} >
                 <h3>Registro Usuarios</h3>
              </div>
            </div>
        </div>
    );
};