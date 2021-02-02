
import './App.css';
import React, {Component} from 'react';
import fire from './config/fire.js';
import Login from "./Login.js"
import Home from "./Home.js"
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';


class SignIn extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{}

    }
    console.log(this.state.user)
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      
      }
      else{
        this.setState({user : null})

      }
    })
  }
logout=()=>{
    fire.auth().signOut();
    console.log("successfully signed out")
    this.setState({isLoggedIn:false}) 
}

  render(){
/*
          <Router>
          {this.state.user ? (<Link to='/home' component={Home} />) :  (<Link to='/login'component ={Login} />)  }
          {this.state.user ? (<Home/>) : (<Login/>)}
          </Router> */
          // {this.state.user ? (<Link to='/otp' component={Otp} />) :  (<Link to='/login'component ={Login} />)  }//correct
      console.log(this.state.user)
      return (
        <Router>
         
         <Link to='/login'component ={Login} />
          </Router>
      )

    

  }
}

export default SignIn;
