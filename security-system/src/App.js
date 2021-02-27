
import './App.css';
import React, {Component} from 'react';
import Navbar from "./components/Navbar.js";
import fire from './config/fire.js';
import Login from "./Login.js"
import Home from "./Home.js"
import { BrowserRouter as Router, Link, NavLink, Redirect, Switch,Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignIn from "./SignIn.js"
import ChangePW from "./ChangePW.js"
import AddData from "./AddData.js";
import ViewHistory from "./ViewHistory";
import Edit from "./Edit.js";
import ChangeNumber from "./ChangeNumber.js";
import SignUp from './SignUp.js';
import Notification from "./Notification.js";
import userhistory from "./UserHistory.js";
import AdminHistory from "./AdminHistory.js";


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user : {}

      
    }
  }
  render(){
    return (
      
        <Router>
          <div className="container">
             <Navbar/>
            
            <Switch>
            <Route path="/Signin" exact strict component={SignIn}/>
            <Route path ="/home" exact strict component ={Home}/>
            <Route path ="/login" exact strict component ={Login}/>
            <Route path ="/ChangePW" exact strict component ={ChangePW}/>
            <Route path ="/AddData" exact strict component ={AddData}/>
            <Route path ="/ViewHistory" exact strict component ={ViewHistory}/>
            <Route path ="/Edit" exact strict component ={Edit}/>
            <Route path ="/ChangeNumber" exact strict component ={ChangeNumber}/>
            <Route path ="/Notification" exact strict component ={Notification}/>
            <Route path ="/Signup" exact strict component ={SignUp}/>
            <Route path ="/userhistory" exact strict component ={userhistory}/>
            <Route path ="/AdminHistory" exact strict component ={AdminHistory}/>
            <Route exact path="/" component={Home} />
            
            </Switch>
          </div>
        </Router>
        
      
    );
  }
}

export default App;
