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
                <form action="">
                    <h1>Login</h1>
                    <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    />
                    <TextField
                    label="Contrasenia"
                    variant="outlined"
                    fullWidth
                    />
                    <Button 
                    variant="contained" 
                    type="submit"
                    onClick={handleMenuPrincipal}>
                        Iniciar Sesion
                    </Button>
                </form>
                  
            </div>

        </div>
    );
};