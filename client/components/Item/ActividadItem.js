import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faProcedures,faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Image from 'next/image'
import profilePic from '../../public/testuser.png'
import { Modal ,Container,Col,Row,Button,Form} from 'react-bootstrap'
import axios from 'axios';
import swal from 'sweetalert';
import { GlobalState } from '../GlobalState';
import  GlucosaList  from '../Item/GlucosaList';

function ActividadItem({actividad}) {
  const initialStateGlucosa = {
    Glucosa:'',
    PacienteId:actividad._id
  }
  const initialStatePresion = {
    Presion:'',
    pacientId:actividad._id
  }
  const initialStateDialisis = {
    Dialisis:'',
    pacientesId:actividad._id
  }

  const [modalShow, setModalShow] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const state = useContext(GlobalState);
  const [token] = state.token
  const [glucosa,setGlucosa] = useState(initialStateGlucosa);
  const [callback,setCallback]=state.Paciente.callback

  const [GlucosaHistorial,setGlucosaHistorial] = useState([])

  useEffect(()=>{
    const getHistorialGlucosa = async () =>{
      const res= await axios.get(`/api/getGlucosa/${actividad._id}`,{
        headers: {Authorization: token}
     })
     setGlucosaHistorial(res.data)
    }
    getHistorialGlucosa()
  },[callback])
  
  const handleChangeInput= e =>{
    const {name,value} = e.target
    setGlucosa({...glucosa,[name]:value})
  }
  const handleClose=()=>{
    setModalAdd(false);
    setGlucosa(initialStateGlucosa)
  } 
  const handleSubmit = async  e => {
    e.preventDefault()
    try {
       const result= await axios.post('/api/postGlucosa',{...glucosa},{
         headers:{Authorization:token}
       })
       swal({icon:"success",title:result.data.msg, text:`Nuevo registro de glucosa para ${actividad.name}`,timer:"2000",buttons: false});
       setCallback(!callback);
       setModalAdd(false);
    }catch(err){
      swal({
        title:"ERROR",
        text: err.response.data.msg,
        icon:"error",
        button:"OK"
    })
    }
  }
 
    return (
        <>
          <tr>
            <td>
              <Link href="/Estatus/[actividad]" as={`/Estatus/${actividad._id}`}>
                <a className="btn btn-info btn-sm" >
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
            <br/>
            <button className="btn btn-dark btn-sm" onClick={() => setModalDialisisSchow(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
               Dias en que se realizo dialisis
            </button>&nbsp;<br/><br/>

            <button className="btn btn-dark btn-sm" onClick={() => setModalPresionShow(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
                Niveles de Presion
            </button>&nbsp;<br/> <br/>
               
            <button className="btn btn-dark btn-sm" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faFolderPlus} />&nbsp;
                Niveles de Glucosa
            </button>&nbsp;

{/*               <a className="btn btn-dark btn-sm" onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;
               Niveles de Glucosa moment('2019-10-17T02:00:00.000Z').format('YYYY-MM-DD');
              </a> */}

              <br/><br/>
              <div className="ButtonGlucosa">
                <FontAwesomeIcon className="commonButton" color="orange" icon={faPlusSquare} size="3x"  onClick={() => setModalAdd(true)} />
              </div>
            </td>
          </tr>

          <MydModalWithGrid show={modalShow}  onHide={() => setModalShow(false)} />
{/* Value continue  */}
          <Modal show={modalAdd} onHide={handleClose} >
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} >
                    <Form.Label>Nuevo registro de Glucosa para {actividad.name}: </Form.Label>
                    <Form.Control name="Glucosa" type="number" placeholder="Nivel de Glucosa" step="0.01"
                          onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit" >
                  Crear
                </Button>
            </Form>
            </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cerrar
              </Button>
          </Modal.Footer>
        </Modal>  
     </>
    )

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
              {
                GlucosaHistorial.map(historial => { 
                  return <GlucosaList key={historial._id} historial={historial} /* deletePaciente={deletePaciente} *//>
                })
              } 
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>    
      );
    }
  }
export default ActividadItem
