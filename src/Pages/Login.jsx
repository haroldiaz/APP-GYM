import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper
} from "@mui/material";

export default function Login() {
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Iniciar Sesión
          </Typography>

          <TextField
            label="Usuario"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            fullWidth
          />

          {error && (
            <Typography color="error" variant="body2" textAlign="center">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 1 }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
