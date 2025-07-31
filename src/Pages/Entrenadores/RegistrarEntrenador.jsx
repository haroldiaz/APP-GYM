import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import '../../Styles/RegistrarUsuarios/usuarios.css';
import axios from 'axios';
import Navbar from "../../Components/NavBar";

export default function RegistrarEntrenadores() {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [cargando, setCargando] = useState(false);

  const validarFormulario = () => {
    if (!nombre || !cedula || !correo || !telefono || !especialidad || !experiencia) {
      alert("⚠️ Todos los campos son obligatorios.");
      return false;
    }

    if (!/^\d+$/.test(cedula)) {
      alert("❌ La cédula debe contener solo números.");
      return false;
    }

    if (!/^\d{7,10}$/.test(telefono)) {
      alert("❌ El teléfono debe contener solo números (7 a 10 dígitos).");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      alert("❌ El correo no es válido.");
      return false;
    }

    return true;
  };

  const crearEntrenador = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const fechaActual = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

      const response = await axios.post("http://localhost:3001/api/entrenadores", {
        nombre,
        cedula,
        correo,
        telefono,
        especialidad,
        experiencia,
        fecha_ingreso: fechaActual
      });

      if (response.status === 201) {
        alert("✅ Entrenador registrado correctamente");

        // Limpiar los campos
        setNombre("");
        setCedula("");
        setCorreo("");
        setTelefono("");
        setEspecialidad("");
        setExperiencia("");
      } else {
        alert("⚠️ No se pudo registrar el Entrenador");
      }
    } catch (error) {
      console.error("❌ Error al crear el Entrenador:", error);
      alert("❌ Ocurrió un error al registrar el Entrenador.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <Navbar title="Registro Entrenadores" />
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
          <TextField
            label="Especialidad"
            variant="outlined"
            fullWidth
            margin="normal"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          />
          <TextField
            label="Experiencia"
            variant="outlined"
            fullWidth
            margin="normal"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={crearEntrenador}
            disabled={cargando}
            style={{ marginTop: "16px" }}
          >
            {cargando ? "Registrando..." : "Registrar Entrenador"}
          </Button>
        </form>
      </div>
    </div>
  );
}
