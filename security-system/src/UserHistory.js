import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {  Link} from 'react-router-dom';
import ViewHistory from "./ViewHistory.js";

const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');

class UserHistory extends Component{
    
    constructor(props){
        super(props)
        this.decrypt =this.decrypt.bind(this);
        this.state ={
            userhistory:[],
            DBtag:'',
            isExit:false
            
        }
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
    componentDidMount(){
        
        
        let newState =[];
        
        const empref = fire.database().ref("/Users");
        empref.on("value", snapshot => {
        let userhistory = snapshot.val();
        console.log("/Users",userhistory)
              for(let id in userhistory){
                  
                 newState.push({
                    UserID : this.decrypt(userhistory[id]['UserID']),
                    UserName:this.decrypt(userhistory[id]['UserName']),
                    UserDepartment : userhistory[id]['UserDepartment'],
                    LastModifiedDate : userhistory[id]['LastModifiedDate'],
                        
                      }) ;
                      //console.log('Username',UserName);
                          console.log('fire',userhistory[id]['UserName']);
              }
              this.setState({ userhistory: newState });
              // this.setState({infoExists:true})
               
               console.log('state userhistory :',this.state.userhistory)
  
          console.log("newState:",newState);
          });    
           
      }
     
     
    render(){
        if(this.state.isExit){
            return <Link to="/ViewHistory"component={ViewHistory}/>;
        }
       
        return(
            <div>
                    
                    <br/>
                    <br/>
                    <h5>Employee Data modification History</h5>
         
                    <table class="table table-info">
                    <thead>
                        <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Name</th>
                        
                        <th scope="col">Registered Data Last Modified date and time</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.userhistory? this.state.userhistory.map(emp => {
                                    return ( 
                            <tr class="table-active">
                            <td>{emp.UserID}</td> 
                            <td>{emp.UserName}</td>
                            
                            <td>{emp.LastModifiedDate}</td>

                                        
                                    </tr>
                                );
                                }) :''}
                    </tbody>
                    </table>
                <br/><br/>
               
                <button type="submit" class="btn btn-primary" onClick={() => {

                this.setState({isExit: true});
                }} >Back</button>
            </div>
        )
    }
}

export default UserHistory;