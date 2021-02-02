import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {Link} from 'react-router-dom';
import SignUp from "./SignUp.js"


class AddData extends Component{

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
            isSignup:false
         };
        
         console.log("Night:",this.state.Night)
            
    }


    //handdle form validation
    handleValidation(){
console.log("inside handlevalidation"); 
        let formIsValid = true;
        let errors="";
        let vname=this.state.UserName;
        if(this.state.UserDepartment=="" | this.state.UserID=="" | this.state.UserName=="" | (this.state.Day==false && this.state.Night==false)  ){
            formIsValid = false;
            //alert("Please complete all the fields");
            document.querySelector('#regmsg').textContent="Please complete all the fields !";
            console.log ('empty')
        }
        
        this.setState({errors: errors});
console.log(formIsValid)
       return formIsValid;
       
   }
    
    handleText=e=>{
        
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state.UserDepartment)
         console.log(this.state.UserID)
         console.log(this.state.UserName)
         console.log(this.state.Night)
    }
    OnSubmit=e=>{
        if(this.handleValidation()){
        var alreadyexists=0;
        console.log("this is onsubmit")
        const empref = fire.database().ref("/Users");
        empref.on("value", snapshot => {
          // console.log(snapshot.val().enter_date);
          let userhistory = snapshot.val();
        console.log("/Users",userhistory)
        // console.log(snapshot.child("/AdminId").val());
       
        for(let id in userhistory){
            var storedid =userhistory[id]['UserID'];
            console.log('storedId',storedid)
           if(storedid == this.state.UserID ){
               console.log('same')
                alreadyexists =1;
                
                
           }
           
        }

        });
     
        console.log('status:',alreadyexists)
        if(alreadyexists !=1){
       fire.database().ref('/Users').push().set({
            UserID: this.state.UserID,
            UserDepartment: this.state.UserDepartment,
            UserName: this.state.UserName,
            AccessTime:{
                Day:this.state.Day,
                Night : this.state.Night
            },
            LastModifiedDate : Date().toLocaleString()

          });
          document.querySelector('#regmsg').textContent="Registration successfull!!!";
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
        }
        else{
            console.log("already exists")
            document.querySelector('#regmsg').textContent="Employee already registered";
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
              );
        }
    } //validation end


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
        if(this.state.isSignup){
            return <Link to="/SignUp"component={SignUp}/>;
        }      
        return(
            <div>
                <br/>

                <div class="alert alert-dismissible alert-warning">

                    <p   class="alert-link">You are authorized only for Registering the door Users</p>
                    </div>

                <br/>
                <button class="btn btn-primary btn-lg btn-block" type="submit"   onClick={() => {
                    
                    this.setState({isSignup: true});}  }
                >Admin Signups</button><br/><br/>
                <label class="blockquote text-right">
                     Registration of Door users
                </label>
                <br/>
                <p class="text-warning" id='regmsg'></p> 
                <br/>
                <form>
                    <fieldset>

                    <div class="form-group">
                        <label >User ID</label>
                        <input type="text" class="form-control" id="UserID" 
                        name="UserID" placeholder="Enter the Company User ID" onChange={this.handleText} value ={this.state.UserID}     
                             />   
                    </div>
                    <div class="form-group">
                        <label >Name</label>
                        <input type="text" class="form-control" id="UserName" 
                        name="UserName" placeholder="Enter the name" onChange={this.handleText} value ={this.state.UserName}/>
                        
                    </div>
                    <div class="form-group">
                        <label >Department</label>
                        <input type="text" class="form-control" id="UserDepartment"
                        name="UserDepartment" placeholder="Enter the  Department"
                        onChange={this.handleText} value ={this.state.UserDepartment}/>
                        
                    </div>
                    <label > Valid Accesss Time</label>                     
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"  disabled="" id='day' name='Day'
                         value={this.state.Day}
                        onChange={() => {
  
                            this.setState({Day: !this.state.Day});}}
                        />
                        Day time (7.00 am to 6.00 pm)
                        </label>
                    </div>
                    <div class="form-check disabled">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"  disabled="" id='night' name='Night'
                        value ={this.state.Night}
                        onChange={() => {
  
                            this.setState({Night: !this.state.Night});}  }
                        />
                        Night time (6.00 pm to 7.00 am)
                        </label>
                    </div>
                    <br/>

                    </fieldset>
                </form>
                <button type="submit" class="btn btn-primary" id="submit" onClick={()=>this.OnSubmit()}>Register</button>
                <button type="submit" class="btn btn-warning"  onClick={this.OnExit}>Exit</button>
                
            </div>
        )
    }
}

export default AddData;