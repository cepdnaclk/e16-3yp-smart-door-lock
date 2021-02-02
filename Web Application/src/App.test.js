import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme ,{shallow,mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
describe('App',()=>{
  it("app renders correctly. matches the snapshot", () => {
    const tree= renderer.create(
      <App />
    ).toJSON();
  
    expect(tree).toMatchSnapshot();
  });
  it("app routers renders correctly. matches the snapshot", () => {
    const wrapper= mount(
      <App />
    );
    let content =wrapper.find('container');
    
    expect(toJson(content)).toMatchSnapshot();
  });
  
  });
  