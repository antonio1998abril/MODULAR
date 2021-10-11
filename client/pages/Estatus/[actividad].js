import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle} from '@fortawesome/free-solid-svg-icons'
function Actividad() {
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
            <h1>Mis Actividades</h1>
          </div>
          <div className="col-sm-6 d-none d-sm-block">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item active">Actividades</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section className="content pb-3">
      <div className="container-fluid h-100">
        <div className="paciente card-row card-secondary">
          <div className="card-header-kaban">
            <h3 className="card-title">
              HACER
            </h3>
            <FontAwesomeIcon className="circlePaciente" icon={faPlusCircle} />
          </div>
          <div className="card-body">
            <div className="paciente card-info card-outline">
              <div className="card-header-paciente ">
                <h5 className="card-title">COORRER</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#3</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">

              </div>
            </div>
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">MEDICINA</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#4</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
              <div className="card-body">


              </div>
            </div>
            <div className="paciente card-primary card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">CITA</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#6</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="paciente card-light card-outline">
              <div className="card-header-paciente">
                <h5 className="card-title">COMER</h5>
                <div className="card-tools">
                  <a href="#" className="btn btn-tool btn-link">#7</a>
                  <a href="#" className="btn btn-tool">
                    <i className="fas fa-pen"></i>
                  </a>
                </div>

              </div>
              <div className="card-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </p>
              </div>
            </div>
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
        </div>
    )
}

export default Actividad
