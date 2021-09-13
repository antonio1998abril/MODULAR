import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import {Form, Modal, Button} from 'react-bootstrap' 

function Expediente({data,Deletehistorial}) {
    let ShowDate = new Date(data.createdAt);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Expedientestyle= {
      fontSize: "2rem"    
    }
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
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Glucosa general: </Form.Label>
              <p style={Expedientestyle}>{data.GlucosaSangre}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Microalbuminuria: </Form.Label>
              <p style={Expedientestyle}>{data.Microalbuminuria}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Hemoglobina Glucosilada:</Form.Label>
              <p style={Expedientestyle}>{data.HemoglobinaGlucosilada}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Colesterol: </Form.Label>
              <p style={Expedientestyle}>{data.NivelCorestero}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Trigliseridos: </Form.Label>
              <p style={Expedientestyle}>{data.NivelTrigliseridos}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Electrocadriograma: </Form.Label>
              <p style={Expedientestyle}>{data.Electrocadriograma}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-bold">Nivel de Dialisis: </Form.Label>
              <p style={Expedientestyle}>{data.dialisis}</p>
            </Form.Group>
              <Form.Label className="font-weight-bold">Presion General: </Form.Label>
              <p style={Expedientestyle}>{data.presion}</p>
            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion de Valoraciones Fisicas</Modal.Title>
            <Form.Group>  
              <Form.Label className="font-weight-bold">Antecedentes: </Form.Label>
              <p style={Expedientestyle}>{data.Antecedentes}</p>
            </Form.Group>  
            <Form.Group>  
              <Form.Label className="font-weight-bold">Medicamentos:</Form.Label>
              <p style={Expedientestyle}>{data.Medicamentos}</p>
            </Form.Group>
            <Form.Group> 
              <Form.Label className="font-weight-bold">Alergias: </Form.Label>
              <p style={Expedientestyle}>{data.Alergias}</p>
            </Form.Group>
            <Form.Group> 
              <Form.Label className="font-weight-bold">Problemas en el cuerpo:</Form.Label>
              <p style={Expedientestyle}>{data.Cuerpodaño}</p>
            </Form.Group>  
            <Form.Group>
              <Form.Label className="font-weight-bold">Otras enfermedades: </Form.Label>
              <p style={Expedientestyle}>{data.OtrasEnfermedades}</p>
            </Form.Group>  
            <Form.Group>
              <Form.Label className="font-weight-bold"> Estado Dental: </Form.Label>
              <p style={Expedientestyle}>{data.EstatusDental}</p>
            </Form.Group>
            </Modal.Body>
            
            <Modal.Body>
              <Modal.Title>Informacion de Valoraciones Mentales: </Modal.Title>
              <Form.Group>
                <Form.Label className="font-weight-bold">En que momento iniciaron: </Form.Label>
                <p style={Expedientestyle}>{data.InicioEnfermedadMentales}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">Padecimiento: </Form.Label>
                <p style={Expedientestyle}>{data.EstadoMental}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold">Complicaciones en su dia dia: </Form.Label>
                <p style={Expedientestyle}>{data.FactorRiesgo}</p>
              </Form.Group>
            </Modal.Body>

            <Modal.Body>
            <Modal.Title>Informacion del Regimen Alimenticio</Modal.Title>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Ejercicio General al dia: </Form.Label>
                <p style={Expedientestyle}>{data.Ejercicio}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Regimen Alimenticio al dia: </Form.Label>
                <p style={Expedientestyle}>{data.Comida}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Lunes: </Form.Label>
                <p style={Expedientestyle}>{data.Lunes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Martes: </Form.Label>
                <p style={Expedientestyle}>{data.Martes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Miercoles: </Form.Label>
                <p style={Expedientestyle}>{data.Miercoles}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Jueves: </Form.Label>
                <p style={Expedientestyle}>{data.Jueves}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Viernes: </Form.Label>
                <p style={Expedientestyle}>{data.Viernes}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Sabado </Form.Label>
                <p style={Expedientestyle}>{data.Sabado}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="font-weight-bold"> Domingo: </Form.Label>
                <p style={Expedientestyle}>{data.Domingo}</p>
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
