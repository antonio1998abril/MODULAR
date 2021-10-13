import React, { useContext,useEffect, useState } from 'react';
import {Form,Col,Button,Modal} from 'react-bootstrap'; 
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import swal from 'sweetalert';

function CreatePaciente() {
    const initialState = {
        name:'',
        lastname:'',
        tel:'',
        email:'',
        peso:'',
        sexo:'',
        edad:'', 
        diabetesTipo:'',
        IncioEnfermedad:''
    }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [onEdit,setOnEdit] =useState(false)
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [paciente,setPaciente] = useState(initialState);
    const [idEditPaciente,setidPaciente] = state.Paciente.idPaciente;
    const [token] = state.token
    const [callback,setCallback]=state.Paciente.callback

     /* SET DATA */
    const handleClose=()=>{
        setShow(false);
        setPaciente(initialState)
        setidPaciente('')
    }
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setPaciente({...paciente,[name]:value})
    }
    /* POST AND PUT */
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            await axios.post('/api/createpaciente',{...paciente},{
                headers:{Authorization:token}
            })
            swal({icon:"success",text:`Nuevo Paciente Agregado ${paciente.name}`,timer:"2000",buttons: false});
            setShow(false);
            setPaciente(initialState)
            setidPaciente('')
            setCallback(!callback)
        }catch(err){
            swal({
                title:"¡Ups",
                text:err.response.data.msg,
                icon:"error",
                button:"OK"
            })
        }
    }
    return (
        <>
            <div  onClick={handleShow} className="frame">
                <div className="hex-outer ha shadow"></div>
                <div className="hex-outer hb shadow"></div>
                <div className="hex-outer hc shadow"></div>
                <div className="hex-inner ha shadow"></div>
                <div className="hex-inner hb shadow"></div>
                <div className="hex-inner hc shadow"></div>
                <div className="label">
                <a > +</a>
                </div> 
            </div>

           {/*  MODAL DATASET  */}

            <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>{onEdit ? `Update` : "Crea un Nuevo paciente"}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                {/* Send a image */}
{/*                 <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}></input>
                    {
                        loading ? <div id="file_img"><Loader/></div>
                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url:''} alt=""></img>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                    }
                </div> */}
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} >
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control name="name" type="name" placeholder="Nombre"
                         value={paciente.name} onChange={handleChangeInput}
                    />
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control name="lastname" type="lastname" placeholder="Apellidos" 
                         value={paciente.lastname} onChange={handleChangeInput}
                    />
                    </Form.Group>
                </Form.Row>

                <Form.Group >
                    <Form.Label>Peso</Form.Label>
                    <Form.Control  name="peso"  type="number" min="10" max="300" placeholder="peso" 
                         value={paciente.peso} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Telefono Celular</Form.Label>
                    <Form.Control type="number" name="tel"  placeholder="Telefono Celular" 
                     value={paciente.tel} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email"  rows={3} placeholder="Email" 
                     value={paciente.email} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control name="edad"  type="number" placeholder="Ingresa la edad del paciente" 
                     value={paciente.edad} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Sexo Biologico </Form.Label>
                    <select  className="form-select form-select-lg mb-3"  name="sexo" value={paciente.sexo} onChange={handleChangeInput}>
                    <option value="">Click</option>
                            <option value="mujer" >Mujer</option>
                            <option value="hombre" >Hombre</option>
                    </select>
                </Form.Group>  
                
                <Form.Group >
                    <Form.Label>Tipo de diabetes</Form.Label>
                    <Form.Control name="diabetesTipo"   placeholder="Escribe el topo de diabetes" 
                     value={paciente.diabetesTipo} onChange={handleChangeInput}
                    />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Inicio Enfermedad</Form.Label>
                    <Form.Control name="IncioEnfermedad" type="date" placeholder="Inicio Enfermedad"  min="1900-01-01" max="2021-12-31"
                     value={paciente.IncioEnfermedad} onChange={handleChangeInput}
                    />
                </Form.Group>
            <Button variant="primary" type="submit" >
            {onEdit ? "Actualizar" : "Hecho"}
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
}

export default CreatePaciente
