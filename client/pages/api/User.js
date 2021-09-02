import  { useEffect, useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    const [perfilInfo, setPerfilInfo] = useState([])
    const [callback,setCallback] = useState(false);
    const [isAdmin,setIsAdmin]=useState(false)
    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await Axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    setPerfilInfo(res.data)
                    res.data.role == 1 ? setIsAdmin(true) :setIsAdmin(false)
                } catch (err) {
                    swal({
                        title:"ERROR",
                        text:err.response.data.msg,
                        icon:"error",
                        button:"OK"
                    })
                    localStorage.removeItem('firstLogin')
                }
            }
            getUser()
        }
    },[token]);




    return {
        isLogged:[isLogged,setIsLogged],
        perfilInfo:[perfilInfo,setPerfilInfo],
        isAdmin:[isAdmin,setIsAdmin],
        callback:[callback,setCallback]
    }
}

export default User
