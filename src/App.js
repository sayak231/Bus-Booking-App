import React from 'react';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import Register from './Components/Registration/Register';
import Home from './Components/Home/Home';
import Tabshome from './Components/TabsHome/Tabshome'
import Bookseats from './Components/TabsHome/Bookseats'
import Payment from './Components/payment-copy/Payment'
import PaymentCopy from './Components/Payment/Payment'
import TicketSummary from './Components/ticketSummary/TicketSummary'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="content">
            <img alt='bg img' className="img-fluid" src={require('./Bus2.jpg')} />
        </div>
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/tabsHome" component={Tabshome} />
                <Route exact path="/tabsHome2/:id" component={Bookseats} />
                <Route exact path="/payment/:id" component={Payment} /> 
                <Route exact path="/payment/" component={PaymentCopy} />
                <Route exact path="/ticket/:id" component={TicketSummary} />       
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
