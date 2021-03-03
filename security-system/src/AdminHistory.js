import React, {Component} from "react";
import fire from "./config/fire.js";
import {  Link} from 'react-router-dom';
import ViewHistory from "./ViewHistory.js";

const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');

class AdminHistory extends Component{
    
    constructor(props){
        super(props)
        this.decrypt =this.decrypt.bind(this);
        this.state ={
            adminhistory:[],
            DBtag:'',
            isExit:false
            
        }
    }
   
  
     decrypt(ciphertextStr){
        let ciper =ciphertextStr
        let ciphertext = CryptoJS.enc.Base64.parse(ciper);
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
    componentDidMount(){
        
        let newState2 =[];
        
        const empref2 = fire.database().ref("/AdminProfiles");
        empref2.on("value", snapshot => {
            // console.log(snapshot.val().enter_date);
        let userhistory2 = snapshot.val();
        console.log("/Users",userhistory2)
          // console.log(snapshot.child("/AdminId").val());
         
              for(let id in userhistory2){
                 if(userhistory2[id]['UserID'] !=null){ 
                 newState2.push({
                    UserID :this.decrypt(userhistory2[id]['UserID']),
                    UserName:this.decrypt(userhistory2[id]['UserName']),
                    UserDepartment : userhistory2[id]['UserDepartment'],
                    LastSignIn : userhistory2[id]['LastSignIn'],    
                      }) ;}
                      //console.log('Username',UserName);
                          console.log('fire',userhistory2[id]['UserName']); 
              }
              this.setState({ adminhistory: newState2 });
              // this.setState({infoExists:true})
               
               console.log('state userhistory :',this.state.userhistory)
  
          console.log("newState:",newState2);
         
          }); 
           
           
      }
     
     
    render(){
        if(this.state.isExit){
            return <Link to="/ViewHistory"component={ViewHistory}/>;
        }
       
        return(
            <div>
                    

                    <br/>
                    <h5>  Admin SignIn History</h5>
                    <br/>
                                           
                    <table class="table table-secondary">
                      <thead>
                        <tr>
                          <th scope="col">User ID</th>
                          <th scope="col">User Name</th>
                          <th scope="col">Last Sign in to web</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.adminhistory? this.state.adminhistory.map(emp => {
                                    return ( 
                            <tr class="table-active">
                            <td>{emp.UserID}</td> 
                            <td>{emp.UserName}</td>
                            <td>{emp.LastSignIn}</td>

                                        
                                      </tr>
                                  );
                                }) :''}
                      </tbody>
                    </table>
                    <br/>
               
                <button type="submit" class="btn btn-primary" onClick={() => {

                this.setState({isExit: true});
                }} >Back</button>
            </div>
        )
    }
}

export default AdminHistory;