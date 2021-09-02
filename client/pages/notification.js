import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faInfo,faBan,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router';
import { GlobalState } from '../components/GlobalState';

function Notification() {
  const state = useContext(GlobalState);
  const [loaded,setLoaded] = useState(false)
  const [islogged]= state.User.isLogged
  
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
        <div>
          <div className="card">
            <div className="card-body row">
              <div className="col-5 text-center d-flex align-items-center justify-content-center">
                <div className="">
                  <h2>DIABE <strong>TINS</strong></h2>
                  <p className="lead mb-5">Recordatorio<br/>
                  </p>
                </div>
              </div>
              <div className="col-7">
                <div className="form-group">
                  <label htmlFor="inputName">Name</label>
                  <input type="text" id="inputName" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail">E-Mail</label>
                  <input type="email" id="inputEmail" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputSubject">Subject</label>
                  <input type="text" id="inputSubject" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputMessage">Message</label>
                  <textarea id="inputMessage" className="form-control" rows="4"></textarea>
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary" value="Enviar Mensaje"/>
                </div>
              </div>
            </div>
          </div>
      <br/>

      <div className="col-md-12">
            <div className="card card-default">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-exclamation-triangle"></i>
                  Alertas
                </h3>
              </div>
       
              <div className="card-body">
                <div className="alert alert-danger alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faBan} /> Alert!</h5>
                  Danger alert preview. This alert is dismissable. A wonderful serenity has taken possession of my
                  entire
                  soul, like these sweet mornings of spring which I enjoy with my whole heart.
                </div>
                <div className="alert alert-info alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faInfo} /> Alert!</h5>
                  Info alert preview. This alert is dismissable.
                </div>
                <div className="alert alert-warning alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faExclamationTriangle} /> Alert!</h5>
                  Warning alert preview. This alert is dismissable.
                </div>
                <div className="alert alert-success alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                  <h5> <FontAwesomeIcon icon={faCheck} />Alert!</h5>
                  Success alert preview. This alert is dismissable.
                </div>
              </div>
        
            </div>
         
          </div>

        </div>
    )
}

export default Notification
