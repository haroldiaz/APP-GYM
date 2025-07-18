import React from "react";
import { TextField,Button } from "@mui/material";
import { useState } from "react";
import '../Styles/usuarios.css'
export default function GestionUsuarios(){
    const [nombre,setNombre] = useState("");
    const [cedula,setCedula] = useState("");
    const [correo,setCorreo] = useState("");

    
    const mostrarNombre = () => {
        console.log(nombre);
    }
    return(
        <div>
            <div className="banner">
                <h2>Registrar Usuario</h2>
            </div>
            <div>
                <form action="" className="form-usuarios">
                    <TextField 
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        />
                        
                    <TextField 
                        label="Cedula"
                        variant="outlined"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        />
                    <TextField 
                        label="Correo"
                        variant="outlined"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        />
                    <TextField 
                        label="Telefono"
                        variant="outlined"
                        />
                    <Button variant="contained" onClick={mostrarNombre}>
                        Registrar Usuario
                    </Button>
                </form>
            </div>
        </div>
    );
};