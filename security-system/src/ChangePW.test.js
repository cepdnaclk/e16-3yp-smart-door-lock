import ChangeNumber from './ChangeNumber.js';
import Enzyme ,{mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import {  cleanup } from '@testing-library/react';
import ChangePW from './ChangePW.js';

Enzyme.configure({ adapter: new Adapter() });



describe('Change password',()=>{
    afterEach(cleanup);
   let wrapper;
    beforeAll(() => {
         wrapper =mount(<ChangePW/>);
      })
      const simulateChangeOnInput =(wrapper,inputSelector,newvalue,newName)=>{
        const input =wrapper.find(inputSelector)
        input.simulate('change',{
            target:{name: newName,value:newvalue},
        })
        return wrapper.find(inputSelector)
    }
    
    

    it('calls search function when ID entered', async () => {
        
        const spy= jest.spyOn(wrapper.instance(), "handdleChangePW");
       
        jest.spyOn(document, 'querySelector').mockReturnValue({
            getAttribute: jest.fn().mockReturnValue('MOCK-CSRF-TOKEN-VALUE')
          })
        wrapper.update();
        expect(spy).toHaveBeenCalledTimes(0);
         wrapper.find('#PWbtn').prop('onClick')();
        expect(spy).toBeCalled();
        
     
    });
    
   
  

});