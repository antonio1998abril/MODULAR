import React from 'react'
import profilePic from '../../public/testuser.png'
import Image from 'next/image'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
function SearchItem({paciente}) {
    return (
    <>
        <div className="post">
            <div className="user-block">
                <Image className="img-circle img-bordered-sm" src={profilePic} width="20" height="20" alt="user image"/>
                    <span className="username">
                        <a href="#">{paciente.name} {paciente.lastname}</a>
                    </span>
            <span className="description">Email - {paciente.email}, Tel - {paciente.tel}</span>
            </div>
                <p></p>  
            <div className="bodyButton">
                <button className="buttonOption">
                    <span className="buttonOption__inner">Ver Expedientes</span>
                </button>

                <button className="buttonOption buttonOption--secondary">
                    <span className="buttonOption__inner">Ver Info del paciente</span>
                </button>
            </div>
        </div>
    </>
    )
}

export default SearchItem
