import React, { useContext, useState } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import { GlobalState } from '../GlobalState'
const moment = require('moment')

function GlucosaList({historial,deleteRegisterGlucosa}) {
    const state = useContext(GlobalState)


    let  getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    const [labelEnable,setlabelEnable] = useState(false);
    const  [UpValueEvaluacion, setUpValueEvaluacion] =useState('')

    const initialStateGlucosa = {
        Glucosa:'',
      }
    
    const [glucosa,setGlucosa] = useState(initialStateGlucosa);



  /*   upValueEvaluacion: [UpValueEvaluacion, setUpValueEvaluacion], */ 
    
    const updateRegisterGlucosa = async(id) => {
        setlabelEnable(true);
        setUpValueEvaluacion(historial._id)
    }

    const handleChangeInput= e =>{
        const {name,value} = e.target
        setGlucosa({...glucosa,[name]:value})
      }



    const labelUp = () => {
        return (
            <>
            <Col className="labelCommon"   md={3} >
            <Form.Control  className="labelCommon"  type="number" size="sm" defaultValue={historial.Glucosa}  onChange={handleChangeInput}/>
            </Col>
            </>
        )
    }
    const  buttonBlock = () => {
        return (
            <>
                <button className="btn badge badge-dark" onClick = {() => updateRegisterGlucosa()}>Actualizar</button>
            </>
        )
    }
    
    return (
        <>
            <Row>
                 <Form.Label  className="textList" lg={10} >
                En la fecha {date} se registro el nivel de glucosa de &nbsp; { labelEnable ? labelUp(): ( <b>{historial.Glucosa} </b>  )}
                </Form.Label>
                  <button className="btn badge badge-danger" onClick={() => deleteRegisterGlucosa(historial._id)}>Eliminar</button>&nbsp;
                  {labelEnable ?  buttonBlock() : (<button className="btn badge badge-warning" onClick = {() => updateRegisterGlucosa()}>Actualizar</button>)}
            </Row>
            <br/>
        </>
    )
}

export default GlucosaList
