import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faTrashAlt, faSignOutAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { Modal ,Container,Col,Row,Button,Form} from 'react-bootstrap'
import { GlobalState } from '../../GlobalState';

function Listact({act,index}) {
  const state = useContext(GlobalState)
  const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
  const [Show,setShow] = state.Paciente.show;

  const changeState=()=>{
    modalsetOnEdit(true)
    setShow(true)
  }

    return (
      <>
      <div className="paciente card-info card-outline hover-card">
        <div className="card-header-paciente ">
          <h5 className="card-title">{ act.Activityname}</h5>
          <div className="card-tools">
            <a href="#" className="btn btn-tool btn-link">#{index+1}</a>&nbsp;
              <FontAwesomeIcon /* onClick={handleShow} */ onClick={changeState} color="orange" icon={faPenAlt} />
          </div>
        </div>
        <div className="card-body">
        {act.Content}
        </div>
      </div>
      </>
    )
}

export default Listact
