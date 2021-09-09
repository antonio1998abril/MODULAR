import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Form, Modal} from 'react-bootstrap' 

function Expediente({data,Deletehistorial}) {
    let ShowDate = new Date(data.createdAt);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
            <Form.Label>{data.Alergias}</Form.Label>
            </Modal.Body>
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
