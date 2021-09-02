import React, { useContext } from 'react'
import {Navbar,Nav,Container,Image} from 'react-bootstrap';
import Head from 'next/head'
import Link from 'next/link'
import { GlobalState } from '../GlobalState';
import axios from 'axios';
import swal from 'sweetalert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown,faBell} from '@fortawesome/free-solid-svg-icons'


function Header() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged

    const logoutUser = async()=>{
        await axios.get('/api/logout')
          localStorage.removeItem('firstLogin')
          swal({icon:"success",text:"Bye",timer:"2000"}).then(function(){
            window.location.href="/";
        },2000)
    }


    const userLogged = () => {
        return (
          <>
            <React.Fragment>&nbsp;
             
                <button className="headerPosition"  >
                    <Link  href="/">
                            <a className="aStyle">Home</a>
                    </Link>
                </button>
                <button className="headerPosition"  onClick={logoutUser}>
                    <a className="aStyle" >Log out</a>
                </button>

             
           
                
              <Link  href="/notification">
                        <div   className="bell-icon">
                            <a><span >{1}</span>
                            <FontAwesomeIcon icon={faBell } size="lg" className="bellStyle" /></a>
                        </div>
                    </Link>
          
            </React.Fragment>
          </>
        )
      }

    return (
        <>
        <Head>
          <title>&nbsp; Diabetins</title>
          <meta name="description" content="Diabetins" />
          <link rel="icon" href="/logo2.png" />
        </Head>
            
            <Navbar className="borderHeader" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <Image src="/logo2.png" alt="Diabetins" className="MagNet ubuntu"/>
                    &nbsp; Diabetins
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse >
                <Nav>
                    { 
                      islogged ? userLogged():
                      (
                        <React.Fragment>
                    <Link className="headerPosition" href="/login">
                            <a className="aStyle">Login</a>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className="headerPosition" href="/register">
                            <a className="aStyle">Register</a>
                    </Link>
                        </React.Fragment>
                      )  
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default Header
