import React from 'react';
import Enzyme ,{shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Home from "./Home.js";


import { render, cleanup, fireEvent } from '@testing-library/react';
import Firebase from './config/fire';
import { authMock } from './setupTests';
// @ts-ignore
Firebase.auth.onAuthStateChanged = authMock;

Enzyme.configure({ adapter: new Adapter() });


describe('Log out', () => {
  afterEach(cleanup);
  
  it('calls Firebase signOut on click', async () => {
    const wrapper=mount(<Home/>);
    const spy= jest.spyOn(wrapper.instance(), "logout");
    wrapper.update();
    const button = wrapper.find('#logoutbtn');
    console.log (wrapper.debug())

    expect(spy).toHaveBeenCalledTimes(0);
    wrapper.find('#logoutbtn').simulate('click');
    
    expect(spy).toHaveBeenCalledTimes(1);
     
    });
  });

/*
describe('Log out', () => {
afterEach(cleanup);

  it('calls Firebase signOut on click', async () => {
   //const spy= sinon.spy(Home.prototype, 'logout');
   
   // jest.clearAllMocks();
    //jest.spyOn(React, 'authListener').mockImplementation(f => f());
    const wrapper=mount(<Home/>);
    
   const spy= jest.spyOn(wrapper.instance(), "logout");
   wrapper.update();
    const button = wrapper.find('#logoutbtn');
  console.log (wrapper.debug())
    
    //fireEvent.click(button);
//await wrapper.find('#logoutbtn').simulate('click');
expect(spy).toHaveBeenCalledTimes(0);
  wrapper.find('#logoutbtn').simulate('click');
  wrapper.find('#logoutbtn').simulate('click');
expect(spy).toHaveBeenCalledTimes(1);
   
  });
}); */
/*
describe('Home',()=>{
    it('should show logout ',()=>{
let logout = sinon.spy(),
//const wrapper=shallow(<Home  />);
//const text = wrapper.find('#logoutbtn');
  wrapper = shallow(<Home />)

wrapper.find('#logoutbtn').simulate('click')
expect(logout).toHaveBeenCalled();
//logout.called.should.equal(true)
});
});

*/