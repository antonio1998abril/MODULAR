import React from 'react'
import {Row,Col} from 'react-bootstrap'
const moment = require('moment')

function GlucosaList({historial}) {
    let  getDate = new Date(historial.updatedAt)
    let date = moment(getDate,'YYYY-MM-DD').format("YYYY-MM-DD, hh:mm A");
    return (
        <>
            <Row>
                <Col xs={12} md={8}>
                  El dia  {date} fue el nivel de glucosa de <b>{historial.Glucosa}</b>
                  <span className="badge badge-danger">Delete</span>&nbsp;
                  <span className="badge badge-warning">Update</span>
                </Col>
            </Row>
            <br/>
        </>
    )
}

export default GlucosaList
