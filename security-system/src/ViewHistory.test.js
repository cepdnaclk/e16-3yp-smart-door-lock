import React from 'react';
import Enzyme ,{ mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ViewHistory from "./ViewHistory.js";
import {  cleanup } from '@testing-library/react';


Enzyme.configure({ adapter: new Adapter() });




describe('ViewHistory',()=>{
    afterEach(cleanup);
   let wrapper;
    beforeAll(() => {
         wrapper =mount(<ViewHistory/>);
      })
    
    it('Search Id input must taken correctly',()=>{
        
        let input =wrapper.find('#SearchId')
        expect(input.props().name).toEqual('searchId')
        expect(input.props().value).toEqual('')
         input.simulate('change',{
        target:{name: 'searchId',value:'200'},
         })
         input =wrapper.find('#SearchId')
         expect(input.props().name).toEqual('searchId')
        expect(input.props().value).toEqual('200')
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
        const wrapper2=mount(<ViewHistory/>);
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