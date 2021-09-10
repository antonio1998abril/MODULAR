import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Form, Modal} from 'react-bootstrap' 

function Expediente({data,Deletehistorial}) {
    let ShowDate = new Date(data.createdAt);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    console.log(data)
    return (
        <div className="result-expe">
        <div><span>Fecha:</span> <span>{ShowDate.getUTCDate()}/{ShowDate.getMonth()}/{ShowDate.getFullYear()} a las {ShowDate.getHours()}:{ShowDate.getMinutes()}</span></div>
            <div>
            <span>Eliminar </span> 
            
                <button  onClick={()=>Deletehistorial(data._id)} className="btn btn-danger">
                <span>
                    <FontAwesomeIcon icon={faTrash}    />
                </span>
                </button>
            </div>

            <div>
            <span>Ver </span> 
                        
                <button  className="btn btn-primary"  onClick={handleShow}>
                <span>    
                    <FontAwesomeIcon icon={faEye}     />
                    </span>
                </button>
            </div>
      

            {/* MODAL */}

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Informacion</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <Modal.Title>Datos de Laboratorio</Modal.Title>
            <Form.Group>
            <Form.Label>Nivel de glucosa general: {data.Alergias}</Form.Label>
            </Form.Group>
            <Form.Label>Nivel de Microalbuminuria: {data.Antecedentes}</Form.Label>
            <Form.Label>Nivel de Microalbuminuria: {data.Microalbuminuria}</Form.Label>
            <Form.Label>Nivel de Colesterol: {data.Alergias}</Form.Label>
            <Form.Label>Nivel de Trigliseridos: {data.Alergias}</Form.Label>
            <Form.Label>Nivel de Electrocadriograma: {data.Alergias}</Form.Label>
            <Form.Label>Nivel de Dialisis: {data.Alergias}</Form.Label>
            <Form.Label>Presion General: {data.Alergias}</Form.Label>
            </Modal.Body>
            <Modal.Body>
                <Modal.Title>Informacion de Valoraciones Fisicas</Modal.Title>
                <Form.Label>Antecedentes: {data.Alergias}</Form.Label>
            <Form.Label>Medicamentos: {data.Alergias}</Form.Label>
            <Form.Label>Alergias: {data.Alergias}</Form.Label>
            <Form.Label>Problemas en el cuerpo: {data.Alergias}</Form.Label>
            <Form.Label>Otras enfermedades: {data.Alergias}</Form.Label>
            <Form.Label> Estado Dental: {data.Alergias}</Form.Label>
            </Modal.Body>
            <Modal>
              <Modal.Title>Informacion de Valoraciones Mentales: </Modal.Title>
              <Form.Label>En que momento iniciaron: {data.Alergias}</Form.Label>
            <Form.Label>Padecimiento: {data.Alergias}</Form.Label>
            <Form.Label>Complicaciones en su dia dia: {data.Alergias}</Form.Label>
              </Modal>
              <Modal>
              <Modal.Title>Informacion del Regimen Alimenticio</Modal.Title>
              
        </Modal>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
        </div> 

    )
}

export default Expediente
