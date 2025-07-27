import React, { useState, useEffect } from "react";
import Banner from "../Components/Banner";
import ModalEdicion from "../Components/ModalEdicion";
import TabalUsuarios from "../Components/TablaUsuarios";
import Navbar from "../Components/NavBar";

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
      <Navbar title="Usuarios"></Navbar>
      <TabalUsuarios
        usuarios={usuarios}
        handleEditar={handleEditar}
        handleEliminar={handleEliminar}
      />

      <ModalEdicion 
        opendEditar={openEditar}
        usuarioEditando={usuarioEditando}
        setUsuarioEditando={setUsuarioEditando}
        handleCerrarDialogo={handleCerrarDialogo}
        handleGuardarCambios={handleGuardarCambios}
        />
    </div>
  );
}
