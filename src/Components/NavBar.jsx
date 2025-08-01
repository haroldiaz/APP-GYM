// src/Componentes/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title = "APP GYM" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleNav = (ruta) => {
    navigate(ruta);
    setOpen(false); // cerrar menú al navegar
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Botón del menú tipo Gmail */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/menu')}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/VerUsuarios')}>
                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                <ListItemText primary="Ver Usuarios" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/RegistrarUsuarios')}>
                <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                <ListItemText primary="Registro Usuario" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/VerEntrenadores')}>
                <ListItemIcon><PictureAsPdfIcon /></ListItemIcon>
                <ListItemText primary="VerEntrenadores" />
              </ListItemButton>
            </ListItem>
             <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/RegistrarEntrenador')}>
                <ListItemIcon><PictureAsPdfIcon /></ListItemIcon>
                <ListItemText primary="Registrar Entrenadores" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/Exportar')}>
                <ListItemIcon><PictureAsPdfIcon /></ListItemIcon>
                <ListItemText primary="Exportar PDF" />
              </ListItemButton>
            </ListItem>

            {/* Puedes seguir agregando más ítems aquí */}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
