import React from "react";
import { Button } from "@mui/material";
import Navbar from "../Components/NavBar";
import '../Styles/MenuPrincipal.css'
import { useNavigate } from "react-router-dom";
export default function MenuPrincipal(){
    
    const navigate = useNavigate();
    
    const handleNavegar = () => {
        navigate("/RegistrarUsuarios");
    };
    return (
        <div>
            <Navbar></Navbar>
            <div>
              <div className="card-pages" onClick={handleNavegar} >
                 <h3>Registro Usuarios</h3>
              </div>
            </div>
        </div>
    );
};