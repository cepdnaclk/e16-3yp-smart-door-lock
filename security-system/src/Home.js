import React, {Component} from "react";
import fire from "./config/fire.js";
import SignIn from "./SignIn.js";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
class Home extends Component{
    constructor(props){
        super(props)
        this.logout =this.logout.bind(this);
        this.state ={
            user:{},
            WantToLogIn : false
        }
        
    }
    componentDidMount(){
        this.authListener();
      }
      authListener(){
        fire.auth().onAuthStateChanged((user)=>{
          if(user){
            this.setState({user})
            console.log ('uid:',fire.auth().currentUser.uid)
          
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
      let button;
      if(this.state.user){
       // button =<button></button>
       button = <button type="submit" id='logoutbtn' class="btn btn-primary"  onClick={()=>this.logout()}>Log out</button>;
      }
      if(!this.state.user){
        button = <button type="submit" class="btn btn-primary"onClick={() => {

          this.setState({WantToLogIn: true});
          }}>Log in</button>; 
      }
      if(this.state.WantToLogIn){
        return <Link to="/Signin"component={SignIn}/>;
      }

        return(
            <div>
                
                <div>
                <img src="/images/image1.jpg"   width="100%" height="500"></img></div>
               {button}
               
            </div>
        )
    }
}

export default Home;