import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import '../Styles/Login/login.css'
export default  function Login() {

    const navigate = useNavigate();

    const handleMenuPrincipal = () => {
			 navigate("/menu");
    }
    return (
        <div>
            <div className="container-form-login">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleMenuPrincipal();
                    }}>
                    <h1>Login</h1>
                    <TextField
                    label="Nombre"
                    variant="outlined"
                    
                    />
                    <TextField
                    label="Contrasenia"
                    variant="outlined"
                    
                    />
                    <Button 
                    variant="contained" 
                    type="submit">
                        Iniciar Sesion
                    </Button>
                </form>
                  
            </div>

        </div>
    );
};