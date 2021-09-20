import React, { useContext, useEffect, useState } from 'react'
import profilePic from '../../public/testuser.png'
import Image from 'next/image'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap';


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
                <p>A cargo del {medico ? <>Medico</> : <>Usuario</> } {paciente.Encargado_id.name} {paciente.Encargado_id.lastname} </p>  
                <p>Email de contacto: {paciente.Encargado_id.email}</p>
            <div className="bodyButton">
                <button className="buttonOption">
                    <span className="buttonOption__inner" onClick={handleShowExpediente}>Ver Expedientes</span>
                </button>

                <button className="buttonOption buttonOption--secondary">
                    <span className="buttonOption__inner" onClick={handleShowInfo}>Ver Info del paciente</span>
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

            </Modal.Body>

        </Modal>
    </>
    )
}

export default SearchItem
