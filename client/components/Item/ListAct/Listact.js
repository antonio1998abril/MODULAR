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

{/*       <Modal show={Show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalOnEdit ?  `Update` : "Crea una Nueva actividad"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
            <Form.Group as={Col} >
                    <Form.Label>Nombre de la Actividad</Form.Label>
                    <Form.Control name="Activityname" type="text" placeholder=" Actividad"
                         
                    />
                    </Form.Group>

                    <Form.Group  className="mb-4">
                    <Form.Label>Realizar</Form.Label>
                    <Form.Control  as="textarea" name="Content" type="text" className="form-control font-weight-bold" placeholder="Realizar" 
                        
                    />
                    </Form.Group>
            </Form.Row>
            <Form.Group >
                    <Form.Label>Fecha Para Completar</Form.Label>
                    <Form.Control name="DateToComplete" type="date" placeholder="Inicio Enfermedad"  min="1900-01-01" max="2021-12-31"
                     
                    />
                </Form.Group>
            

      <br/>
            <div className="d-grid gap-2">
            <Button variant="warning" size="sm">
                Actualizar  <FontAwesomeIcon  icon={faPencilAlt} />    
              </Button>&nbsp;&nbsp;

              <Button variant="primary" size="sm">
                Mover a terminados  <FontAwesomeIcon  icon={faSignOutAlt} />    
              </Button>&nbsp;&nbsp;
              <Button variant="danger" size="sm">
                Eliminar Tarea     <FontAwesomeIcon  icon={faTrashAlt} />         
              </Button>
            </div>

    
             
          
          </Form>
        </Modal.Body>
        
      </Modal> */}
      </>
    )
}

export default Listact
