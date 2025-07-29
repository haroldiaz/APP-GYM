import React,{useState} from 'react';

import Navbar from '../Components/NavBar';

import TablaEntrenadores from '../Components/Entrenadores/TablaEntrenadores';


function VerEntrenadores() {
const [entrenadores, setEntrenadores] = useState([]);

    return (
        <div>
            <Navbar />
            <TablaEntrenadores entrenadores ={entrenadores}/>
        </div>  
    );
}

export default VerEntrenadores
