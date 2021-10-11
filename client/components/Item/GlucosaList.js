import React from 'react'
import {Row,Col} from 'react-bootstrap'
function GlucosaList({historial}) {
    let  date = new Date(historial.createdAt)
    return (
        <>
            <Row>
                <Col xs={12} md={8}>
                  El dia {date.getUTCDate()}/{date.getMonth()}/{date.getFullYear()}, a las {date.getHours()}:{date.getMinutes()} fue de <b>{historial.Glucosa}</b>
                  <span className="badge badge-danger">Delete</span>&nbsp;
                  <span className="badge badge-warning">Update</span>
                </Col>
            </Row>
            <br/>
        </>
    )
}

export default GlucosaList
