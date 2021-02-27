import React from 'react';
import Enzyme ,{shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddData from "./AddData.js";
import { cleanup } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

const simulateChangeOnInput =(wrapper,inputSelector,newvalue,newName)=>{
    const input =wrapper.find(inputSelector)
    input.simulate('change',{
        target:{name: newName,value:newvalue},
    })
    return wrapper.find(inputSelector)
}
describe('Form input check',()=>{
    afterEach(cleanup);
    let wrapper;
    beforeAll(() => {
         wrapper =mount(<AddData/>);
      })

    it('Check input ',()=>{
       
        const idinput= simulateChangeOnInput(wrapper,'#UserID','200','UserID')
        const nameinput=simulateChangeOnInput(wrapper,'#UserName','testName','UserName')
        const deptinput=simulateChangeOnInput(wrapper,'#UserDepartment','testDepartment','UserDepartment')
        
        expect(idinput.props().name).toEqual('UserID')
        expect(idinput.props().value).toEqual('200')
        expect(nameinput.props().value).toEqual('testName')
        expect(deptinput.props().value).toEqual('testDepartment')
       

    });
    it('Check Day input ',()=>{
        
        let IDinput =wrapper.find('#day')
        expect(IDinput.props().name).toEqual('Day')
        expect(IDinput.props().value).toEqual(false)
        //wrapper.find('#day').prop('onClick')();
        IDinput.simulate('change', { target: { Day: true}});
        IDinput=wrapper.find('#day')
       expect(IDinput.props().value).toEqual(true)
    });
    it('Check Night input ',()=>{
        
        let IDinput =wrapper.find('#night')
        expect(IDinput.props().name).toEqual('Night')
        expect(IDinput.props().value).toEqual(false)
        //wrapper.find('#day').prop('onClick')();
        IDinput.simulate('change', { target: { Night: true}});
        IDinput=wrapper.find('#night')
       expect(IDinput.props().value).toEqual(true)
    });
 it('When submit button clicks call th OnSubmit function ', async () => {
      
        const spy1= jest.spyOn(wrapper.instance(), "OnSubmit");
        const spy2= jest.spyOn(wrapper.instance(), "handleValidation");

        jest.spyOn(document, 'querySelector').mockReturnValue({
            getAttribute: jest.fn().mockReturnValue('MOCK-CSRF-TOKEN-VALUE')
          })    
          wrapper.find('#submit').prop('onClick')();
        wrapper.update();
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        
    });

});

