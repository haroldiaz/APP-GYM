import React from 'react'
import { Dialog,DialogTitle,DialogActions,DialogContent } from "@mui/material";
import {TextField,Button

}from "@mui/material";
function ModalEdicionEntrenadores({opendEditar,entrenadorEditando,setEntrenadoresEditando,handleCerrarDialogo,handleGuardarCambios}) {
    return (
        <Dialog open={opendEditar} onClose={handleCerrarDialogo}>
                <DialogTitle>Editar Entrenador</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    label="Nombre"
                    fullWidth
                    value={entrenadorEditando?.nombre || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, nombre: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Cedula"
                    fullWidth
                    value={entrenadorEditando?.cedula || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, cedula: e.target.value })
                    }
                  />
                   <TextField
                    margin="dense"
                    label="Correo"
                    fullWidth
                    value={entrenadorEditando?.correo || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, correo: e.target.value })
                    }
                  />
                   <TextField
                    margin="dense"
                    label="Teléfono"
                    fullWidth
                    value={entrenadorEditando?.telefono || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, telefono: e.target.value })
                    }
                  />
                 <TextField
                    margin="dense"
                    label="Especialidad"
                    fullWidth
                    value={entrenadorEditando?.especialidad || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, especialidad: e.target.value })
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Experiencia"
                    fullWidth
                    value={entrenadorEditando?.experiencia || ""}
                    onChange={(e) =>
                      setEntrenadoresEditando({ ...entrenadorEditando, experiencia: e.target.value })
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
    )
}

export default ModalEdicionEntrenadores
