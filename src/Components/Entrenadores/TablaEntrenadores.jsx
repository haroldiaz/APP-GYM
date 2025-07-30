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

import "../../Styles/VerUsuarios/tablaUsuarios.css";

export default function TablaEntrenadores({ entrenadores, handleEditar, handleEliminar }) {
  const [filtro, setFiltro] = useState("");
  const [campoFiltro, setCampoFiltro] = useState("nombre");
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 5;

  // Filtrado
  const entrenadoresFiltrados = entrenadores.filter((entrenador) => {
    if (!filtro) return true;
    const valorCampo = entrenadores[campoFiltro]?.toLowerCase() || "";
    return valorCampo === filtro.toLowerCase(); // puedes cambiar a includes() si quieres coincidencias parciales
  });

  // Paginación
  const totalPaginas = Math.ceil(entrenadoresFiltrados.length / porPagina);
  const inicio = (paginaActual - 1) * porPagina;
  const usuariosPaginados = entrenadoresFiltrados.slice(inicio, inicio + porPagina);

  const handleBorrarFiltro = () => {
    setFiltro("");
    setPaginaActual(1);
  };

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="tablaUsuarios">
      {/* Filtro */}
      <Paper elevation={2} style={{ padding: "16px", marginBottom: "16px" }}>
        <Grid container spacing={2} alignItems="center">
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
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              label={`Buscar ${campoFiltro}`}
              variant="outlined"
              size="small"
              value={filtro}
              onChange={(e) => {
                setFiltro(e.target.value);
                setPaginaActual(1); // reset pag
              }}
              fullWidth
            />
          </Grid>
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
            {usuariosPaginados.map((usuario) => (
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
            {usuariosPaginados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No se encontró ningún Entrenador con ese {campoFiltro}.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <Paper elevation={2} style={{ padding: "16px", marginTop: "16px", display: "flex", justifyContent: "center", gap: "16px", alignItems: "center" }}>
          <Button
            variant="contained"
            disabled={paginaActual === 1}
            onClick={() => cambiarPagina(paginaActual - 1)}
          >
            Anterior
          </Button>
          <span>Página {paginaActual} de {totalPaginas}</span>
          <Button
            variant="contained"
            disabled={paginaActual === totalPaginas}
            onClick={() => cambiarPagina(paginaActual + 1)}
          >
            Siguiente
          </Button>
        </Paper>
      )}
    </div>
  );
}
