import ChangeNumber from './ChangeNumber.js';
import Enzyme ,{mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import {  cleanup } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });



describe('Change Phonenumber',()=>{
    afterEach(cleanup);
   let wrapper;
    beforeAll(() => {
         wrapper =mount(<ChangeNumber/>);
      })
    
    

    it('calls Change function to change phone number', async () => {
        
        const spy= jest.spyOn(wrapper.instance(), "change");
       
        jest.spyOn(document, 'querySelector').mockReturnValue({
            getAttribute: jest.fn().mockReturnValue('MOCK-CSRF-TOKEN-VALUE')
          })
        wrapper.update();
        expect(spy).toHaveBeenCalledTimes(0);
         wrapper.find('#changebtn').prop('onClick')();
        expect(spy).toBeCalled();
        
     
    });
    it('Phone number input must taken correctly',()=>{
        const wrapper2=mount(<ChangeNumber/>);
        let input =wrapper2.find('#number')
        expect(input.props().name).toEqual('number')
        expect(input.props().value).toEqual('')
         input.simulate('change',{
        target:{name: 'number',value:'+94717700114'},
         })
         input =wrapper2.find('#number')
        
        expect(input.props().value).toEqual('+94717700114')
    });
   
  

});