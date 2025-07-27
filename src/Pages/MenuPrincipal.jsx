import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Navbar from "../Components/NavBar";

export default function MenuPrincipal() {
  const navigate = useNavigate();
  const theme = useTheme();

  const stats = [
    {
      label: "Usuarios Ingresados",
      value: 124,
      icon: <GroupIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      label: "Usuarios Activos",
      value: 28,
      icon: <GroupAddIcon color="success" sx={{ fontSize: 40 }} />,
    },
    {
      label: "Total Asistencias",
      value: 512,
      icon: <CheckCircleIcon color="secondary" sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <div>
      <Navbar />

      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // Ajusta según la altura del Navbar
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: theme.palette.background.default,
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 800,
            p: 8,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard de Administración
          </Typography>

          {/* Tarjetas estadísticas */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  {stat.icon}
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="h5">{stat.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Botones de acción */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate("/VerUsuarios")}
              >
                Ver Usuarios
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => navigate("/RegistrarUsuarios")}
              >
                Registrar Usuario
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/Historial")}
              >
                Ver Historial
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}
