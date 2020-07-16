import React, { Component} from 'react';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import {Redirect} from "react-router-dom";
import axios from 'axios';
import ReactTimeout from 'react-timeout'

class RegisterForm extends Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {},
        redirect: false,
        successMessage: null
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
      this.setGender = this.setGender.bind(this)

    };

    setGender(e) {
      let fields = this.state.fields;
      fields["gender"] = e.target.value;
      this.setState({
        fields
      });
    }

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    changeRedirect = () => {
      this.setState({redirect: true})
    }

    async submituserRegistrationForm(e) {
      e.preventDefault();
      this.state.redirect = false
      if (this.validateForm()) {
          let fields = {};
          setTimeout(() => this.changeRedirect(), 2000)
          fields["username"] = "";
          fields["emailid"] = "";
          fields["mobileno"] = "";
          fields["password"] = "";
          fields["dob"] = "";
          this.setState({fields:fields});
          console.log(this.state);
          await axios.post('http://localhost:4500/api/Users', {
            Name: this.state.fields.username,
            Email: this.state.fields.emailid,
            MobileNumber: this.state.fields.mobileno,
            Password: this.state.fields.password,
            DateOfBirth: this.state.fields.dob,
            Sex: this.state.fields.gender
          })
          .then(res => {
            console.log(res);
            this.setState({successMessage: 'Registration Successfull !'})
          })
          .catch((err) => {
            console.log(err)
          })
        //   alert("Form submitted");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
        this.setState({successMessage: 'Change Fields...'})
      }

      if(!fields["dob"]){
          formIsValid = false;
          errors["dob"] = "*Please enter your DOB"
          this.setState({successMessage: 'Change Fields...'})
      }    

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
          this.setState({successMessage: 'Change Fields...'})
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
        this.setState({successMessage: 'Change Fields...'})
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
        this.setState({successMessage: 'Change Fields...'})
      }

      if (!fields["mobileno"]) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter your mobile no.";
        this.setState({successMessage: 'Change Fields...'})
      }

      if (typeof fields["mobileno"] !== "undefined") {
        if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobileno"] = "*Please enter valid mobile no.";
        }
        this.setState({successMessage: 'Change Fields...'})
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
        this.setState({successMessage: 'Change Fields...'})
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
        this.setState({successMessage: 'Change Fields...'})
      }

      this.setState({
        errors: errors
      });
      return formIsValid;
    }


  render() {
    const redirect = this.state.redirect;
        if (redirect === true) {
            return <Redirect to="/login" />
        }
    return (
    
     <div className="col-md-6 col-md-7 col-md-8 col-md-9 col-md-10 login-form-1">
        <h2 className="h">Register Here !</h2>
        <form name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
          <div className="form-group text-left">
            <label>Username</label>
            <input className="form-control" type="text" 
            name="username" placeholder="Enter Name" value={this.state.fields.username || ''} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.username}</div>
          </div>
          <div className="form-group text-left">
            <label>Email ID:</label>
            <input className="form-control" type="text" name="emailid" placeholder="Enter Email ID" value={this.state.fields.emailid || ''} onChange={this.handleChange}  />
            <div className="errorMsg">{this.state.errors.emailid}</div>
          </div>
          <div className="form-group text-left">
            <label>Mobile No:</label>
            <input className="form-control" type="text" name="mobileno" placeholder="Enter Mobile Number" value={this.state.fields.mobileno || ''} onChange={this.handleChange}   />
            <div className="errorMsg">{this.state.errors.mobileno}</div>
          </div>
          <div className="form-group text-left">
            <label>Password</label>
            <input className="form-control" type="password" name="password" placeholder="Enter Password" value={this.state.fields.password || ''} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.password}</div>
          </div>
          <div className="form-group text-left">
            <label>Date Of Birth:</label>
            <input className="form-control" type="date" name="dob" placeholder="Enter Date of Birth..." value={this.state.fields.dob || ''} onChange={this.handleChange}  />
            <div className="errorMsg">{this.state.errors.dob}</div>
          </div>
          <RadioGroup className="form-group" style={{ display: 'inline' }} onChange={this.setGender.bind(this)} row={true} >
            <FormControlLabel  control={<Radio />} label="MALE" value="MALE" />
            <FormControlLabel  control={<Radio />} label="FEMALE" value="FEMALE"/>
          </RadioGroup><br/>
          <button type="submit" className="btn btn-primary">Register</button>  
          <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
            {this.state.successMessage}
          </div>      
        </form>
      </div>
      );
  }
}

export default ReactTimeout(RegisterForm);