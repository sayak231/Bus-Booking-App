import React from 'react'
import Navbar from '../../Navbar'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from '../Registration/Register'
import Login from '../Login/Login'

/**
* @author
* @function Home
**/

const Home = () => {
  return(
    <div>
        <Navbar />
        
        <div className="container login-container">
          <div className="row">
          <div className="col-md-6 login-form1"><br/>
          <h2 className="h">Login Here if already Registered, else ---></h2>
          <Login />
          </div>
          <div className="col-md-6 login-form2">
          <Register />
          </div>   
          </div>
                
        </div>
    </div>  
   )

 }

export default Home