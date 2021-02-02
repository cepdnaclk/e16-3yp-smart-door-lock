import React, {Component} from "react";
import fire from "./config/fire.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';



class ChangePW extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handdleChangePW = this.handdleChangePW.bind(this);
        this.ValidatePassword = this.ValidatePassword.bind(this);
        this.state ={
            PW: "", 
            PW2:'',
            isBack : false

        }
    }
    handleChange=e=>{
        this.setState({
            [e.target.name] : e.target.value
            
        })
        console.log(this.state.PW);
    }
    ValidatePassword(){
        let valid =false;
        if( this.state.PW.length>5 && this.state.PW!=''){
            valid= true;
        }
        return valid;
    }
    handdleChangePW=()=>{
        
        let valid2 =this.ValidatePassword();
        console.log(valid2)
        if(valid2){
        let user = fire.auth().currentUser;
        let newPassword = this.state.PW;
        console.log(user)
        user.updatePassword(newPassword).then(function() {
        console.log('password change successfull')
        document.querySelector('label').textContent="Password change successfull!!!";
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
        }).catch(function(error) {
        // An error happened.
        console.log(error)
        document.querySelector('label').textContent="Error!!!!";
        });
        }
        else{
            document.querySelector('label').textContent='Error !!!'
        }
    }

  

    render(){

       
       
       if(this.state.isBack){
        return <Link to="/login"component={Login}/>;
       }


        return(
            <div>
            
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Enter New Password</h5>
                <br/>
                
                
            </div>
            <div class="modal-body">
                                    

                <div class="form-group">
                
                   
                      
                       
                        <input type="password" class="form-control" name="PW" onChange = {this.handleChange} id="PW" placeholder="Enter new Password"
                        value ={this.state.password}
                        onChange = {this.handleChange}
                        />
                    
                    
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='PWbtn' onClick={()=>this.handdleChangePW()}>Change Password</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {
  
                     this.setState({isBack: true});
                }}>
                    Back
                </button>
            </div>
            </div>
        </div>
        <p class="text-danger">Please note that your password must have atleast 6 charactors</p> 
        <label/>
        </div>
        )
    }
}

export default ChangePW;