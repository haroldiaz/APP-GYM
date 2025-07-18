import React from "react";
import '../Styles/usuarios.css'
export default function Banner ({texto})  {
    return(
        <div className="banner">
                {texto}
        </div>
    );
};