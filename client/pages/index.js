import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat, faClipboardCheck, faWalking, faAppleAlt} from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../components/GlobalState';
import { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert'

import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link'

export default function Home() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [loaded,setLoaded] = useState(false)
    const [singInData]= state.User.perfilInfo
    useEffect(() => {
      if(!islogged) {
        let timerFunc = setTimeout(() => {
          Router.push('/login')
        }, 100);
  
        return () => clearTimeout(timerFunc);
    }else{ 
        setLoaded(true) 
      }
  }, [!islogged]);

  if (!loaded) { return <div></div> } 

  return (
  
  <>
    <div className="card-body col-12">
      <div className="callout callout-info">
          <h5><i className="fas fa-info"></i> Nota:</h5>
          <h1>Estatus Valores Globales:</h1>
      </div>
    </div>

    <div className="gridIndex">
      <Link href="/Admin/Citas">
      <div className="card cardheart">
      <div className="titleIndex"><b>Estatus de Salud 50%</b></div>
      <div> <FontAwesomeIcon icon={faHeartbeat}  className="IconIndex"/></div>
      </div>
      </Link>
      <Link href="/Admin/Citas">
      <div className="card dates ">
      <div className="titleIndex"><b>Estatus de Citas : 80%</b></div>
      <div> <FontAwesomeIcon icon={faClipboardCheck}   className="IconIndex"/></div>
     
      </div>
      </Link>
      <Link href="/Admin/Citas">
      <div className="card activities ">
      <div className="titleIndex"><b> Estatus de Actividad : 20%</b></div>
      <div> <FontAwesomeIcon icon={faWalking}  className="IconIndex"/></div>
     
      </div>
      </Link>
      <Link href="/Admin/Citas">
    
      <div className="card nutrition ">
      <div className="titleIndex"><b> Estatus de Nutricion : 60%</b></div>
      <div> <FontAwesomeIcon icon={faAppleAlt}  className="IconIndex"/></div>     
      </div>
      </Link>
      

      

    </div>
 </>
 
  )
}
