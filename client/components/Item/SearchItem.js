import React from 'react'
import profilePic from '../../public/testuser.png'
import Image from 'next/image'
function SearchItem() {
    return (
    <>
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
    </>
    )
}

export default SearchItem
