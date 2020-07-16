import React,{useState,useEffect} from 'react';
import Navbar from '../../Navbar'
import {Link} from 'react-router-dom'
import './payment.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './payment.css'
import axios from 'axios'
const Payment = (props) => {
    const[details,setDetails]=useState({
        number:'',
        name:'',
        cvv:'',
        month:'',
        year:'',
    })
    const [number , setNumber] = useState('')
    const [name , setName] = useState('')
    const [cvv , setCvv] = useState('')
    const [month , setMonth] = useState('')
    const [year , setYear] = useState('')
    const [totalFare, setTotalFare] = useState(0)
    
    const handleNumber=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setNumber("Card Number is Required"))
        }
        if(value){
            let regExp=/^\d{16}$/
            if(!(regExp.test(value))){
                return(setNumber("Card number should be of 16 digits"))
            }
            else{
                setDetails(prevState=>({
                    ...prevState,
                    number:value
                }))
                return(setNumber(""))
                
            }
        }
    }
    const handleName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setName(" Name is Required"))
        }else{
            setDetails(prevState=>({
                ...prevState,
                name:value
            }))
            return(setName(""))
        }
    }
    const handleCVV=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setCvv("CVV is Required"))
        }
        if(value){
            let regExp=/^([0-9]{3})$/
            if(!(regExp.test(value))){
                return(setCvv("CVV not valid"))
            }
            else{
                setDetails(prevState=>({
                    ...prevState,
                    cvv:value
                }))
                return(setCvv(""))
                
            }
        }
    }
    const handleMonth=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setMonth("Month is Required"))
        }
        if(value){
            let regExp=/^01|02|03|04|05|06|07|08|09|10|11|12$/
            if(!(regExp.test(value))){
                return(setMonth("Month not valid"))
            }
            else{
                setDetails(prevState=>({
                    ...prevState,
                    month:value
                }))
                return(setMonth(" "))
                
            }    
        }
    }
    const handleYear=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setYear("Year is Required"))
        }
        if(value){
            let regExp=/^(20[2-9]\d|3000)$/
            if(!regExp.test(value)){
                return(setYear("year should be between 2020 - 3000"))
            }
            else{
                setDetails(prevState=>({
                    ...prevState,
                    year:value
                }))
                return(setYear(""))
            }
        }
    }
    useEffect(() => {
        axios.get(`http://localhost:4500/api/payment/${props.match.params.id}`)
        .then(res => {
            setTotalFare(res.data.payment[0].totalBill)
        })
        
    },[props.match.params.id])
    
    return (
        <div>
            <Navbar />
            <div className="container tp1">
            <ul className="nav nav-tabs">
               <li className="nav-item">
                    <p className={`nav-link`}>1. Search Bus</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link">2. Book Seats</p>
               </li>
               <li className="nav-item">
                   <p className="nav-link active">3. Payment</p>
               </li>
               <li className="nav-item">
                    <p className="nav-link">4. Print ticket</p>
               </li>
           </ul>
            <h1 style={{align: 'center'}}><b><u>Payment</u></b></h1>
            <div className="payment-top">
                <p>Total Amount: &#8377;{totalFare}</p>
            </div>
            <form> 
                <div className="container">
                    <div className="row credit">
                        <div className="col-4"><b>Card Type : </b></div>
                        <div className="col-6">
                        <input type="radio"  name="card" value={"visa"}  />
                        <label htmlFor="visa">&emsp;Visa</label>
                        <input type="radio"  name="card" value={"masterCard"}  />
                        <label htmlFor="masterCard">&emsp;Master Card</label> 
                        </div>
                    </div>
                    <br/>
                    <div className = "card-num">
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="number"><b>Card Number</b> :</label> </div>
                        <div className = "col-6">
                            <input type="number" placeholder="Enter Card Number" name="number" onBlur={e=>{handleNumber(e)}}  />
                            <div style={{color: "red"}}>{number}</div>
                        </div>
                    </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="name"><b>Name On Card </b> :</label> </div>
                        <div className = "col-6" id="cvv">
                            <input type="text"placeholder="Enter Card Holder Name" name="name" onBlur={e=>{handleName(e)}}  />
                        <div style={{color: "red"}}>{name}</div>
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="cvv"><b>CVV</b> :</label> </div>
                        <div className = "col-6">
                            <input type="number" placeholder="CVV" name="cvv" onBlur={e=>{handleCVV(e)}}  />
                            <div style={{color: "red"}}>{cvv}</div>
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="date"><b>Expiry Date</b> :</label> </div>
                        <div className = "col-4">
                            <input type="number" placeholder="Month" name="date" onBlur={e=>{handleMonth(e)}}  />
                            <div style={{color: "red"}}>{month}</div>
                        </div>
                        <div className = "col-0">
                            <input type="number" placeholder="Year" name="date" onBlur={e=>{handleYear(e)}}  />
                            <div style={{color: "red"}}>{year}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-6">
                        <Link to={`/ticket/${props.match.params.id}`}><button className="btn btn-success" type="submit"
                                 disabled={!details.number||!details.name||!details.cvv||!details.month}>Pay Now</button></Link>
                        </div>
                    </div>                    
                </div>
            </form>
        </div>
        </div>
    );
};

export default Payment;