import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle,faTrashAlt, faSignOutAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import axios from 'axios';
import {Form,Col,Button,Modal, NavDropdown} from 'react-bootstrap'; 
import { useRouter } from 'next/router'
import { GlobalState } from '../../components/GlobalState';
import swal from 'sweetalert'
import ListAct from '../../components/Item/ListAct/Listact'

function Actividad() {
  const router = useRouter()
  const initialState = {
    Activityname:'',
    Content:'',
    DateToComplete:'',
    paciente_id:router.query.actividad
  }
  
  const state = useContext(GlobalState)
  const [token] = state.token
  const [callback,setCallback]=state.Paciente.callback;
  const [onEdit,setOnEdit] =useState(false);

  const [newAct,setNewAct] = useState(initialState)
  const [ListPacienteAct, setListPacienteAct] = useState([]);
  const [show, setShow] = state.Paciente.show;
  const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit

  const handleShow =()=>setShow(true);
  
  const handleClose = () => {
    modalsetOnEdit(false)
    setShow(false);
    setNewAct(initialState);
  }
  const handleChangeInput=e=>{
    const {name,value}=e.target
    setNewAct({...newAct,[name]:value})
}
  useEffect(() => {
    let timeFunc = setTimeout(async() => {
       const res = await axios.get(`/api/getAct/${router.query.actividad}`,{
        headers:{Authorization:token}
      }) 

    setListPacienteAct(res.data.activities)
    },1000);
    return () => clearTimeout(timeFunc); 
  }, [callback])


  const TaskSubmit = async e => {
    e.preventDefault()
    try{
       await axios.post('/api/postACT',{...newAct},{
        headers:{Authorization:token}
    }) 
     swal({icon:"success",text:`Activiad ${newAct.Activityname} agregada correctamente`,timer:"2000",buttons: false}); 
     setShow(false);
     setCallback(!callback)
     setNewAct(initialState)
    }catch(err){
      swal({
        title:"¡Ups",
        text:err.response.data.msg,
        icon:"error",
        button:"OK"
      })  
    }
  }

  const actUp = () =>{
    return (
      <>
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
      </>
    )
  }
    return (
        <div>
        <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="paciente ">
              <div className="card-header">
                <h3 className="card-title">Citas</h3>
              </div>
         
              <div className="card-body">
                <div className="row ">

                <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper">
                        <div className="ribbon bg-success">
                        HECHO
                        </div>
                      </div>
                     cita: <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                  <br/>

                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas"  >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-warning text-lg">
                          Proxima
                        </div>
                      </div>
                     cita: <br/> with Large Text <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="position-relative p-3 bg-gray citas" >
                      <div className="ribbon-wrapper ribbon-xl">
                        <div className="ribbon bg-danger text-xl">
                          Pronto
                        </div>
                      </div>
                     cita: <br/> with Extra Large Text <br/>
                      <small>hora:</small>
                    </div>
                  </div>
                </div>
              </div> 
             </div>
          </div>
        </div>
      </div> 

{/* ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}

<div className="kanban" /* style="min-height: 1191px;" */>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1 className="ubuntu"> Actividades del Paciente </h1>
          </div>
          <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item active">Actividades</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content pb-4">
      <div className="container-fluid h-100">
        <div className="paciente card-row card-secondary">
          <div className="card-header-kaban line">
            <h3 className="card-title up-text">
              Actividades 
            </h3>
            <FontAwesomeIcon onClick={handleShow} className="addACT" icon={faPlusCircle} />
          </div>
          <div className="card-body">
          {
            ListPacienteAct.map((act,index) => {
              return <ListAct key={act._id} act={act} index={index}/>
            })
          }
          </div>
        </div>
        <div className="paciente card-row card-primary">
          <div className="card-header-kaban">
            <h3 className="card-title">
              Hecho
            </h3>
          </div>
          <div className="card-body">
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">comer</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#5</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{modalOnEdit ? `Actualiza` : "Crea Una Nueva actividad"}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <Form onSubmit={TaskSubmit}>
                <Form.Row>
                    <Form.Group as={Col} >
                    <Form.Label>Nombre de la Actividad</Form.Label>
                    <Form.Control name="Activityname" type="text" placeholder=" Actividad"
                         value={newAct.Activityname} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group  className="mb-4">
                    <Form.Label>Realizar</Form.Label>
                    <Form.Control  as="textarea" name="Content" type="text" className="form-control font-weight-bold" placeholder="Realizar" 
                         value={newAct.Content} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>
                <Form.Group >
                    <Form.Label>Fecha Para Completar</Form.Label>
                    <Form.Control name="DateToComplete" type="date" placeholder="Inicio Enfermedad"  min="1900-01-01" max="2021-12-31"
                     value={newAct.DateToComplete} onChange={handleChangeInput}
                    />
                </Form.Group>
            
            {
              modalOnEdit ? actUp() : 
                <Button variant="primary" type="submit" >Crear</Button>
            }
            </Form>
            </Modal.Body>

          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cerrar
              </Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default Actividad
