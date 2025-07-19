import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function HistorialAsistencias() {
  const [form, setForm] = useState({
    fecha: "",
    horaEntrada: "",
    horaSalida: "",
    tipoRegistro: "",
    ubicacion: "",
    metodo: "",
    observaciones: "",
    estado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de asistencia:", form);
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Registro de Asistencia
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Hora de entrada"
            type="time"
            name="horaEntrada"
            value={form.horaEntrada}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Hora de salida"
            type="time"
            name="horaSalida"
            value={form.horaSalida}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Tipo de registro"
            name="tipoRegistro"
            value={form.tipoRegistro}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="entrada">Entrada</MenuItem>
            <MenuItem value="salida">Salida</MenuItem>
            <MenuItem value="ausente">Ausente</MenuItem>
            <MenuItem value="remoto">Remoto</MenuItem>
            <MenuItem value="permiso">Permiso</MenuItem>
          </TextField>

          <TextField
            label="Ubicación o sede"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            required
          />

          <TextField
            label="Dispositivo o método"
            name="metodo"
            value={form.metodo}
            onChange={handleChange}
            required
          />

          <TextField
            label="Observaciones"
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <TextField
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="asistio">Asistió</MenuItem>
            <MenuItem value="ausente">Ausente</MenuItem>
            <MenuItem value="tarde">Tarde</MenuItem>
            <MenuItem value="justificado">Justificado</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" type="submit">
            Registrar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
