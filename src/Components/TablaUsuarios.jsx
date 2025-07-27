import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "../Styles/VerUsuarios/tablaUsuarios.css";

export default function TabalUsuarios({ usuarios, handleEditar, handleEliminar }) {
  const [filtro, setFiltro] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("nombre");

  const usuariosFiltrados = usuarios.filter((usuario) => {
    if (!filtro) return true;
    const valorCampo = usuario[campoFiltro]?.toLowerCase() || "";
    return valorCampo === filtro.toLowerCase(); // Coincidencia exacta
  });

  const handleBorrarFiltro = () => {
    setFiltro("");
  };

  return (
    <div className="tablaUsuarios">
      {/* Filtro separado en Paper */}
      <Paper elevation={2} style={{ padding: "16px", marginBottom: "16px" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Campo select */}
          <Grid item xs={12} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-campo-label">Buscar por</InputLabel>
              <Select
                labelId="select-campo-label"
                value={campoFiltro}
                label="Buscar por"
                onChange={(e) => setCampoFiltro(e.target.value)}
              >
                <MenuItem value="nombre">Nombre</MenuItem>
                <MenuItem value="cedula">Cédula</MenuItem>
                <MenuItem value="correo">Correo</MenuItem>
                <MenuItem value="telefono">Teléfono</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Campo de texto */}
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              label={`Buscar ${campoFiltro}`}
              variant="outlined"
              size="small"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              fullWidth
            />
          </Grid>

          {/* Botón de borrar */}
          <Grid item xs={12} sm={3} md={3}>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleBorrarFiltro}
            >
              Borrar filtro
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Cédula</strong></TableCell>
              <TableCell><strong>Correo</strong></TableCell>
              <TableCell><strong>Teléfono</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuariosFiltrados.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.cedula}</TableCell>
                <TableCell>{usuario.correo}</TableCell>
                <TableCell>{usuario.telefono}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditar(usuario)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      color="error"
                      onClick={() => handleEliminar(usuario.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {usuariosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No se encontró ningún usuario con ese {campoFiltro}.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
