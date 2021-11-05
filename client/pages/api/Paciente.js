import { useEffect, useState } from "react";
import axios from 'axios';

function Paciente(token) {
    const [pacientes, setPacientes] = useState([])
    const [callback,setCallback]=useState(false)
    const [idPaciente,setidPaciente] = useState('')

    /* FIND PACIENTES */
    const [GlobalPaciente, setGlobalPaciente] = useState([]);
    const [sort,setSort] = useState('');
    const [search,setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    /* CHANGE PATIENTS */
    const [modalOnEdit,modalsetOnEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [idAct,setIdAct] = useState('');
    const [allSuper,setallSuper] = useState([]);
    const [idUserS,setIdUserS] = useState('');

    const [notifications,setNotifications] = useState([]);
    const [sizeBel, setSizeBell] = useState('');

    useEffect(() =>{
        const getPacientes = async() => {
            const result = await axios.get(`/api/findPaciente?limit=${page*5}&${sort}&email=${search}`)
            setGlobalPaciente(result.data.paciente)
            setResult(result.data.result) 
        }
        getPacientes()
    },[callback,sort,search,page])

    useEffect(()=>{
        if(token){
        const getCommonUser =async()=>{
             const res= await axios.get("/api/getpaciente",{
                headers: {Authorization: token}
             })
             setPacientes(res.data)
            }
        const getAllUser = async()=> {
            const res= await axios.get("/api/SuperGet",{
                headers: {Authorization: token}
             })
             setallSuper(res.data)
        }

        const getNotification = async () => {
            const res2 = await axios.get("/api/GetNotification",{
                headers: {Authorization: token}
            })
            setNotifications(res2.data.data)
            setSizeBell(res2.data.sizeNoti)
           
        }


        getCommonUser()
        getAllUser()
        getNotification()
        }
    },[token,callback])

    console.log(sizeBel)
    return {
    pacientes:[pacientes,setPacientes],
    callback:[callback,setCallback],
    idPaciente:[idPaciente,setidPaciente],
    page: [page, setPage],
    result: [result,setResult],
    search: [search,setSearch],
    sort: [sort, setSort],
    modalOnEdit:[modalOnEdit,modalsetOnEdit],
    show:[show, setShow],
    idAct:[idAct,setIdAct],
    GlobalPaciente: [GlobalPaciente, setGlobalPaciente],
    AllSuperData: [allSuper,setallSuper],
    idUserS:[idUserS,setIdUserS],
    notifications:[notifications,setNotifications],
    sizeBell:[sizeBel, setSizeBell]
    }
}

export default Paciente


