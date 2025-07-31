import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar';
import TablaEntrenadores from '../../Components/Entrenadores/TablaEntrenadores';
import ModalEdicionEntrenadores from '../../Components/Entrenadores/ModalEdicionEntrenadores';
import { useNavigate } from "react-router-dom";

function VerEntrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
  const [openEditar, setOpenEditar] = useState(false);
  const [entrenadorEditando, setEntrenadoresEditando] = useState(null);
  const [errorCarga, setErrorCarga] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEntrenadores();
  }, []);

  const fetchEntrenadores = () => {
    fetch("http://localhost:3001/api/entrenadores")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al conectar con la API /entrenadores");
        }
        return response.json();
      })
      .then((data) => {
        const listaEntrenadores = data.map((u) => ({
          id: u.id,
          nombre: u.nombre,
          cedula: u.cedula,
          correo: u.correo,
          telefono: u.telefono,
          especialidad: u.especialidad,
          experiencia: u.experiencia,
          fecha_ingreso: u.fecha_ingreso,
        }));
        setEntrenadores(listaEntrenadores);
        setErrorCarga(listaEntrenadores.length === 0);
      })
      .catch((error) => {
        console.error("Error al cargar entrenadores:", error);
        setErrorCarga(true);
      });
  };

  const handleEditar = (entrenador) => {
    setEntrenadoresEditando(entrenador);
    setOpenEditar(true);
  };

  const handleCerrarDialogo = () => {
    setOpenEditar(false);
    setEntrenadoresEditando(null);
  };

  const handleEliminar = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este entrenador?");
    if (confirmacion) {
      fetch(`http://localhost:3001/api/entrenadores/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al eliminar el entrenador");
          }
          setEntrenadores((prev) => prev.filter((u) => u.id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar entrenador:", error);
          alert("Hubo un error al eliminar el entrenador.");
        });
    }
  };

  const handleGuardarCambios = () => {
    fetch(`http://localhost:3001/api/entrenadores/${entrenadorEditando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: entrenadorEditando.nombre,
        cedula: entrenadorEditando.cedula,
        correo: entrenadorEditando.correo,
        telefono: entrenadorEditando.telefono,
        especialidad: entrenadorEditando.especialidad,
        experiencia: entrenadorEditando.experiencia,
        fecha_ingreso: entrenadorEditando.fecha_ingreso,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar entrenador");
        }
        return res.json();
      })
      .then((data) => {
        setEntrenadores((prevEntrenadores) =>
          prevEntrenadores.map((u) => (u.id === data.id ? data : u))
        );
        handleCerrarDialogo();
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el entrenador.");
      });
  };

  return (
    <div>
      <Navbar />
      <TablaEntrenadores
        entrenadores={entrenadores}
        handleEliminar={handleEliminar}
        handleEditar={handleEditar}
      />
      <ModalEdicionEntrenadores
        opendEditar={openEditar}
        entrenadorEditando={entrenadorEditando}
        setEntrenadoresEditando={setEntrenadoresEditando}
        handleCerrarDialogo={handleCerrarDialogo}
        handleGuardarCambios={handleGuardarCambios}
      />
    </div>
  );
}

export default VerEntrenadores;
