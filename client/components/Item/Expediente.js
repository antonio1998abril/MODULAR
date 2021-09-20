import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Form, Modal, Button} from 'react-bootstrap' 

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

            <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Informacion</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <Modal.Title>Datos de Laboratorio</Modal.Title>
          

 
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.GlucosaSangre}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Microalbuminuria}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.HemoglobinaGlucosilada}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.NivelTrigliseridos}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Electrocadriograma}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.dialisis}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.presion}
        </label>
      </div>
    </div>
            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion de Valoraciones Fisicas</Modal.Title>


            <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.Antecedentes}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.GlucosaSangre}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.GlucosaSangre}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label  className="heading font-weight-bold">Nivel de Glucosa general:</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text"></span>
        </div>
        <label type="text" className="form-control font-weight-bold">
        {data.GlucosaSangre}
        </label>
      </div>
    </div>
            <Form.Group>  
              <Form.Label className="font-weight-bold">Antecedentes: </Form.Label>
              <p >{data.Antecedentes}</p>
            </Form.Group>  
            <Form.Group>  
              <Form.Label className="font-weight-bold">Medicamentos:</Form.Label>
              <p >{data.Medicamentos}</p>
            </Form.Group>
            <Form.Group> 
              <Form.Label className="font-weight-bold">Alergias: </Form.Label>
              <p >{data.Alergias}</p>
            </Form.Group>
            <Form.Group> 
              <Form.Label className="font-weight-bold">Problemas en el cuerpo:</Form.Label>
              <p >{data.Cuerpodaño}</p>
            </Form.Group>  
            <Form.Group>
              <Form.Label className="font-weight-bold">Otras enfermedades: </Form.Label>
              <p >{data.OtrasEnfermedades}</p>
            </Form.Group>  
            <Form.Group>
              <Form.Label className="font-weight-bold"> Estado Dental: </Form.Label>
              <p >{data.EstatusDental}</p>
            </Form.Group>
            </Modal.Body>
            
            <Modal.Body>
              <Modal.Title>Informacion de Valoraciones Mentales: </Modal.Title>
              <Form.Group>
                <Form.Label className="font-weight-bold">En que momento iniciaron: </Form.Label>
                <p >{data.InicioEnfermedadMentales}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">Padecimiento: </Form.Label>
                <p >{data.EstadoMental}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">Complicaciones en su dia dia: </Form.Label>
                <p >{data.FactorRiesgo}</p>
              </Form.Group>
            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion del Regimen Alimenticio</Modal.Title>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Ejercicio General al dia: </Form.Label>
                <p>{data.Ejercicio}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Regimen Alimenticio al dia: </Form.Label>
                <p >{data.Comida}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Lunes: </Form.Label>
                <p >{data.Lunes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Martes: </Form.Label>
                <p >{data.Martes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Miercoles: </Form.Label>
                <p >{data.Miercoles}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Jueves: </Form.Label>
                <p >{data.Jueves}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Viernes: </Form.Label>
                <p >{data.Viernes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Sabado </Form.Label>
                <p >{data.Sabado}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Domingo: </Form.Label>
                <p >{data.Domingo}</p>
              </Form.Group>
              </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div> 

    )
}

export default Expediente
