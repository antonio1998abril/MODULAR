import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt} from '@fortawesome/free-solid-svg-icons';

function Listact({act,index}) {
    return (
        <div className="paciente card-info card-outline hover-card">
        <div className="card-header-paciente ">
          <h5 className="card-title">{ act.Activityname}</h5>
          <div className="card-tools">
      
            <a href="#" className="btn btn-tool btn-link">#{index+1}</a>&nbsp;
          
                
              
   
              <FontAwesomeIcon /* onClick={handleShow} */ color="red" icon={faPenAlt} />
            
          </div>
        </div>
        <div className="card-body">
d
        </div>
      </div>
    )
}

export default Listact
