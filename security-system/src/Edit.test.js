
import React from 'react';
import Enzyme ,{shallow, mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Edit from "./Edit.js";
import {  cleanup } from '@testing-library/react';


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
         wrapper =mount(<Edit/>);
      })
    it('Check update input ',()=>{
       
        const nameinput=simulateChangeOnInput(wrapper,'#UserName','testName','UserName')
        const deptinput=simulateChangeOnInput(wrapper,'#UserDepartment','testDepartment','UserDepartment')
        
        expect(nameinput.props().name).toEqual('UserName')
        expect(deptinput.props().name).toEqual('UserDepartment')
        expect(nameinput.props().value).toEqual('testName')
        expect(deptinput.props().value).toEqual('testDepartment')
    

    });
    it('Check update Day input ',()=>{
        //const wrapper= shallow(<AddData/>)
        let IDinput =wrapper.find('#day')
        expect(IDinput.props().name).toEqual('Day')
        expect(IDinput.props().value).toEqual(false)
        //wrapper.find('#day').prop('onClick')();
        IDinput.simulate('click', { target: { Day: true}});
        IDinput=wrapper.find('#day')
    expect(IDinput.props().value).toEqual(true)
    });
    it('Check update Night input ',()=>{
        //const wrapper= shallow(<AddData/>)
        let IDinput =wrapper.find('#night')
        expect(IDinput.props().name).toEqual('Night')
        expect(IDinput.props().value).toEqual(false)
        //wrapper.find('#day').prop('onClick')();
        IDinput.simulate('click', { target: { Night: true}});
        IDinput=wrapper.find('#night')
    expect(IDinput.props().value).toEqual(true)
    });
    it('When submit button clicks call th OnUpdate function to edit database', async () => {
    // const wrapper=mount(<AddData/>);
        const spy1= jest.spyOn(wrapper.instance(), "OnUpdate");
        const spy2= jest.spyOn(wrapper.instance(), "handleValidation");

        jest.spyOn(document, 'querySelector').mockReturnValue({
            getAttribute: jest.fn().mockReturnValue('MOCK-CSRF-TOKEN-VALUE')
        })    
        wrapper.find('#updatebtn').prop('onClick')();
        wrapper.update();
        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
        
    });
    it('calls search function when ID entered', async () => {
        
        const spy= jest.spyOn(wrapper.instance(), "OnSearch");
       
        jest.spyOn(document, 'querySelector').mockReturnValue({
            getAttribute: jest.fn().mockReturnValue('MOCK-CSRF-TOKEN-VALUE')
          })
        wrapper.update();
        expect(spy).toHaveBeenCalledTimes(0);
         wrapper.find('#searchbtn').prop('onClick')();
        expect(spy).toBeCalled();
        
     
    });
    it('Search Id input must taken correctly',()=>{
        const wrapper2=mount(<Edit/>);
        let input =wrapper2.find('#SearchId')
        expect(input.props().name).toEqual('searchId')
        expect(input.props().value).toEqual('')
         input.simulate('change',{
        target:{name: 'searchId',value:'200'},
         })
         input =wrapper2.find('#SearchId')
         expect(input.props().name).toEqual('searchId')
        expect(input.props().value).toEqual('200')
    });
});