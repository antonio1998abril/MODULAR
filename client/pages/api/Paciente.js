import { useEffect, useState } from "react";
import axios from 'axios';

function Paciente(token) {
    const [pacientes, setPacientes] = useState([])
    const [callback,setCallback]=useState(false)
    const [idPaciente,setidPaciente] = useState('')


    useEffect(()=>{
        if(token){
        const getCommonUser =async()=>{
             const res= await axios.get("/api/getpaciente",{
                headers: {Authorization: token}
             })
             setPacientes(res.data)
            
        }
        getCommonUser()
    }
    },[token,callback])

    return {
    pacientes:[pacientes,setPacientes],
    callback:[callback,setCallback],
    idPaciente:[idPaciente,setidPaciente],

 
    }
}

export default Paciente


