import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faChartLine,faProcedures} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Image from 'next/image'
import profilePic from '../../public/testuser.png'
import { Modal ,Container,Col,Row,Button} from 'react-bootstrap'

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Historial de pruebas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              Valor: 3.2
            </Col>
            <Col xs={6} md={4}>
              Fecha: 21/02/21
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8}>
             Valor: 4.6
            </Col>
            <Col xs={6} md={4}>
              Fechas: 11/01/21
            </Col>

          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ActividadItem({actividad}) {
  const [modalShow, setModalShow] = useState(false);

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
              <a className="btn btn-info btn-sm" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faChartLine} />&nbsp;
               Niveles de Glucosa
              </a>&nbsp;

            </td>
          </tr>

          <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
     </>
    
    )
}

export default ActividadItem
