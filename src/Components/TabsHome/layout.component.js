import React, { Component } from 'react'
import './Bookseats.css'

const Reserved = (props) => {
    //console.log(props.reserved)
    return(
        <div>
            <h4>Seats Selected: <strong>{props.current.length}</strong></h4>
            <h4 className="seats-reserved">Seats: {props.current.map(seat => <strong key={seat}>{seat},</strong>)}</h4>
        </div>
    )
}

export default class Drawgrid extends Component {

    onClickSeat(seat){
        this.props.onClickData(seat)
    }

    isReserved(row){
        return this.props.reserved.indexOf(row) > -1
    }

    isCurrent(row){
        return this.props.current.indexOf(row) > -1
    }

    render(){
        return(
            <div>
                <ul className="seats">
                            {this.props.seat.map((row) => 
                                <li className={this.isReserved(row) ? 'bookedSeat': this.isCurrent(row) ? 'bookedSeat' : 'selectSeat'}
                                    key={row} onClick={(e) => this.onClickSeat(row)}>
                                    {<img className="img-fluid" alt="seat" src={require("./seat-icon.png")} />}
                                </li>
                            )}
                </ul>
                <Reserved current={this.props.current} />
            </div>
        )
    }
}