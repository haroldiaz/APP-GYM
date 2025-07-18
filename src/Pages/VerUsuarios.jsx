import React from "react";

import Banner from "../Components/Banner";
export default function VerUsuarios(){
   
     const datos = [
    { id: 1, nombre: "Juan", edad: 25 },
    { id: 2, nombre: "María", edad: 30 },
    { id: 3, nombre: "Carlos", edad: 28 },
  ];
    return(
        <div>
            <Banner texto ={"Tabla Usuarios"}></Banner>
            <div style={{ padding: "1rem" }}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <th>id</th>
                    </thead>
                    <tbody>
                         {datos.map((datos) => (
                        <tr key={datos.id}>
                            <td>{datos.nombre}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};