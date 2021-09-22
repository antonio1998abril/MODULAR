import React, { useContext, useEffect, useState } from 'react'
import profilePic from '../../public/testuser.png'
import Image from 'next/image'
import { Modal,Form,Col } from 'react-bootstrap';
import ExpedienteSearch from '../../components/Item/ExpedienteSearch';

function SearchItem({paciente}) {
    const [medico,setMedico] = useState(false);
    const [role] = (paciente.Encargado_id.role)
    useEffect(() =>  {
        if(role === '1') setMedico(true)
    },[role]);

    const [showInfo,setShowInfo]= useState(false);
    const [showExpediente,setShowExpediente] = useState(false);

    const handleShowInfo = () => setShowInfo(true);
    const handleShowExpediente = () => setShowExpediente(true);

    const handleClose = () =>{
        setShowInfo(false);
        setShowExpediente(false);
    }

    const handleAdd =() =>{
        console.log("Copeado")
    }
    return (
    <>
        <div className="post">
            <div className="user-block">
                <Image className="img-circle img-bordered-sm" src={profilePic} width="20" height="20" alt="user image"/>
                    <span className="username">
                        <a href="#">{paciente.name} {paciente.lastname}</a>
                    </span>
            <span className="description">Email - {paciente.email}, Tel - {paciente.tel}</span>
            </div>
                <p>En caso de Emergencias llama al {medico ? <>Medico</> : <>Usuario</> } {paciente.Encargado_id.name} {paciente.Encargado_id.lastname} - {paciente.tel}</p>  
                <p>Email de contacto: {paciente.Encargado_id.email}</p>
            <div className="bodyButton">
                <button className="buttonOption">
                    <span className="buttonOption__inner" onClick={handleShowExpediente}>Ver Expedientes</span>
                </button>

                <button className="buttonOption buttonOption--secondary">
                    <span className="buttonOption__inner" onClick={handleShowInfo}>Ver Info del paciente</span>
                </button>

                <button className="buttonOption addExpediente buttonOption--teal">
                    <span className="buttonOption__inner" onClick={handleAdd}>Agrear A mis Pacientes</span>
                </button>

            </div>
        </div>

        <Modal show={showInfo} onHide={handleClose}
            size='lg'
            aria-labelledby= "contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton >
                <Modal.Title> Informacion del Paciente {paciente.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group as={Col} >
                <Form.Label>Nombre:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.name}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Apellidos:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.lastname}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Telefono:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.tel}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Correo Electronico:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.email}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Peso:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.peso}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Sexo:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.sexo}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Edad:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.edad}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Tipo de Diabetes:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.diabetesTipo}
            </label>
            </Form.Group>
            <Form.Group as={Col} >
                <Form.Label>Inicio de la Enfermedad:</Form.Label>
            <label className="form-control font-weight-bold">
                {paciente.IncioEnfermedad}
            </label>
            </Form.Group>

            
            </Modal.Body>

        </Modal>


        <Modal show={showExpediente} onHide={handleClose}
            size='lg'
            aria-labelledby= "contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton >
                <Modal.Title> Expediente del Usuario {paciente.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    paciente.allExpedientes.map(item => {
                        return <ExpedienteSearch key= {item._id} data={item}/>
                    })
                }

            </Modal.Body>

        </Modal>
    </>
    )
}

export default SearchItem
