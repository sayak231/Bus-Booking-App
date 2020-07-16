import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../../Navbar'
import './Tabshome.css'
import Plantrip from '../PlanTrip/Plantrip'
import Seats from '../Seats2/viewSeats'
import Payment from '../Payment/Payment'
import Ticket from '../Ticket/Ticket'
/**
* @author
* @class Tabshome
**/

class Tabshome extends Component {

 constructor(props) {
     super(props)   
        this.state = {
            tab: 1
         }      
 }

 displayBus=(tab)=>{
     switch(tab){
         case 1:{return(<div><Plantrip/></div>);}
         case 2:{return(<div><Seats/></div>);}
         case 3:{return(<div><Payment/></div>)}
         case 4:{return(<div><Ticket/></div>)}
         default:return null;
     }
 }

 changeTab = (e, tabIdx) => {
     e.preventDefault(e)
     this.setState({tab: tabIdx})
     //console.log(this.state.tab)
 }

 render() {
  return(
   <div>
       <Navbar />
       <div className="container-box">
           <ul className="nav nav-tabs">
               <li className="nav-item">
                    <a className={`nav-link ${this.state.tab === 1 ? 'active' : ''}`} onClick={e => this.changeTab(e, 1)} href="/tabsHome" >1. Search Bus</a>
               </li>
               <li className="nav-item">
                    <a className={`nav-link ${this.state.tab === 2 ? 'active' : ''}`} onClick={e => this.changeTab(e, 2)} href="/tabsHome" >2.  Seats</a>
               </li>
               <li className="nav-item">
                    <a className={`nav-link ${this.state.tab === 3 ? 'active' : ''}`} onClick={e => this.changeTab(e, 3)} href="/tabsHome" >3. Payment</a>
               </li>
               <li className="nav-item">
                    <a className={`nav-link ${this.state.tab === 4 ? 'active' : ''}`} onClick={e => this.changeTab(e, 4)} href="/tabsHome">4. Print ticket</a>
               </li>
           </ul>
           {this.displayBus(this.state.tab)}
       </div>
   </div>
    )
   }
 }


export default Tabshome