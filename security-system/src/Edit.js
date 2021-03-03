import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import ChangeNumber from "./ChangeNumber.js";

const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');
class Edit extends Component{

        constructor(props) {
            super(props);
            this.handleText = this.handleText.bind(this);
            this.OnUpdate= this.OnUpdate.bind(this);
            this.OnExit =this.OnExit.bind(this);
            this.OnSearch = this.OnSearch.bind(this);
            this.delete=this.delete.bind();
            this.encrypt =this.encrypt.bind(this);
            this.decrypt =this.decrypt.bind(this);
            this.state = {
                UserName :"",
                UserDepartment : "",
                UserID : "",
                LastModifiedDate:"",
                isEnd:false,
                Day :false,
                Night :false,
                emps:[
                    
                ],
                searchId :"",
                infoExists:false,
                DBtag :'',
                isChange:false
                
             };
            
    
                
        }

        encrypt(msgString){
            let iv = CryptoJS.lib.WordArray.random(16);
            let encrypted = CryptoJS.AES.encrypt(msgString, key, {
                iv: iv
            });
            let ciphertextStr =iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
            return(ciphertextStr);
           
         }
            decrypt(ciphertextStr){
                let ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);
                console.log(ciphertextStr)
                // split IV and ciphertext
                let iv = ciphertext.clone();
                iv.sigBytes = 16;
                iv.clamp();
                ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
                ciphertext.sigBytes -= 16;
        
