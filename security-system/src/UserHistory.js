import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {  Link} from 'react-router-dom';
import ViewHistory from "./ViewHistory.js";

class UserHistory extends Component{
    
    constructor(props){
        super(props)
        
        this.state ={
            userhistory:[],
            DBtag:'',
            isExit:false
            
        }
    }
   
    componentDidMount(){
        
        
        let newState =[];
        
        const empref = fire.database().ref("/Users");
        empref.on("value", snapshot => {
        let userhistory = snapshot.val();
        console.log("/Users",userhistory)
              for(let id in userhistory){
                  
                 newState.push({
                    UserID : userhistory[id]['UserID'],
                    UserName:userhistory[id]['UserName'],
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