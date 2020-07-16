import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../../Navbar'
import './Bookseats.css'
import Layout from './layout.component'
import axios from 'axios'
import {Link} from 'react-router-dom'
/**
* @author
* @class Bookseats
**/

class Bookseats extends Component {

 constructor() {
     super()
     this.onClickData =this.onClickData.bind(this);
     this.addNames =this.addNames.bind(this);
     this.handleChange =this.handleChange.bind(this);
     this.handleChangeGender =this.handleChangeGender.bind(this);
     this.handleRemove =this.handleRemove.bind(this);
     this.onSubmit =this.onSubmit.bind(this);   
        this.state = {
            seat: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16",
            "17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
            seatAvailable:[],
            seatReserved: [],
            currentReserved: [],
            bus: [],
            totalBill: '',
            names: [],
            genders: [],
            idpay: ''
         }      
 }

 componentDidMount(){
    axios.get(`http://localhost:4500/api/rides/${this.props.match.params.id}`)
    .then(res => {
        this.setState({
            bus: res.data.bus[0],
            seatAvailable: res.data.bus[0].availableSeats,
            seatReserved: res.data.bus[0].seatsReserved,
        })
    })
    .catch(err => console.log(err))
 }

 onClickData(seat){
    if(this.state.seatReserved.indexOf(seat) > -1){        
        alert('Already Booked')
    }else if(this.state.currentReserved.indexOf(seat) > -1){
            this.setState({
            seatAvailable: this.state.seatAvailable.concat(seat),
            currentReserved: this.state.currentReserved.filter(res => res !== seat)
        })
     }else if(this.state.currentReserved.indexOf(seat) === -1){
       this.setState({
           //seatReserved: this.state.seatReserved.concat(this.state.currentReserved),
           currentReserved: this.state.currentReserved.concat(seat),
           seatAvailable: this.state.seatAvailable.filter(res => res !== seat)
       })
   }else{
    //this.setState({seatReserved: this.state.seatReserved.concat(this.state.currentReserved)})
   }


}
         

 addNames(){
     this.setState({names: [...this.state.names,""]})
     this.setState({genders: [...this.state.genders,""]})
 }

 handleChange(e, index){
     let names = [...this.state.names]
     names[index] = e.target.value
     this.setState({names: names})
 }

 handleChangeGender(e, index){
    let genders = [...this.state.genders]
    genders[index] = e.target.value
    this.setState({genders: genders})
}

 handleRemove(index){
     this.state.names.splice(index,1)
     this.state.genders.splice(index,1)

     this.setState({names: this.state.names})
     this.setState({genders: this.state.genders})
    }
 
    onSubmit(e){
        e.preventDefault()
        let s = this.state.currentReserved
        
        const bus = {
            busType:this.state.bus.busType,
            depature:this.state.bus.departure,
            arrival:this.state.bus.arrival,
            travelDate:this.state.bus.travelDate,
            seatsAvailable:this.state.seatAvailable.length,
            seatsReserved:this.state.seatReserved.concat(s),
            availableSeats:this.state.seatAvailable,
            fare:this.state.bus.fare,
            serviceTax:this.state.bus.serviceTax,
            from:this.state.bus.from,
            to:this.state.bus.to
        }

        axios.put(`http://localhost:4500/api/updateRides/${this.props.match.params.id}`, bus)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

        const payment = {
            id: this.state.bus._id,
            totalBill: ((this.state.bus.fare + this.state.bus.serviceTax)*this.state.currentReserved.length),
            names: this.state.names,
            genders: this.state.genders,
            reserved: this.state.currentReserved
        }
        axios.post('http://localhost:4500/api/payment/addid', payment)
        .then((res) => {
            this.setState({idpay: res.data.payment._id})
            
        })
        .catch(err => console.log(err))
        
        alert('Please Click on Continue to Payment')
    }

 render() {
  return(
   <div>
       <Navbar />
       <div className="container-box">
           <ul className="nav nav-tabs">
               <li className="nav-item">
                    <p className={`nav-link`}>1. Search Bus</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link active">2. Book Seats</p>
               </li>
               <li className="nav-item">
                   <p className="nav-link">3. Payment</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link">4. Print ticket</p>
               </li>
           </ul>
           <div className="row tp2">
           <div className="col-4">
           <Layout seat={this.state.seat} available={this.state.seatAvailable} reserved={this.state.seatReserved} 
           current={this.state.currentReserved} onClickData={this.onClickData.bind(this)} />
           </div>
            <div className="fare-details col-4">
            <h3>Booking Details</h3>
            <div>
               <table><thead></thead><tbody>
                    <tr>
                        <td className="bLeft">From:</td>
                        <td className="bRight"><strong>{this.state.bus.from}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">To:</td>
                        <td className="bRight"><strong>{this.state.bus.to}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">Travel Date:</td>
                        <td className="bRight"><strong>{this.state.bus.travelDate}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">Bus Type:</td>
                        <td className="bRight"><strong>{this.state.bus.busType}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">Fare:</td>
                        <td className="bRight"><strong>{this.state.bus.fare}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">Service tax:</td>
                        <td className="bRight"><strong>{this.state.bus.serviceTax}</strong></td>
                    </tr>
                    <tr>
                        <td className="bLeft">Total Bill:</td>
                        <td className="bRight"><strong>{((this.state.bus.fare + this.state.bus.serviceTax)*this.state.currentReserved.length).toString()}</strong></td>
                    </tr>
                </tbody><tfoot></tfoot></table>
           </div>
           <hr></hr>
            <div>
               <div>
                   Tap + to enter Details of Passengers:-&emsp;<button onClick={(e) => this.addNames(e)}>+</button>
               </div>
               {this.state.names.map((names, index) => {
                   return(
                       <div key={index}>
                           <input onChange={(e) => this.handleChange(e, index)} value={names} placeholder="Name"/>
                           <select required defaultValue="default" onChange={(e) => this.handleChangeGender(e, index)}>
                               <option value="default">Gender</option>
                               <option>Male</option>
                               <option>Female</option>
                           </select>
                           <button onClick={() => this.handleRemove(index)}>-</button><br></br>
                       </div>
                   )
               })}
               <button onClick={(e) => this.onSubmit(e)}>Submit entered details</button>
               </div>
               {this.state.currentReserved.length > 0 ? <Link to={`/payment/${this.state.idpay}`}><button>Continue to payment</button></Link>: null}
               
                </div>
           </div>
       
       </div>
   </div>
    )
   }
 }


export default Bookseats