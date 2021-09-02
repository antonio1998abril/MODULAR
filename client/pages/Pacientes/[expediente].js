import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../components/GlobalState';
import Router/* ,{ useRouter } */ from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileMedical,faEye,faTrash} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import profilePic from '../../public/testuser.png'




const Expediente =({data,result}) =>{
  const state = useContext(GlobalState);
  const [loaded,setLoaded] = useState(false)
  const [islogged]= state.User.isLogged
  const [token] = state.token

  const [actualPaciente]= useState(data[0])
  const [actualExpediente]= useState(data[0].Expediente)
  const [actualRegimen] = useState(data[0].Regimen)
  
  const ExpedienteState = { 
    InicioEnfermedadMentales:actualExpediente.InicioEnfermedadMentales,
    Medicamentos:actualExpediente.Medicamentos, 
    Alergias:actualExpediente.Alergias, 
    Antecedentes:actualExpediente.Antecedentes,
    EstatusDental:actualExpediente.EstatusDental,
    GlucosaSangre:actualExpediente.GlucosaSangre,
    HemoglobinaGlucosilada:actualExpediente. HemoglobinaGlucosilada, 
    Microalbuminuria:actualExpediente.Microalbuminuria,  
    NivelCoresterol:actualExpediente.NivelCoresterol,
    NivelTrigliseridos:actualExpediente.NivelTrigliseridos, 
    Electrocadriograma:actualExpediente.Electrocadriograma,
    Cuerpodaño:actualExpediente.Cuerpodaño,
    dialisis:actualExpediente.dialisis,
    OtrasEnfermedades:actualExpediente.OtrasEnfermedades,
    FactorRiesgo:actualExpediente.FactorRiesgo,
    EstadoMental:actualExpediente.EstadoMental
  }
  
  const RegimenState = {
    Lunes:actualRegimen.Lunes,
    Martes:actualRegimen.Martes,
    Miercoles:actualRegimen.Miercoles,
    Jueves:actualRegimen.Jueves,
    Viernes:actualRegimen.Viernes,
    Sabado:actualRegimen.Sabado,
    Domingo:actualRegimen.Domingo,
    Ejercicio:actualRegimen.Ejercicio,
    Comida:actualRegimen.Comida
  }

  /* Verify if user is Logged */
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


/* SAVE INFORMATION */
const [expediente, setExpediente] = useState(ExpedienteState)
const [regimen, setRegimen] = useState(RegimenState)

const handleChangeExpediente = e =>{
  e.preventDefault()
  const {name,value}=e.target
  setExpediente({...expediente,[name]:value})
}  

const handleChangeRegimen = e =>{
  const {name,value}=e.target
  setRegimen({...regimen,[name]:value})
}  

const handleSubmitExpediente=async e=>{
  e.preventDefault()
  try{  
       await axios.post(`/api/createExpediente/${actualPaciente._id}`,{...expediente},{
        headers:{Authorization: token}
       })
       swal({icon:"success",title:"Bien",text:"Datos Actualizados!!",timer:"2000"});
  }catch(err){
   swal({
       title:"ERROR",
       text:err.response.data.msg,
       icon:"error",
       button:"OK"
   })
  }
  
}

const handleSubmitRegimen=async e=>{
  e.preventDefault()
  try{
        await axios.post(`/api/createRegimen/${actualPaciente._id}`,{...regimen},{
          headers:{Authorization: token}
         })
       swal({icon:"success",text:"Bien!!",timer:"2000"}) ;
  }catch(err){
   swal({
       title:"ERROR",
       text:err.response.data.msg,
       icon:"error",
       button:"OK"
   })
  }
  
}
/* SAVE INFORMATION */
if (!loaded) { return <div></div> } 
   return (
    <div>
      <div className="expediente">
        <div className="info-expe">
        <div className="img-container">
          <Image id="profile-pic" src={profilePic} alt="profile_pic" width="200" height="200"/> 
          <div id="profile-patient-name">{actualPaciente.name} {actualPaciente.lastname}</div>
        </div>

        </div>
        <div className="info-expe-data">
          <div className="info-title-data">
            Informacion
          </div>
        <div><span><b>Telefono: </b></span> {actualPaciente.tel}</div>
        <div><span><b>Email:</b></span> {actualPaciente.email}</div>
        <div><span><b>Peso: </b></span> {actualPaciente.peso}</div>
        <div><span><b>Sexo: </b></span> {actualPaciente.sexo}</div>
        <div><span><b>Edad: </b></span> {actualPaciente.edad}</div>
        <div><span><b>Diabetes Tipo: </b></span> {actualPaciente.diabetesTipo}</div>
        <div><span><b>Presion: </b></span> {actualPaciente.presion}</div>
        </div>

        <div className="data-expe ">
        <div className="col-md-12">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Datos de Laboratorio</h3>
              </div>

              <form className="form-horizontal"  onSubmit={handleSubmitExpediente}>
                <div className="card-body expe-row">

                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Nivel de Glucosa</label>
                    <div className="col-sm-12">
                      <input type="text" name="GlucosaSangre"   value={expediente.GlucosaSangre}
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Glucosa"/>
                    </div>
                </div>

                
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Nivel Hemoglobina Gloucosilada</label>
                    <div className="col-sm-12">
                      <input type="text" name="HemoglobinaGlucosilada"
                      value={expediente.HemoglobinaGlucosilada} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Hemoglobina Gloucosilada"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Nivel de Microalbuminuria</label>
                    <div className="col-sm-12">
                      <input type="text"  name="Microalbuminuria"
                      value={expediente.Microalbuminuria} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Microalbuminuria"/>
                    </div>
                </div>

                
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Nivel de Colesterol</label>
                    <div className="col-sm-12">
                      <input type="text"  name="NivelCoresterol"
                      value={expediente.NivelCoresterol} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Colesterol"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Nivel de Trigliseridos</label>
                    <div className="col-sm-12">
                      <input type="text"  name="NivelTrigliseridos"
                      value={expediente.NivelTrigliseridos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Trigliseridos"/>
                    </div>
                </div>

                
                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Electrocadriograma</label>
                    <div className="col-sm-12">
                      <input type="text"  name="Electrocadriograma"
                      value={expediente.Electrocadriograma} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Electrocadriograma"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Dialisis</label>
                    <div className="col-sm-12">
                      <input type="text"  name="dialisis"
                      value={expediente.dialisis} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Resultado"/>
                    </div>
                </div>

                </div>
            
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>
          <div className="expe-row">
            <div className="col-md-6">
              <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Consideraciones fisicas</h3>
              </div>

              <form className="form-horizontal"   onSubmit={handleSubmitExpediente} >
                <div className="card-body">

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Antecedentes</label>
                    <div className="col-sm-9">
                      <textarea type="text" rows="2"   name="Antecedentes"
                      value={expediente.Antecedentes}
                      onChange={handleChangeExpediente} className="form-control"   placeholder="Antecedentes"/>
                    </div>
                </div>


                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Medicamentos</label>
                    <div className="col-sm-9">
                      <input type="text"  name="Medicamentos"
                      value={expediente.Medicamentos} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Medicamentos"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Alergias</label>
                    <div className="col-sm-9">
                      <input type="text"  name="Alergias"
                      value={expediente.Alergias} 
                      onChange={handleChangeExpediente} className="form-control"  placeholder="Alergias"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Problemas en el cuerpo</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="Cuerpodaño"
                      value={expediente.Cuerpodaño} 
                      onChange={handleChangeExpediente} rows="2" className="form-control" placeholder="Daños"/>
                    </div>
                </div>

                
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Otras enfermedades</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="OtrasEnfermedades"
                      value={expediente.OtrasEnfermedades} 
                      onChange={handleChangeExpediente} rows="2" className="form-control" placeholder="Otros"/>
                    </div>
                </div>
                
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Estado Dental</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="EstatusDental"
                      value={expediente.EstatusDental} 
                      onChange={handleChangeExpediente} rows="2" className="form-control"  placeholder="Estado Dental"/>
                    </div>
                </div>
              
                </div>
            
                <div className="card-footer">
                  <button type="submit"  className="btn btn-warning">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>


            <div className="col-md-6">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Consideraciones Mentales</h3>
              </div>

              <form className="form-horizontal"   onSubmit={handleSubmitExpediente} >
                <div className="card-body">

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Inicio Complicaciones</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="InicioEnfermedadMentales"
                      onChange={handleChangeExpediente} value={expediente.InicioEnfermedadMentales} 
                      rows="2" className="form-control"  placeholder="Incio"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Estado Mental</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="EstadoMental"
                      onChange={handleChangeExpediente} 
                      value={expediente.EstadoMental}  rows="4" className="form-control"  placeholder="Estado Mental"/>
                    </div>
                </div>

                
                <div className="form-group row">
                    <label  className="col-sm-3 col-form-label">Complicaciones</label>
                    <div className="col-sm-9">
                      <textarea type="text"  name="FactorRiesgo"
                      onChange={handleChangeExpediente} 
                      value={expediente.FactorRiesgo} rows="4" className="form-control" placeholder="Complicaciones"/>
                    </div>
                </div> 

                </div>           
                <div className="card-footer">
                  <button type="submit" className="btn btn-warning">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>



            <div className="col-md-12">
         <div className="paciente card-info ">
              <div className="card-header">
                <h3 className="card-title-paciente">Regimen Alimenticio y de Ejercicio</h3>
              </div>

              <form className="form-horizontal"  onSubmit={handleSubmitRegimen}>
                <div className="card-body expe-row">

                <div className="form-group ">
                    <label className="col-sm-12 col-form-label">Ejercicio  general al dia</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="5" className="form-control"  name="Ejercicio"
                    value={regimen.Ejercicio} onChange={handleChangeRegimen} placeholder="Ejercicios"/>
                    </div>
                </div>

                
                <div className="form-group ">
                    <label  className="col-sm-12 col-form-label">Regimen alimenticio general al dia</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="5" className="form-control"  name="Comida"
                    value={regimen.Comida} onChange={handleChangeRegimen} placeholder="Comidas"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Lunes</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control"  name="Lunes"
                     value={regimen.Lunes}  onChange={handleChangeRegimen} placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Martes</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control"  name="Martes"
                     value={regimen.Martes} onChange={handleChangeRegimen} placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Miercoles</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control"  name="Miercoles"
                     value={regimen.Miercoles} onChange={handleChangeRegimen}  placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Jueves</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control" name="Jueves"
                    value={regimen.Jueves} onChange={handleChangeRegimen}  placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>

                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Viernes</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control" name="Viernes"
                    value={regimen.Viernes} onChange={handleChangeRegimen}  placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>


                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Sabado</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3"  className="form-control" name="Sabado"
                    value={regimen.Sabado} onChange={handleChangeRegimen}  placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>


                <div className="form-group ">
                    <label  className="col-sm-6 col-form-label">Domingo</label>
                    <div className="col-sm-12">
                    <textarea type="text" rows="3" className="form-control"  name="Domingo"
                    value={regimen.Domingo} onChange={handleChangeRegimen} placeholder="Especificar que hacer al dia"/>
                    </div>
                </div>

                </div>
            
                <div className="card-footer">
                  <button type="submit" className="btn btn-info">Actualizar</button>
                </div>
            
              </form>
            </div> 
            </div>



            </div>
        </div>
    
        <div className="historial">
         <div className="paciente btn-success ">
              <button >
                <h3 className="card-title-nuevoExpediente">Crear un nuevo Expediente</h3>
                <FontAwesomeIcon icon={faFileMedical}   className="iconCardButton "  />
              </button>
          </div> 
        </div>

        <div className="historial">
         <div className="paciente card-info ">
              <div className="card-header ">
                <h3 className="card-title-paciente">Historial:</h3>
              </div>
          </div> 
        </div>


        <div className="result-expe">
        
        <div><span>Fecha:</span> <span>item-value</span></div>
        <div>
          <span>Eliminar </span> 
        
            <button className="btn btn-danger">
              <span>
                <FontAwesomeIcon icon={faTrash}    />
              </span>
            </button>
        </div>

        <div>
          <span>Ver </span> 
                    
            <button  className="btn btn-primary">
            <span>    
                <FontAwesomeIcon icon={faEye}     />
                </span>
            </button>
          
        </div>

        </div> 


        <div className="result-expe">
        
        <div><span>Fecha:</span> <span>item-value</span></div>
        <div>
          <span>Eliminar </span> 
        
            <button className="btn btn-danger">
              <span>
                <FontAwesomeIcon icon={faTrash}    />
              </span>
            </button>
        </div>

        <div>
          <span>Ver </span> 
                    
            <button  className="btn btn-primary">
            <span>    
                <FontAwesomeIcon icon={faEye}     />
                </span>
            </button>
          
        </div>

        </div> 
        

      </div>


    </div>
    )
}

export default Expediente


 export const getServerSideProps = async ({query}) => { 

  const res = await fetch(`http://localhost:5000/api/getExpediente/${query.expediente}`)
  const data = await res.json()
  const result =  JSON.stringify(data)
  if (!data) {
    return {
      notFound: true,
    }
  }
   return {
    props: {data,result},
  } 
} 
 