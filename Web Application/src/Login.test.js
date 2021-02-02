import React from 'react';
import Enzyme ,{shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Login from "./Login.js";
import sinon from 'sinon';

import { render, cleanup, fireEvent } from '@testing-library/react';
import fire from './config/fire';
import { authMock } from './setupTests';
// @ts-ignore



Enzyme.configure({ adapter: new Adapter() });

const preventDefault=()=>{};


describe('Login',()=>{
    afterEach(cleanup);
    let wrapper;
    beforeAll(() => {
        wrapper =mount(<Login/>);
     })
    const simulateChangeOnInput =(wrapper,inputSelector,newvalue,newName)=>{
        const input =wrapper.find(inputSelector)
        input.simulate('change',{
            target:{name: newName,value:newvalue},
        })
        return wrapper.find(inputSelector)
    }
    it('should show text',()=>{
        //const wrapper=shallow(<Login/>);
        const text = wrapper.find('#labelemail');
        expect(text.text()).toBe('Email address');
    });
    it('Check submit button',()=>{
        //const wrapper=mount(<Login/>);
        const text = wrapper.find('#SignInBtn');
        expect(text.text()).toBe('Sign in');
       
     });
     it('Password and email input taken correctly',()=>{
        
        const input1= simulateChangeOnInput(wrapper,'#email','test@gmail.com','email')
        const input2=simulateChangeOnInput(wrapper,'#password','qwertn2','password')
        
        expect(input1.props().name).toEqual('email')
        expect(input1.props().value).toEqual('test@gmail.com')
        expect(input2.props().name).toEqual('password')
        expect(input2.props().value).toEqual('qwertn2')
    });

  
    
    it('calls login function on click', async () => {
        const wrapper=mount(<Login/>);
        const spy= jest.spyOn(wrapper.instance(), "login");
        fire.auth().signInWithEmailAndPassword =  jest.fn().mockImplementation(() => Promise.resolve());
        wrapper.update();
    //const preventDefault= jest.fn()
        expect(spy).toHaveBeenCalledTimes(0);
    //await wrapper.find('#SignInBtn').prop('onClick')();
         wrapper.find('#SignInBtn').prop('onClick')();
    //wrapper.find('#SignInBtn').simulate('click');
        //wrapper.find('#SignInBtn').simulate('click');
        expect(spy).toBeCalled();
        
     
    });
  /*  it('Check Continue button',()=>{
        const wrapper=mount(<Login/>);
        console.log(wrapper.html())
        const text = wrapper.find('#SentOtp');
        expect(text.text()).toBe('Continue');
       
     }); 
    it('calls login function on click', async () => {
        const wrapper=mount(<Login/>);
        const spy= jest.spyOn(wrapper.instance(), "OnSignInSubmit");
        fire.auth().signInWithPhoneNumber =  jest.fn().mockImplementation(() => Promise.resolve());
        
        
        wrapper.update();
        console.log (wrapper.debug())
    //const preventDefault= jest.fn()
        expect(spy).toHaveBeenCalledTimes(0);
      //await wrapper.find('#SignInBtn').prop('onClick')();
      //wrapper.find('#callSentOtp').prop('onClick')();
       wrapper.find('#SentOtp').simulate('click');
        //wrapper.find('#SignInBtn').simulate('click');
        expect(spy).toBeCalled();
        
         
        });*/

});