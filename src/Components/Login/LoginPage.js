import React, { Component } from 'react'
import axios from 'axios';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Redirect} from 'react-router-dom';
import ReactTimeout from 'react-timeout'
import Navbar from '../../Navbar'

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            email : '',
            password : '',
            redirect: false,
            successMessage: null
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
    }

    handleChangeEmail = (e) => {
       this.setState({email: e.target.value});
    }

    handleChangePass = (e) => {
        this.setState({password: e.target.value});
    }

    changeRedirect = () => {
        this.setState({redirect: true})
    }

    changeSuccessNull = () => {
        this.setState({successMessage: null})
    }

    checkUser = (userdata) => {
         if(userdata.success === true){
             this.setState({successMessage: userdata.message})
             setTimeout(() => this.changeRedirect(), 1200)
         }else{
            this.setState({successMessage: userdata.message})
         }
    }



    handleSubmitClick = async (e) => {
        e.preventDefault();
        const userDetails = {
            userEmail: this.state.email,
            userPass: this.state.password
        }
        if(this.state.email === '' && this.state.password === '') {
            this.setState({successMessage: 'Enter Email and Password'})
        }else{
            await axios.post('http://localhost:4500/api/Login', userDetails)
                .then((res) => {
                const userdata = res.data;
                this.checkUser(userdata)           
        })
        .catch(err => console.log(err));
        }
        
        this.setState({email: '', password:''})
        
    }

    render() {
        const redirect = this.state.redirect
        if (redirect === true) {
            return <Redirect to="/tabsHome" />
        }
        return (
            <div>
                <Navbar />
                <div className="col-md-6 col-md-7 col-md-8 login-form-2 tp5">
                <form method="get" onSubmit={this.handleSubmitClick}>
                    <h3>Login</h3>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" 
                        className="form-control form-group text-left" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChangePass} 
                    />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"                        
                        >Login
                    </button>
                    <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                            {this.state.successMessage}
                    </div> 
                </form>           
            </div>
            </div>
                
    )
    
    }
}

export default ReactTimeout(LoginPage)
















// import React, {useState} from 'react';
// import axios from 'axios';
// import './Login.css';
// import {Redirect} from 'react-router-dom';


// function LoginForm(props) {
//     const [state , setState] = useState({
//         email : "",
//         password : "",
//         redirect: false,
//         successMessage: null
//     })
//     const handleChange = (e) => {
//         const {id , value} = e.target   
//         setState(prevState => ({
//             ...prevState,
//             [id] : value
//         }))
//     }

//     const handleSubmitClick = async (e) => {
//         e.preventDefault();
//         await axios.get('http://localhost:4500/api/Users')
//         .then((res) => {
//             const userdata = res.data.user;
//             for(let i = 0; i<userdata.length; i++) {
//                 if(userdata[i].Email === state.email && userdata[i].Password === state.password){
//                     console.log("true");
                    
//                 }else{
                    
//                 }
//             }
//         })
//     }
   
    
//     return(
        
//         <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
//             <form onSubmit={handleSubmitClick}>
//                     {
//                     state.redirect === true ? <Redirect to="/register" /> : null
//                     }
//                 <div className="form-group text-left">
//                 <label htmlFor="exampleInputEmail1">Email address</label>
//                 <input type="email" 
//                        className="form-control" 
//                        id="email" 
//                        aria-describedby="emailHelp" 
//                        placeholder="Enter email" 
//                        value={state.email}
//                        onChange={handleChange}
//                 />
//                 <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                 </div>
//                 <div className="form-group text-left">
//                 <label htmlFor="exampleInputPassword1">Password</label>
//                 <input type="password" 
//                        className="form-control" 
//                        id="password" 
//                        placeholder="Password"
//                        value={state.password}
//                        onChange={handleChange} 
//                 />
//                 </div>
//                 <div className="form-check">
//                 </div>
//                 <button 
//                     type="submit" 
//                     className="btn btn-primary"
//                     >Submit</button>
//             </form>
//             <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
//                 {state.successMessage}
//             </div>            
//         </div>
//     )
// }

// export default LoginForm;