import React, {Component} from "react";
import fire from "./config/fire.js";
import Home from "./Home.js";
import {  Link} from 'react-router-dom';
import ViewHistory from "./ViewHistory.js";

class AdminHistory extends Component{
    
    constructor(props){
        super(props)
        
        this.state ={
            adminhistory:[],
            DBtag:'',
            isExit:false
            
        }
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
                  
                 newState2.push({
                    UserID : userhistory2[id]['UserID'],
                    UserName:userhistory2[id]['UserName'],
                    UserDepartment : userhistory2[id]['UserDepartment'],
                    LastSignIn : userhistory2[id]['LastSignIn'],    
                      }) ;
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
                          <th scope="col">UserName</th>
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