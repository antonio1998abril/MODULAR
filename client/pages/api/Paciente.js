import { useEffect, useState } from "react";
import axios from 'axios';

function Paciente(token) {
    const [pacientes, setPacientes] = useState([])
    const [callback,setCallback]=useState(false)
    const [idPaciente,setidPaciente] = useState('')

    /* FIND PACIENTES */
    const [GlobalPaciente, setGlobalPaciente] = useState([]);
    const [sort,setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    

    useEffect(()=>{
        const getPacientes = async() => {
            const res = await axios.get(`/api/findPaciente?limit=${page*6}&${sort}&title[regex]=${search}`)
            setGlobalPaciente(res.data.paciente)
            setResult(res.data.result)
        }
        getPacientes()
        
        if(token){
        const getCommonUser =async()=>{
             const res= await axios.get("/api/getpaciente",{
                headers: {Authorization: token}
             })
             setPacientes(res.data)
            
        }
        getCommonUser()
    }
    },[token,callback,sort,search,page])

    return {
    pacientes:[pacientes,setPacientes],
    callback:[callback,setCallback],
    idPaciente:[idPaciente,setidPaciente],
    page: [page, setPage],
    result: [result, setResult],
    search: [search, setSearch],
    sort: [sort, setSort],
    GlobalPaciente: [GlobalPaciente, setGlobalPaciente]

 
    }
}

export default Paciente


