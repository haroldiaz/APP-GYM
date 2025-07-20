import React, { useState } from "react";
import Banner from "../Components/Banner";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "../Styles/VerUsuarios/tablaUsuarios.css";

export default function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan", edad: 25 },
    { id: 2, nombre: "María", edad: 30 },
    { id: 3, nombre: "Carlos", edad: 28 },
    { id: 4, nombre: "Lucía", edad: 22 },
    { id: 5, nombre: "Pedro", edad: 35 },
  ]);

  const [openEditar, setOpenEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setOpenEditar(true);
  };

  const handleCerrarDialogo = () => {
    setOpenEditar(false);
    setUsuarioEditando(null);
  };

  const handleGuardarCambios = () => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) =>
        u.id === usuarioEditando.id ? usuarioEditando : u
      )
    );
    handleCerrarDialogo();
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (confirmacion) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <Banner texto={"Tabla Usuarios"} />
      <div className="tablaUsuarios">
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Edad</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.edad}</TableCell>
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
              {usuarios.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No hay usuarios disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal de edición */}
      <Dialog open={openEditar} onClose={handleCerrarDialogo}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            fullWidth
            value={usuarioEditando?.nombre || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Edad"
            type="number"
            fullWidth
            value={usuarioEditando?.edad || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, edad: parseInt(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarDialogo} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleGuardarCambios} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
