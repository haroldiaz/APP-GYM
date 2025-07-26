import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import '../Styles/usuarios.css';
import axios from 'axios';

export default function GestionUsuarios() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargando, setCargando] = useState(false);

  const crearUsuario = async () => {
    console.log("Enviando usuario:", { nombre, cedula, correo, telefono });
    setCargando(true);
    try {
        
      const response = await axios.post("http://localhost:3001/api/usuarios", {
        nombre,
        cedula,
        correo,
        telefono
      });

      if (response.status === 201) {
        alert("✅ Usuario registrado correctamente");
        console.log(response.data);

        // Limpiar los campos
        setNombre("");
        setCedula("");
        setCorreo("");
        setTelefono("");
      } else {
        alert("⚠️ No se pudo registrar el usuario");
      }
    } catch (error) {
      console.error("❌ Error al crear el usuario:", error);
      alert("❌ Ocurrió un error al registrar el usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <div className="banner">
        <h2>Registrar Usuario</h2>
      </div>
      <div>
        <form className="form-usuarios" onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Cédula"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <TextField
            label="Teléfono"
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={crearUsuario}
            disabled={cargando}
            style={{ marginTop: "16px" }}
          >
            {cargando ? "Registrando..." : "Registrar Usuario"}
          </Button>
        </form>
      </div>
    </div>
  );
}
