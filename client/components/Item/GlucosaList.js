import React, { useState } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
const moment = require('moment')

function GlucosaList({historial,deleteRegisterGlucosa}) {
    let  getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    const [labelEnable,setlabelEnable] = useState(false);
    
    const updateRegisterGlucosa = async(id) => {
        setlabelEnable(true);
    }

    const labelUp = () => {
        return (
            <>
            <Col xs={6} md={5} >
            <Form.Control type="number" size="sm"  placeholder="Nuevo valor" />
            </Col>
            </>
        )
    }
    
    return (
        <>
            <Row>
              {/*   <Col xs={12} md={12}> */}
                 {/* En la fecha {date} se registro el nivel de glucosa de <b>{historial.Glucosa}</b> &nbsp; */}
                 <Form.Label column="sm" lg={11} >
                En la fecha {date} se registro el nivel de glucosa de  { labelEnable ? labelUp(): ( <b>{historial.Glucosa} </b>  )}
    </Form.Label>
                  

                  <button className="btn badge badge-danger" onClick={() => deleteRegisterGlucosa(historial._id)}>Eliminar</button>&nbsp;
                  <button className="btn badge badge-warning" onClick = {() => updateRegisterGlucosa()}>Actualizar</button>
   {/*              </Col> */}
            </Row>
            <br/>
        </>
    )
}

export default GlucosaList
