import React, { useState, useEffect } from "react";
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
  const [usuarios, setUsuarios] = useState([]);
  const [openEditar, setOpenEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch("http://localhost:3001/api/usuarios")
      .then((response) => response.json())
      .then((data) => {
        const listaUsuarios = data.map((u) => ({
          id: u.id,
          nombre: u.nombre,
          cedula: u.cedula,
          correo: u.correo,
          telefono: u.telefono,
        }));
        setUsuarios(listaUsuarios);
      })
      .catch((error) => {
        console.error("Error al cargar usuarios:", error);
      });
  };

  const handleEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setOpenEditar(true);
  };

  const handleCerrarDialogo = () => {
    setOpenEditar(false);
    setUsuarioEditando(null);
  };

  const handleGuardarCambios = () => {
    fetch(`http://localhost:3001/api/usuarios/${usuarioEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: usuarioEditando.nombre,
        cedula:usuarioEditando.cedula,
        correo: usuarioEditando.correo,
        telefono: usuarioEditando.telefono,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar usuario");
        }
        return res.json();
      })
      .then((data) => {
        // Reemplaza usuario actualizado en el estado
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((u) =>
            u.id === data.usuario.id ? data.usuario : u
          )
        );
        handleCerrarDialogo();
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el usuario.");
      });
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (confirmacion) {
      fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al eliminar el usuario");
          }
          setUsuarios((prev) => prev.filter((u) => u.id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
          alert("Hubo un error al eliminar el usuario.");
        });
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
                <TableCell><strong>Cédula</strong></TableCell>
                <TableCell><strong>Correo</strong></TableCell>
                <TableCell><strong>Teléfono</strong></TableCell>
                <TableCell><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
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
              {usuarios.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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
            label="Cedula"
            fullWidth
            value={usuarioEditando?.cedula || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, cedula: e.target.value })
            }
          />
           <TextField
            margin="dense"
            label="Correo"
            fullWidth
            value={usuarioEditando?.correo || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, correo: e.target.value })
            }
          />
           <TextField
            margin="dense"
            label="Teléfono"
            fullWidth
            value={usuarioEditando?.telefono || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, telefono: e.target.value })
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
