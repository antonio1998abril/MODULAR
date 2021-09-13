import React, { useContext, useEffect, useState } from 'react'
import Router from 'next/router';
import { GlobalState } from '../components/GlobalState';
import Image from 'next/image'
import profilePic from '../public/testuser.png'
import Filter from '../components/Search/Filter'
function Result() {

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
        <>

{/* <div className="container-fluid">
            <h2 className="text-center display-4">Buscar</h2>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form>
                        <div className="input-group">
                            <input type="search" className="form-control form-control-lg" placeholder="Escribe..."/>
                            <div className="input-group-append">
                                <button type="submit" className=" btn-lg btn-search">
                                 <FontAwesomeIcon icon={faSearch}  className="searchC" transform="shrink-3"  /> 
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div> */}
<Filter/>
        <div className="paciente result">
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <h4> Result</h4>
                        <div className="post">
                            <div className="user-block">
                            <Image className="img-circle img-bordered-sm" src={profilePic}  alt="user image"/>
                                <span className="username">
                                <a href="#">Jonathan Burke Jr.</a>
                                </span>

                                <span className="description">Shared publicly - 7:45 PM today</span>

                            </div>
                            <p>
                            Lorem ipsum represents a long-held tradition for designers,
                            typographers and the like. Some people hate it and argue for
                            its demise, but others ignore.
                            </p>  
                            <div className="bodyButton">
                            <button className="buttonOption">
                                <span className="buttonOption__inner">See</span>
                            </button>

                            <button className="buttonOption buttonOption--secondary">
                                <span className="buttonOption__inner">Image</span>
                            </button>
                            </div>
                        </div>


                        <div className="post">
                            <div className="user-block">
                            <Image className="img-circle img-bordered-sm" src={profilePic} width="20" height="20" alt="user image"/>
                                <span className="username">
                                <a href="#">Jonathan Burke Jr.</a>
                                </span>

                                <span className="description">Shared publicly - 7:45 PM today</span>

                            </div>
                            <p>
                            Lorem ipsum represents a long-held tradition for designers,
                            typographers and the like. Some people hate it and argue for
                            its demise, but others ignore.
                            </p>  
                            <div className="bodyButton">
                            <button className="buttonOption">
                                <span className="buttonOption__inner">See</span>
                            </button>

                            <button className="buttonOption buttonOption--secondary">
                                <span className="buttonOption__inner">Image</span>
                            </button>
                            </div>
                        </div>

                        <div className="post">
                            <div className="user-block">
                            <Image className="img-circle img-bordered-sm" src={profilePic} width="20" height="20" alt="user image"/>
                                <span className="username">
                                <a href="#">Jonathan Burke Jr.</a>
                                </span>

                                <span className="description">Shared publicly - 7:45 PM today</span>

                            </div>
                            <p>
                            Lorem ipsum represents a long-held tradition for designers,
                            typographers and the like. Some people hate it and argue for
                            its demise, but others ignore.
                            </p>  
                            <div className="bodyButton">
                            <button className="buttonOption">
                                <span className="buttonOption__inner">See</span>
                            </button>

                            <button className="buttonOption buttonOption--secondary">
                                <span className="buttonOption__inner">Image</span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Result