                // decryption
                let decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
                    iv: iv
                });
                console.log("decrpted msg");
                return(decrypted.toString(CryptoJS.enc.Utf8));
            }
        //2 is mention for variables that has database values
        handleText=e=>{
            
            this.setState({
                [e.target.name] : e.target.value
            })
            console.log(this.state.UserDepartment)
             console.log(this.state.UserID)
             console.log(this.state.UserName)
        }
          //handdle form validation
        handleValidation(){
                console.log("inside handlevalidation"); 
                let formIsValid = true;
                let errors="";
                let vname=this.state.UserName;
                console.log(this.state.UserDepartment)
                console.log(this.state.UserName)
                console.log(this.state.UserID)
                if(this.state.UserDepartment=="" | this.state.UserName=="" |this.state.searchId==''| (this.state.Day==false && this.state.Night==false)  ){
                    formIsValid = false;
                   
                    document.querySelector('#regmsg').textContent="Please complete all the fields";
                    console.log ('empty')
                }
                
                this.setState({errors: errors});
                 console.log(formIsValid)
               return formIsValid;
               
        }
        handlesearch(){
            let serachfill=true;
            if(this.state.searchId==''){
                serachfill =false
            }
            return serachfill;
        }
        OnUpdate=e=>{
            console.log("this is onsubmit")
            if(this.handleValidation()){
            const empref = fire.database().ref("/Users/"+this.state.DBtag);
            empref.update({
              
              UserDepartment: this.state.UserDepartment,
              UserName: this.encrypt(this.state.UserName),
              LastModifiedDate :  Date().toLocaleString(),
              AccessTime:{
              Day : this.state.Day,
              Night : this.state.Night
            }

            });
            console.log('update complete')
            Array.from(document.querySelectorAll("input")).forEach(
              input => (input.value = "")
            );
            this.setState({
              UserName :"",
              UserDepartment : "",
              UserID : "",
              LastModifiedDate:"",
              Day :false,
              Night :false,
             
              
            });
       }
        else{
            document.querySelector('#regmsg').textContent='All the fields must be filled !!'
        }
        }
        OnExit(){
            this.setState({
                isEnd :true
              });
        }
        OnSearch=e=>{
            if(this.handlesearch()){
            let newState =[];
            let count=0;
            let a=false;
            console.log("this is onSearch")
            const empref = fire.database().ref("/Users");
            empref.on("value", snapshot => {
              // console.log(snapshot.val().enter_date);
              let userhistory = snapshot.val();
            console.log("/Users",userhistory)
            console.log('length',Object.keys(userhistory).length);

           
                for(let id in userhistory){
                    count++;
                    var storedid =this.decrypt(userhistory[id]['UserID']);
                    console.log('storedId',storedid)
                    console.log('searchid',this.state.searchId)
                    if(storedid == this.state.searchId){
                        console.log('id',id)
                        a=true;
                       this.setState({ DBtag: id });
                       
                       
                        console.log('IDsetstate',this.state.UserID)
                        document.querySelector('#delete').textContent="DeleteUser";
                       newState.push({
                            UserID :this.decrypt( userhistory[id]['UserID']),
                            UserName:this.decrypt(userhistory[id]['UserName']),
                            UserDepartment : userhistory[id]['UserDepartment'],
                            LastModifiedDate : userhistory[id]['LastModifiedDate'],
                            Day : userhistory[id]['AccessTime']['Day'],
                            Night :  userhistory[id]['AccessTime']['Night'],
                            
                          
                            
                        }) ;
                            
                            this.setState({ emps: newState });
                            this.setState({infoExists:true})
                            
                            console.log('emps :',this.state.emps)
                            document.querySelector('#regmsg').textContent='Employee details are shown in the bellow table. '
                    }
                    else if (count==Object.keys(userhistory).length&&(!a)){
                        document.querySelector('#regmsg').textContent='Employee does not exists !!'
                      }
                   
                   
                
                }
               
                
    
            console.log("newState:",newState);
            console.log('tag',this.state.DBtag)
          
            
            
            }); 
             
            }
           
            else{
                document.querySelector('#regmsg').textContent="Search bar is empty. Please add a valid ID to search";
            }
           
            
        }
        delete=e=>{
            console.log('tag',this.state.DBtag)
            const ref =fire.database().ref('Users/'+this.state.DBtag);
            ref.remove();
            console.log('removed');
            document.querySelector('#regmsg').textContent="Employee removed";

      }
    

 
      
    
        render(){
    /*<h1> This is a temporary  for add data</h1>
                   <input type ="text" id ="inputText"  name="text" onChange={this.handleText}/>
                   <br/>
                    <button type="submit" class="btn btn-primary"  onClick={this.OnSubmit}>Register</button>*/
            let isEnd =this.state.isEnd;
            let infoExists =this.state.infoExists;
            if(isEnd){
                 return <Link to="/home"component={Home}/>;
            }
            if(this.state.isChange){
                return <Link to="/ChangeNumber"component={ChangeNumber}/>;
            }

      
            return(
                <div>
                    <br/>
    
                    <div class="alert alert-dismissible alert-warning">
    
                        <p   class="alert-link">You are authorized only for Updating the details of the door Users and Change the Phone number that sends the OTP </p>
                        </div>


    
                    <br/>
                    <button class="btn btn-primary btn-lg btn-block" type="submit"   onClick={() => {
                    
                        this.setState({isChange: true});}  }
                    >Change Phone Number</button>
                    <br/>
                    <br/>
                    <label class="blockquote text-right">
                        Updating the details of Door users
                    </label>
                    <p class="text-warning" id='regmsg'></p> 
                    <form class="form-inline my-2 my-lg-0" autoComplete='off'>
                         <input class="form-control" type="text" name='searchId' value={this.state.searchId} id='SearchId'onChange={this.handleText} placeholder="Enter User ID"/>
                       
                    </form>
                     <button class="btn btn-primary" type="submit" id='searchbtn' onClick={()=>this.OnSearch()}>Search</button>
                    <button type="button" id ='delete' class="btn btn-link"onClick={this.delete}></button>    
                         <br/><br/>

                          
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          
                          <th scope="col">User Id</th>
                          <th scope="col">User name</th>
                          <th scope="col">Department</th>
                          <th scope="col">AccessTime</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.emps? this.state.emps.map(emp => {
                                    return ( 
                                      <tr class="table-active">
                                          
                                        <td>{emp.UserID}</td>

                                        <td>{emp.UserName}</td>
                                        <td>{emp.UserDepartment}</td>
                                        {emp.Day&&emp.Night ? (<td>Day,Night</td>) :""  }
                                        {emp.Day&&(!emp.Night) ? (<td>Day</td>) :"" }
                                        {emp.Night &&(!emp.Day)?(<td>Night</td>):""}

                                        
                                      </tr>
                                        );
                                    }) :''}
                                 
                      
                      </tbody>
                    </table>
                    
                       
                                
                                  
                                  
                                  

                    <form>
                        <fieldset>
                          
    
                        <div class="form-group">
                            <label >Name</label>
                            <input type="text" class="form-control" id="UserName" value={this.state.UserName}
                            name="UserName" placeholder="Enter the name" onChange={this.handleText}/>
                                   
   
                        </div>
                        <div class="form-group">
                            <label >Department</label>
                            <input type="text" class="form-control" id="UserDepartment" value={this.state.UserDepartment}
                            name="UserDepartment" placeholder="Enter the  Department"
                            onChange={this.handleText}/>
                            
                        </div>


                        <label > Valid Accesss Time</label>                     
                    <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"  disabled="" id='day' name="Day"
                        value={this.state.Day}
                        onClick={() => {
  
                            this.setState({Day: !this.state.Day});}}
                        />
                        Day time (7.00 am to 6.00 pm)
                        </label>
                    </div>
                    <div class="form-check disabled">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox"  disabled="" id='night' name='Night'
                        value={this.state.Night}
                        onClick={() => {
  
                            this.setState({Night: !this.state.Night});}  }
                        />
                        Night time (6.00 pm to 7.00 am)
                        </label>
                    </div>
                        <br/>
    
                        </fieldset>
                    </form>
                    <button type="submit" class="btn btn-primary" id='updatebtn' onClick={()=>this.OnUpdate()}>Update</button>
                    <button type="submit" class="btn btn-warning"  onClick={this.OnExit}>Exit</button>
                    
                   
                </div>
            )
            
        }
    }
    
    


export default Edit;