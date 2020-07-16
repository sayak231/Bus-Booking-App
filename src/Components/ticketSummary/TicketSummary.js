import React, { Component } from 'react'
import axios from 'axios'
import Navbar from '../../Navbar'
import './TicketSummary.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class TicketSummary extends Component {

    constructor(){
        super()
        this.state ={
            names: [],
            genders:[],
            reserved:[],
            totalFare: 0,
            id: '',
            phNumber:'',
            email:'',
            from: '',
            to:'',
            busType:'',
            departure:'',
            arrival:'',
            travelDate: ''
            
        }
    }

    async componentDidMount(){
        await axios.get(`http://localhost:4500/api/payment/${this.props.match.params.id}`)
        .then((res) => {
            this.setState({
                names: res.data.payment[0].names,
                genders: res.data.payment[0].genders,
                reserved:res.data.payment[0].reserved,
                totalFare: res.data.payment[0].totalBill,
                id: res.data.payment[0].id
            })
        })
        .catch(err => console.log(err))

        await axios.get(`http://localhost:4500/api/rides/${this.state.id}`)
        .then(res => {
            this.setState({
                from: res.data.bus[0].from,
                to: res.data.bus[0].to,
                travelDate: res.data.bus[0].travelDate,
                busType: res.data.bus[0].busType,
                departure: res.data.bus[0].depature,
                arrival: res.data.bus[0].arrival,
            })
        })
    }

    render() {
        return (
            <div>
                <Navbar />
            <div className="container tp">
            <ul className="nav nav-tabs">
               <li className="nav-item">
                    <p className={`nav-link`}>1. Search Bus</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link">2. Book Seats</p>
               </li>
               <li className="nav-item">
                   <p className="nav-link">3. Payment</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link active">4. Print ticket</p>
               </li>
           </ul>
            <div className="summary-content">
            <div className="summary-top">
                <h4><b>Your ticket has been successfully booked</b></h4>
            </div>
            <br></br><br></br><hr></hr>
                <div className="row ">
                    <div className="col-4"><h5>From: {this.state.from}</h5></div>
                    <div className="col-4"><h5>To: {this.state.to}</h5></div>
                    <div className="col-4"><h5>BusType: {this.state.busType}</h5></div>
                </div>
                <div className="row">
                    <div className="col-4"><h5>Travel Date: {this.state.travelDate}</h5></div>
                    <div className="col-4"><h5>Departure: {this.state.departure}</h5></div>
                    <div className="col-4"><h5>Arrival: {this.state.arrival}</h5></div>
                </div>    
                <hr></hr>
                
                <table className="col-8 col-9 col-10 col-11">
                    <tr>
                        <th>Passenger Names</th>
                        <th>Sex</th>
                        <th>Seat Numbers selected</th>
                    </tr>
                    {this.state.names.map((name, index) =>  
                         <tr>
                         <td>{name}</td>
                         <td>{this.state.genders[index]}</td>
                         <td>{this.state.reserved[index]}</td>
                        </tr>
                        )}  
                </table>
                <hr></hr><br></br>
                <div className="row">                     
                    <div className="col-12 s"><h3>Your Total Fare: &#8377;{this.state.totalFare}</h3></div>
                </div><br></br>
                <div className="row">
                <div className="col-12"><h2><b>!...Thank you for travelling with us, see you onBoard...!</b></h2></div>
                </div>
            </div>
        </div>
        </div>
        )
        
    }
}
