import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {  Link} from 'react-router-dom';
import Notification from "./Notification.js";
import AdminHistory from "./AdminHistory.js";
import userhistory from "./UserHistory.js";

const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');

class ViewHistory extends Component{
    
    constructor(props){
        super(props)
        this.OnSearch =this.OnSearch.bind(this);
        this.handlesearch =this.handlesearch.bind(this);
        this.handleText =this.handleText.bind(this);
        this.encrypt =this.encrypt.bind(this);
        this.decrypt =this.decrypt.bind(this);
        this.state ={
            userhistory:[],
            AdminHistory:[],
            Attendance : [],
            emps:[],
            DBtag:'',
            isExit:false,
            searchId :"",
            notification:false
        }
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
    handleText=e=>{
            
      this.setState({
          [e.target.name] : e.target.value
      })
      
  }
    
      handlesearch(){
        let serachfill=true;
        if(this.state.searchId==''){
            serachfill =false
        }
        return serachfill;
      }
      OnSearch=e=>{
        if(this.handlesearch()){
        let newState =[];
        let count=0;
        let a =false;
        console.log("this is onSearch")
        const empref = fire.database().ref("/Attendance");
        empref.on("value", snapshot => {
          // console.log(snapshot.val().enter_date);
          let userhistory = snapshot.val();
        console.log("/Attendance",userhistory)
        console.log( 'length',Object.keys(userhistory).length)
        //console.log(snapshot.child("/AdminId").val());
        
       
            for(let id in userhistory){
                count++;
                var storedid =this.decrypt(userhistory[id]['userid']);
                console.log('storedId',storedid)
                console.log('searchid',this.state.searchId)
                if(storedid == this.state.searchId){
                    console.log('id',id)
                    a=true;
                   this.setState({ DBtag: id });
                   
                   
                    console.log('IDsetstate',this.state.UserID)
                    
                   newState.push({
                    UserID : this.decrypt(userhistory[id]['userid']),
                    UserName:this.decrypt(userhistory[id]['UserName']),
                    EnteredDateTime : userhistory[id]['date & time']
                    }) ;
                    
                        console.log('fire',userhistory[id]['UserName']);
                        this.setState({ emps: newState });
                        this.setState({infoExists:true})
                        
                        console.log('emps :',this.state.emps)
                        document.querySelector('#regmsg').textContent="Search successfull. Employee exists!!";
                }
                else if (count==Object.keys(userhistory).length&&(!a)){
                  document.querySelector('#regmsg').textContent='No records for given ID'
                }
               
            
            }
            

        console.log("newState:",newState);
        console.log('tag',this.state.DBtag)

        
        }); 
         
        }
       
        else{
           // alert('Search bar is empty. Please add a valid ID to search')
          document.querySelector('#regmsg').textContent="Search bar is empty. Please add a valid ID to search";
        }
       
        
    }
    render(){
        if(this.state.isExit){
            return <Link to="/home"component={Home}/>;
        }
        if(this.state.notification){
          return <Link to="/Notification"component={Notification}/>; 
      }
      if(this.state.AdminAccess){
        return <Link to="/AdminHistory"component={AdminHistory}/>; 
    }
    if(this.state.userreg){
      return <Link to="/UserHistory"component={userhistory}/>; 
  }

        return(
            <div>
                    
                    <br/>
                    <h2> History of Access</h2>
                    <br/>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary"onClick={() => {

                      this.setState({notification: true});
                      }}>Notifications</button>
                      <button type="button" class="btn btn-secondary" onClick={() => {

                      this.setState({AdminAccess: true});
                      }}>AdminSignInHistory</button>
                       <button type="button" class="btn btn-secondary" onClick={() => {

                      this.setState({userreg: true});
                      }}>UserDataModificationHistory</button>
                      
                    </div>
                   <br/><br/>
                    <p class="text-warning" id='regmsg'></p> 
                    <br/>
                    <form class="form-inline my-2 my-lg-0">
                         <input class="form-control" type="text" autoComplete='off' name='searchId' 
                         id='SearchId'onChange={this.handleText} value={this.state.searchId} placeholder="Enter User ID"/>
                       
                    </form>

                    <button class="btn btn-primary" type="submit" id='searchbtn' onClick={()=>this.OnSearch()}>Search</button>
                    <button type="submit" class="btn btn-primary" onClick={() => {

                    this.setState({isExit: true});
                    }} >Exit</button>
                    <br/>
                    <br/>
                    

                                           
                    <table class="table table-active">
                      <thead>
                        <tr>
                          <th scope="col">User ID</th>
                          <th scope="col">User Name</th>
                          <th scope="col">Last modified date and time</th>
                         
                          
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.emps? this.state.emps.map(emp => {
                          return ( 
                            <tr class="table-active">
                            <td>{emp.UserID}</td> 
                            <td>{emp.UserName}</td>
                            <td>{emp.EnteredDateTime}</td>         
                            </tr>
                                  );
                      }) :''}
                      </tbody>
                    </table>

                    
                <br/><br/>
                    
                
            </div>
        )
    }
}

export default ViewHistory;