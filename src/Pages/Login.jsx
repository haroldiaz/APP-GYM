import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const navigate = useNavigate();

  // LOGIN
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // REGISTRO
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [error, setError] = useState("");
  const [modoRegistro, setModoRegistro] = useState(false);

  const getUsuarios = () => {
    const data = localStorage.getItem("usuarios");
    return data ? JSON.parse(data) : [];
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const usuarios = getUsuarios();
    const existe = usuarios.find(
      (u) => u.cedula === usuario && u.password === password
    );

    if (!existe) {
      setError("Credenciales incorrectas.");
      return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(existe));
    navigate("/menu");
  };

  // REGISTRO
  const handleRegister = () => {
    if (!nombre || !cedula || !passwordRegistro) {
      setError("Completa todos los campos.");
      return;
    }

    const usuarios = getUsuarios();
    const existe = usuarios.some((u) => u.cedula === cedula);

    if (existe) {
      setError("Ya existe un usuario con esa cédula.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      cedula,
      password: passwordRegistro,
      fechaRegistro: new Date().toLocaleString()
    };

    localStorage.setItem(
      "usuarios",
      JSON.stringify([...usuarios, nuevoUsuario])
    );

    setError("");
    setModoRegistro(false);
    setNombre("");
    setCedula("");
    setPasswordRegistro("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: "100%" }}>
        {!modoRegistro ? (
          // ================= LOGIN =================
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Iniciar Sesión
            </Typography>

            <TextField
              label="Cédula"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />

            <TextField
              label="Contraseña"
              type={showLoginPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowLoginPassword(!showLoginPassword)
                      }
                      edge="end"
                    >
                      {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained">
              Iniciar sesión
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setError("");
                setModoRegistro(true);
              }}
            >
              Registrar
            </Button>
          </Box>
        ) : (
          // ================= REGISTRO =================
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Registro
            </Typography>

            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <TextField
              label="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />

            <TextField
              label="Contraseña"
              type={showRegisterPassword ? "text" : "password"}
              value={passwordRegistro}
              onChange={(e) => setPasswordRegistro(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      edge="end"
                    >
                      {showRegisterPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            )}

            <Button variant="contained" onClick={handleRegister}>
              Guardar
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setError("");
                setModoRegistro(false);
              }}
            >
              Volver al login
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
