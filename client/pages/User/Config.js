import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../components/GlobalState';
import Router from 'next/router';
import {Modal,Button,Table} from 'react-bootstrap';
import Image from 'next/image'
import profilePic from '../../public/testuser.png';

import ListSuper from '../../components/Item/ListAdminControl/UserStatus'
function Config() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [loaded,setLoaded] = useState(false)
    const [singInData]= state.User.perfilInfo
    const [isAdmin]= state.User.isAdmin

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      modalsetOnEdit(false);
    }
    const handleShow = () => setShow(true);
  /* ROLE */
    const [iSuperAdmin]= state.User.super
    const [AllData] = state.Paciente.AllSuperData;
    const [idUserS,setIdUserS] = state.Paciente.idUserS
    const [ShowRole,setShowRole] = useState(false);
    const [modalOnEdit,modalsetOnEdit] = state.Paciente.modalOnEdit
    
    console.log(idUserS)
    useEffect(() => {
      if(idUserS){
        modalsetOnEdit(true)
       
          AllData.forEach(p => {
              if(p._id === idUserS){
                  /* setPaciente(paciente) */
                  setShowRole(true);
                
              }
          })
      }else {
         /*  setPaciente(initialState) */
         modalsetOnEdit(false)
      }
  },[idUserS,AllData])

    
    const deleteallS=async(id)=>{
      console.log(AllData)
    }


const ToolAdmin = () => {
  return (
  <>
  <React.Fragment>
    <Table className="text-center table-inverse  table-borderless shadow-lg  rounded" variant="dark"   hover  size="sm" responsive="sm">
            <thead>
                        <tr>
                        <th>Nombre de Usuario</th>
                        <th>Correo</th>
                        <th>Opciones Role</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                          AllData.map(allS =>{
                            return <ListSuper key={allS._id} allS={allS} deleteallS={deleteallS}/>
                            })
                        }
                    </tbody>
            </Table>
      </React.Fragment>
  </>
  )
}
    useEffect(() => {
      if(!islogged) {
        let timerFunc = setTimeout(() => {
          Router.push('/login')
        }, 100);
  
        return () => clearTimeout(timerFunc);
    }else{ 
        setLoaded(true) 
      }
  }, [!islogged]);

  if (!loaded) { return <div></div> } 



    return (
        <>
{/*         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar informacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Completa los datos</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
 */}


        <Modal show={modalOnEdit} onHide={handleClose}  animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Actualizar Role del usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>Cambia el role</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose}>
               Guardar
            </Button>
            </Modal.Footer>
        </Modal>


  <br/>
            <div className="card card-widget widget-user">
              <div className="widget-user-header text-dark config">
                <h3 className="widget-user-username text-right">{singInData.name} {singInData.lastname}</h3>
                <h5 className="widget-user-desc text-right">{singInData.ocupation}</h5>
              </div>
              <div className="widget-user-image">
                <Image className="img-circle" src={profilePic} alt="User Avatar" width="120" height="120"/>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Email</h5>
                      <span className="description-text">{singInData.email}</span>
                    </div>
                 
                  </div>
               
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Estatus</h5>
                      <span className="description-text">          
                      {
                        isAdmin ? <h1>Medico</h1> : <h1>Usuario</h1> 
                      }
                      {
                        iSuperAdmin ? <h1>Admin</h1> : <h1></h1>
                      }
                      </span>
                    </div>
                  </div>
             
                  <div className="col-sm-4">
                    <div className="description-block">
                      <h5 className="description-header">Numero de Pacientes a cargo</h5>
                      <span className="description-text">0</span>
                    </div>
                   
                  </div>
              
                </div>
               {/*  <button onClick={handleShow} className="btn btn-primary">Actualizar</button> */}
              </div>
            </div>
            {
              iSuperAdmin ? ToolAdmin() : <h1></h1>
            }
            



      
      </>
    )
}

export default Config
