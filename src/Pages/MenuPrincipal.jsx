import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Components/NavBar";
import "../Styles/MenuPrincipal/MenuPrincipal.css";

export default function MenuPrincipal() {
  const navigate = useNavigate();
  const theme = useTheme();

  const stats = [
    {
      label: "Usuarios Ingresados",
      value: 124,
      icon: <GroupIcon color="primary" sx={{ fontSize: 45 }} />,
    },
    {
      label: "Usuarios Activos",
      value: 28,
      icon: <GroupAddIcon color="success" sx={{ fontSize: 45 }} />,
    },
    {
      label: "Total Asistencias",
      value: 512,
      icon: <CheckCircleIcon color="secondary" sx={{ fontSize: 45 }} />,
    },
  ];

  return (
    <>
      <Navbar />

      {/* CONTENEDOR PRINCIPAL */}
      <Box
        sx={{
        minHeight: "calc(100vh - 64px)",
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",     // centra horizontal
        justifyContent: "center", // centra vertical
        p: 4,
      }}

      >
       

        {/* ESTADÍSTICAS */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {stat.icon}
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* 🔥 ZONA CENTRADA EN LA MITAD */}
        <Box
          sx={{
            flex: 1,
            display: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <div
                className="card-pages"
                onClick={() => navigate("/VerUsuarios")}
              >
                <h1>Ver Usuarios</h1>
                <p>Listado completo de usuarios registrados</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div
                className="card-pages"
                onClick={() => navigate("/RegistrarUsuarios")}
              >
                <h1>Registrar Usuario</h1>
                <p>Agregar un nuevo usuario al sistema</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div
                className="card-pages"
                onClick={() => navigate("/Historial")}
              >
                <h1>Historial</h1>
                <p>Ver asistencias y movimientos</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
