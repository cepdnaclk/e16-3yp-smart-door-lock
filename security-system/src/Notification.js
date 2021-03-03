import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {  Link} from 'react-router-dom';
import ViewHistory from "./ViewHistory.js";

const CryptoJS = require('crypto-js');
const key = CryptoJS.enc.Utf8.parse('1234567890123456');


class Notification extends Component{
    
    constructor(props){
        super(props)
        this.decrypt =this.decrypt.bind(this);
        this.state ={
            unauthorized:[],
            DBtag:'',
            isExit:false,
            notification:false
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
        
        
        let newState2 =[];
        
        const empref2 = fire.database().ref("/Unauthorized Access");
        empref2.on("value", snapshot => {
            // console.log(snapshot.val().enter_date);
        let userhistory2 = snapshot.val();    
              for(let id in userhistory2){
                  
                 newState2.push({
                    //UserID : userhistory[id]['UserID'],
                    UserId:this.decrypt(userhistory2[id]['userid']),
                    date_time: userhistory2[id]['date & time'],
                        
                      }) ;
                      
                          console.log('fire',userhistory2[id]['UserName']); 
              }
              this.setState({ unauthorized: newState2 });
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
                    <br/>
                    <h5>Tried Unauthorized Access</h5>

                                           
                    <table class="table table-secondary">
                      <thead>
                        <tr>
                          <th scope="col">Entered ID</th>
                          <th scope="col">date and time</th>
                         
                          
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.unauthorized? this.state.unauthorized.map(emp => {
                                    return ( 
                            <tr class="table-active">
                            <td>{emp.UserId}</td> 
                            <td>{emp.date_time}</td>
                            

                                        
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

export default Notification;