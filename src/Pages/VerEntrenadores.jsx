import React,{useEffect, useState} from 'react';
import Navbar from '../Components/NavBar';
import TablaEntrenadores from '../Components/Entrenadores/TablaEntrenadores';

import { useNavigate } from "react-router-dom";

function VerEntrenadores() {
    const [entrenadores, setEntrenadores] = useState([]);
    const [openEditar, setOpenEditar] = useState(false);
    const [entrenadorEditando,setEntrenadoresEditando] = useState(false);
    const [errorCarga, setErrorCarga] = useState(false);


    const navigate = useNavigate();
    useEffect(()=> {
        fetchEntrenadores();
    },[]);

    const fetchEntrenadores = () => {
        fetch("http://localhost:3001/api/entrenadores")
            .then((response)=> {
                if(!response.ok){
                    throw new Error("error al conectar con la Api/Entrenadores");
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
                    experiencia: u.experiencia
                }));
                setEntrenadores(listaEntrenadores);
                setErrorCarga(listaEntrenadores.length === 0); // true si no hay entrenadores
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


    
    return (
        <div>
            <Navbar />
            <TablaEntrenadores 
                entrenadores ={entrenadores}
                handleEliminar={handleEliminar}
                />
        </div>  
    );
}

export default VerEntrenadores
