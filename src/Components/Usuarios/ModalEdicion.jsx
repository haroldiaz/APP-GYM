import React from "react";
import { Dialog,DialogTitle,DialogActions,DialogContent } from "@mui/material";
import {TextField,Button

}from "@mui/material";
export default function ModalEdicion({opendEditar,usuarioEditando,setUsuarioEditando,handleCerrarDialogo,handleGuardarCambios}){
    return (
        <Dialog open={opendEditar} onClose={handleCerrarDialogo}>
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
    );
}