import React from 'react';
import './Table.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";
//import axios from 'axios'

const BusTable = ({value:busData}) => {

    // const history = useHistory();

    // const routeChange = () =>{ 
    //     let path = `/tabsHome2`; 
    //     history.push(path);
    //     console.log('Push')
    // }

    // const handleView = async () => {
        
    // }

    // const postToBase = async () => {

    //     console.log(busData.bus);

    //     await axios.post('http://localhost:4500/api/buses', {
    //         busType:busData.bus.busType,
    //         depature:busData.bus.depature,
    //         arrival:busData.bus.arrival,
    //         travelDate:busData.bus.travelDate,
    //         seatsAvailable:[],
    //         seatsReserved:[],
    //         fare:busData.bus.fare,
    //         serviceTax:busData.bus.serviceTax,
    //         from:busData.bus.from,
    //         to:busData.bus.from
    //     })
    //     .then(res => {
    //         console.log(res);
    //       })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    // }

    return (
        <div className="table-top">
          <div className="card mb-4">
            <h5 className="display-5 p-3 mb-3 bg-success text-white">Select Your Bus</h5>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="head-disp">
                          <tr className="text-white">
                              <th>BusType</th>
                              <th>Depature</th>
                              <th>Arrival</th>
                              <th>Date</th>
                              <th>Available Seats</th>
                              <th>Fare</th>
                              <th>&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;
                              </th>
                          </tr>
                        </thead>
                        <tbody>
                        {busData.bus.map((bus) => (
                            <tr key={bus._id}>
                                <th scope="row">{bus.busType}</th>
                                <td>{bus.depature}</td>
                                <td>{bus.arrival}</td>
                                <td>{bus.travelDate}</td>
                                <td>{bus.seatsAvailable}</td>
                                <td>{bus.fare}</td>
                                <td><Link to={`/tabsHome2/${bus._id}`}><button className="btn btn-success">View Seats</button></Link></td>
                            </tr>
                        ))}
                        </tbody>                  
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BusTable;