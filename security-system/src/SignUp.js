import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {Link} from 'react-router-dom';
import AddData from './AddData.js';


class SignUp extends Component{

    constructor(props) {
        super(props);
        this.handleText = this.handleText.bind(this);
        this.OnSubmit= this.OnSubmit.bind(this);
        this.OnExit =this.OnExit.bind(this);
        this.handleValidation =this.handleValidation.bind(this);
        this.state = {
            UserName :"",
            UserDepartment : "",
            UserID : "",
            isEnd:false,
            isIdExist :false,
            Day: false,
            Night : false,
            errors :"",
            isSignup:false,
            email:'',
            password :'',
            isBack:false,
            sec_status:'',
            validsignup:false
         };
        
         console.log("Night:",this.state.Night)
            
    }


    //handdle form validation
    handleValidation(){
console.log("inside handlevalidation"); 
        let formIsValid = true;
        let errors="";
        let vname=this.state.UserName;
        if(this.state.UserDepartment=="" | this.state.UserID=="" | this.state.UserName=="" | (this.state.Day==false && this.state.Night==false)| this.state.email=="" | this.state.password=="" ){
            formIsValid = false;
            document.querySelector('#regmsg').textContent="Please complete all the fields";
            console.log ('empty')
        }
        
      /*  else if(typeof vname!== "undefined"){
           if(!vname.match(/^[a-zA-Z]+$+" "/)){
              formIsValid = false;
              alert("Invalide name format. Please use alphabetical charactors ");
           }        
        }*/
        this.setState({errors: errors});
console.log(formIsValid)
       return formIsValid;
       
   }
    
    handleText=e=>{
        
        this.setState({
            [e.target.name] : e.target.value
        })
        
    }
    dataRegister(){
     /*   var alreadyexists=0;
        console.log("this is onsubmit")
        const empref = fire.database().ref("/AdminProfiles");
        empref.on("value", snapshot => {
        // console.log(snapshot.val().enter_date);
        let userhistory = snapshot.val();

        for(let id in userhistory){
            var storedid =userhistory[id]['UserID'];
            console.log('storedId',storedid)
            if(storedid == this.state.UserID ){
                console.log('same')
                    alreadyexists =1;
                    
                    
            }
        
        }

        });*/




       //  if(alreadyexists !=1){
        fire.database().ref('/AdminProfiles').push().set({
            Email:this.state.email,
                UserID: this.state.UserID,
                UserDepartment: this.state.UserDepartment,
                UserName: this.state.UserName,
                SecurityStatus:this.state.sec_status,
                AccessTime:{
                    Day:this.state.Day,
                    Night : this.state.Night
                },
                LastModifiedDate : Date().toLocaleString(),
                LastSignIn : Date().toLocaleString()

            });
            
            document.querySelector('#regmsg').textContent="Admin registered ";
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            this.setState({
                UserName :"",
                UserDepartment : "",
                UserID : "",
                AccessTime:{
                    Day:false,
                    Night : false
                }
            });
           // }
       /*     else{
                console.log("already exists")
                
                document.querySelector('#regmsg').textContent="Entered User Id already exists";
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            }*/
    }
    OnSubmit=e=>{
        if(this.handleValidation()){

            //signup
            
            fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
                console.log(u)
                console.log("sign up successful")
                this.setState({validsignup:true}) 
                this.dataRegister();
                document.querySelector('#regmsg').textContent="SignUp Successfull";
                
            }).catch((err)=>{
                console.log(err)
                document.querySelector('#regmsg').textContent="Error in SignUp";
            })
            console.log(this.state.validsignup)
            if(this.state.validsignup){
               
             }
    
         }  
            else{
            
            }   
        
    }

    OnExit(){
        this.setState({
            isEnd :true
          });
    }
  

    render(){
/*<h1> This is a temporary  for add data</h1>
               <input type ="text" id ="inputText"  name="text" onChange={this.handleText}/>
               <br/>
                <button type="submit" class="btn btn-primary"  onClick={this.OnSubmit}>Register</button>*/
        let isEnd =this.state.isEnd;
        if(isEnd){
             return <Link to="/home"component={Home}/>;
        }  
        if(this.state.isBack){
            return <Link to="/AddData"component={AddData}/>;
        }      
        return(
            <div>
                <br/>

                <div class="alert alert-dismissible alert-warning">

                    <p   class="alert-link">You are authorized only for Registering the door Users</p>
                    </div>

                <br/>
                
                <label class="blockquote text-right">
                     Registration of Admins
                </label>
                <br/>
                <label id="warningmsg"></label>
                <br/>
                <form autoComplete='off'>
                    <fieldset>
                    
                    <div class="form-group">
                        <label >Email</label>
                        <input type="text" class="form-control" id="email" 
                        name="email" placeholder="Enter the Email address" onChange={this.handleText}     
                             required="required"/>
                    </div>
                    <div class="form-group">
                        <label >Password</label>
                        <input type="text" class="form-control" id="pw" 
                        name="password" placeholder="Enter the password" onChange={this.handleText}     
                             required="required"/>
                    </div>

                    <div class="form-group">
                        <label >User ID</label>
                        <input type="text" class="form-control" id="UserID" 
                        name="UserID" placeholder="Enter the Company User ID" onChange={this.handleText}     
                             required="required"/>   
                    </div>
                    <div class="form-group">
                        <label >Name</label>
                        <input type="text" class="form-control" id="UserName" 
                        name="UserName" placeholder="Enter the name" onChange={this.handleText} required/>
                        
                    </div>
                    <div class="form-group">
                        <label >Department</label>
                        <input type="text" class="form-control" id="UserDepartment"
                        name="UserDepartment" placeholder="Enter the  Department"
                        onChange={this.handleText} required/>
                        
                    </div>
                    <div class="form-group">
                        <label >Security Status</label>
                        <input type="text" class="form-control" id="secState"
                        name="sec_status" placeholder="Enter the Security level"
                        onChange={this.handleText} required/>
                        
                    </div>
                    <label > Valid Accesss Time</label>                     
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" disabled=""
                        onClick={() => {
  
                            this.setState({Day: !this.state.Day});}}
                        />
                        Day time (7.00 am to 6.00 pm)
                        </label>
                    </div>
                    <div class="form-check disabled">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" disabled=""
                        onClick={() => {
  
                            this.setState({Night: !this.state.Night});}  }
                        />
                        Night time (6.00 pm to 7.00 am)
                        </label>
                    </div>
                    <br/>

                    </fieldset>
                </form>
                <br/>
                <p class="text-warning" id='regmsg'></p> 
                <button type="submit" class="btn btn-primary" id="submit" onClick={this.OnSubmit}>Register</button>
                <button type="submit" class="btn btn-warning"  onClick={this.OnExit}>Exit</button>
                <button type="submit" class="btn btn-primary"  onClick={() => {
  
                this.setState({isBack: true});}  }>Back</button>
               
            </div>
        )
    }
}

export default SignUp;