import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Plantrip.css'
import Table from './BusTable/Table'
import axios from 'axios'
/**
* @author
* @function Plantrip
**/

const Plantrip = () => {

    const [plan, setPlan] = useState('');
    const [busData, setBusData] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);

    const handleFrom = (e, fields) => {
        e.preventDefault();
        let val = e.target.value;
        setPlan({...plan, [fields]:val});
        //console.log(plan.date);
    }

    const handlePlan = async (e) => {
        e.preventDefault();
        try{
            let res = await axios.post('http://localhost:4500/api/findRides',{
                        from: plan.from, to: plan.to, travelDate: plan.date,
    
            })
            if(res.data.success===true && res.data.bus.length !== 0){
                //console.log(res.data)
                setSuccessMessage('')
               return( setBusData(res.data))
            }else{
                setSuccessMessage('No Buses Available')
            }
        }catch(err){
            console.log(err)
        }
    }

    const renderBus=(busData)=>{
        if(Object.keys(busData).length>0)
            return(<Table value={busData}/>)
    }

  return(
    <div className="planning">
        <section className="search-sec">
          <div className="container">
              <form>
                  <div className="row">
                      <div className="col-lg-12">
                          <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                  <select defaultValue={"default"} className="form-control search-slt" id="exampleFormControlSelect1" onBlur={e=>handleFrom(e,"from")}>
                                      <option value="default" disabled  >Select Pickup City</option>
                                      <option value="Hyderabad">Hyderbad</option>
                                      <option value="Chennai">Chennai</option>
                                      <option value="Bangalore">Bangalore</option>
                                  </select> 
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                  <select defaultValue={"default"} className="form-control search-slt" id="exampleFormControlSelect1" onBlur={e=>handleFrom(e,"to")}>
                                      <option value="default" disabled>Select Destination City</option>
                                      <option value="Hyderabad">Hyderbad</option>
                                      <option value="Chennai">Chennai</option>
                                      <option value="Bangalore">Bangalore</option>
                                  </select>
                              </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                  <input type="date" placeholder="dd-mm-yyyy" className="form-control search-slt" onChange={e=>handleFrom(e,"date")} />
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                  <button type="submit" className="btn btn-primary wrn-btn" onClick={e=>handlePlan(e)}>Plan Trip</button>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </form>
          </div>
            {successMessage === '' ? renderBus(busData) : <h2><br/><br/>{successMessage}</h2>}
        </section>
    </div>
   )
 }

export default Plantrip