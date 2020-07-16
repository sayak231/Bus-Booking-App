import React from 'react'
import Bus from '../src/bus.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
* @author
* @function Navbar
**/

const Navbar = (props) => {
  return(
    <div>
        <nav className="navbar sticky-top navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
            <img src={Bus} width="50" height="50" className="d-inline-block align-top" alt="" />            
            </a>
            <span className="navbar-text">
                <h2 style={{fontColor: 'white'}}>My Bus App</h2>
            </span>
            
        </nav>
    </div>
   )

 }

export default Navbar;