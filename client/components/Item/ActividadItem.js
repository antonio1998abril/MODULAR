import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faChartLine,faProcedures} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Image from 'next/image'
import profilePic from '../../public/testuser.png'

function ActividadItem({actividad}) {
    return (
   
        <>
          <tr>
            <td>
    
              <Link href="/Estatus/[actividad]" as={`/Estatus/${actividad._id}`}>
                <a className="btn btn-danger btn-sm" >
                    <FontAwesomeIcon className="circlePaciente" icon={faProcedures} />
                </a></Link>  
            </td>
            <td>
              <ul className="list-inline">
                <li className="list-inline-item">
                    <Image alt="Avatar" className="table-avatar" src={profilePic}/>
                </li>
              </ul>
            </td>

            <td className="project_progress">
              <div className="progress progress-sm">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width:" 57%"}}></div>
              </div>
                <small>
                   {actividad.name} 57% Complete
                </small>
            </td> 
            <td className="project-state">
                <span className="badge badge-success">Success</span>
            </td>
            <td className="project-actions text-right">
              <a className="btn btn-info btn-sm" href="#">
                <FontAwesomeIcon icon={faChartLine} />&nbsp;
               Niveles de Glucosa
              </a>&nbsp;

            </td>
          </tr>
     </>
    
    )
}

export default ActividadItem
