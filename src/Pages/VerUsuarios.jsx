import React from "react";
import Banner from "../Components/Banner";

// Importa componentes de Material UI
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";

import "../Styles/VerUsuarios/tablaUsuarios.css"; // Importamos CSS externo

export default function VerUsuarios() {
  const datos = [
    { id: 1, nombre: "Juan", edad: 25 },
    { id: 2, nombre: "María", edad: 30 },
    { id: 3, nombre: "Carlos", edad: 28 },
    { id: 4, nombre: "Lucía", edad: 22 },
    { id: 5, nombre: "Pedro", edad: 35 },
  ];

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
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.edad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
