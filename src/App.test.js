import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()});
const app = shallow(<App/>)
describe('<App/>',() => {
  it('renders without crashing', () => {
    expect(app).toMatchSnapshot()
  }); 
  it('renders  state inital empty array called tasks ', () => {
    expect(app.state().tasks).toEqual([])
  });
  it('renders  state inital variable with value null called editTask ', () => {
    expect(app.state().editTask).toBeNull()
  });
  describe('#add-btn',() => {
    it(' adds new task when clicked', () => {
      beforeEach(() => {
        app.find('.btn-add').simulate('click')
      })
      afterEach(() => {
        app.setState({tasks:[]})
      })
    });
  })
})
