import React, {Component} from "react";
import fire from "./config/fire.js";
import {Link} from 'react-router-dom';
import Edit from "./Edit.js";



class ChangeNumber  extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.change = this.change.bind(this);
        this.numberValidation = this.change.bind(this);
        
        this.state ={
            number : "",
            isBack : false
           

        }
    }
    handleChange=e=>{
        this.setState({
            [e.target.name] : e.target.value
            
        })
       
    }
  
    numberValidation = () => /^\d+$/.test(this);

    change(){
        //this.numberValidation();
        let num =this.state.number;
        let l= num.length;
        let first =num[0];
        let value;
        let count=0;
        for(var i = 0; i < (l); i++ ){
            value = /^\d+$/.test(num[i]);
            count++;
        }
        console.log(value)
        console.log(first)
        console.log(l)
        console.log(count)
        
        if(value && (first=='+') && (count==12)&&(l==12)){
        const empref = fire.database().ref("/");
        empref.update({
          
          OTPnumber : this.state.number

        });
        console.log('update complete')
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        document.querySelector('#regmsg').textContent="Update successfull !!";
        }
    
        else{
            document.querySelector('#regmsg').textContent="Invalid Phone Number";
           
         }
    }

  

    render(){
       
       if(this.state.isBack){
        return <Link to="/Edit"component={Edit}/>;
       }


        return(
            <div>
            
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"> Enter phone number</h5>
            </div>
            <div class="modal-body">
                                    

                <div class="form-group">
                
                    <input type="text" class="form-control" name="number" id="number"  placeholder="+94........."
                    onChange = {this.handleChange}  
                    value ={this.state.number} />
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id='changebtn' onClick={()=>this.change()}>Change</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => {
  
                     this.setState({isBack: true});
                }}>
                    Exit
                </button>
            </div>
            </div>
        </div>
        <label id ='#error'class="text-info">Enter the country code first<br/>There should be 11 digits and no letters <br/>Example : +94714554552</label> 
        <br/>
        <p class="text-warning" id='regmsg'></p> 
        </div>
        )
    }
}

export default ChangeNumber;