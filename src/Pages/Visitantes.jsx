import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Typography,
  Box
} from "@mui/material";
import Navbar from "../Components/NavBar";

export default function Visitantes() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    password: ""
  });

  // Cargar usuarios
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(data);
  }, []);

  const guardarLocal = (data) => {
    localStorage.setItem("usuarios", JSON.stringify(data));
    setUsuarios(data);
  };

  // ELIMINAR
  const eliminar = (cedula) => {
    const nuevos = usuarios.filter((u) => u.cedula !== cedula);
    guardarLocal(nuevos);
  };

  // EDITAR
  const editar = (usuario) => {
    setEditando(usuario.cedula);
    setForm(usuario);
  };

  const guardarEdicion = () => {
    const nuevos = usuarios.map((u) =>
      u.cedula === editando ? { ...form } : u
    );
    guardarLocal(nuevos);
    setEditando(null);
    setForm({ nombre: "", cedula: "", password: "" });
  };

  // CREAR
  const crear = () => {
    if (!form.nombre || !form.cedula || !form.password) return;

    const existe = usuarios.some((u) => u.cedula === form.cedula);
    if (existe) {
      alert("La cédula ya existe");
      return;
    }

    const nuevo = {
      ...form,
      fechaRegistro: new Date().toLocaleString()
    };

    guardarLocal([...usuarios, nuevo]);
    setForm({ nombre: "", cedula: "", password: "" });
  };

  return (
    <>
    <Navbar title="Visitantes" />
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Visitantes Registrados
        </Typography>

        {/* FORMULARIO CREAR / EDITAR */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <TextField
            label="Cédula"
            value={form.cedula}
            disabled={editando !== null}
            onChange={(e) => setForm({ ...form, cedula: e.target.value })}
          />
          <TextField
            label="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {editando ? (
            <Button variant="contained" onClick={guardarEdicion}>
              Guardar
            </Button>
          ) : (
            <Button variant="contained" onClick={crear}>
              Crear
            </Button>
          )}
        </Box>

        {/* TABLA */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Cédula</b></TableCell>
              <TableCell><b>Fecha Registro</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usuarios.map((u) => (
              <TableRow key={u.cedula}>
                <TableCell>{u.nombre}</TableCell>
                <TableCell>{u.cedula}</TableCell>
                <TableCell>{u.fechaRegistro}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => editar(u)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => eliminar(u.cedula)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
    </>
    
  );
}
