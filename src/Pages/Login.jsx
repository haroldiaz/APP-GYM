import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import '../Styles/Login/login.css'
export default  function Login() {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !contrasenia) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        setError("");
        navigate("/menu");
    }

    return (
        <div>
            <div className="container-form-login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <TextField
                    label="Nombre"
                    variant="outlined"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                    <TextField
                    label="Contrasenia"
                    variant="outlined"
                    type="password"
                    value={contrasenia}
                    onChange={e => setContrasenia(e.target.value)}
                    fullWidth
                    margin="normal"
                    />
                    {error && <div style={{color: "red"}}>{error}</div>}
                    <Button 
                    variant="contained" 
                    type="submit"
                    fullWidth
                    style={{marginTop: "16px"}}
                    >
                        Iniciar Sesion
                    </Button>
                </form>
            </div>
        </div>
    );
};