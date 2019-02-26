import React from 'react';
import ReactDOM from 'react-dom';
import TaskForm from './TaskForm';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16'
configure({adapter: new Adapter()});
const taskForm = shallow(<TaskForm/>)
describe('<TaskForm/>',() => {
  it('renders without crashing', () => {
    expect(taskForm).toMatchSnapshot()
  }); 
  it('renders  state inital empty array called tasks ', () => {
    expect(taskForm.state()).toEqual({
        title: '',
        description: '',
        id:''
    })
  });
   describe('entering input and reseting <TaskForm/> state',() => {

    beforeEach(() => {
        // taskForm.find("[name='title']").simulate('change',{target:{value:"new task"}})
        // taskForm.find("[name='description']").simulate('change',{target:{value:"new task description"}})
        taskForm.find("[name='title']").simulate('change',{target:{value:"new task"}})
    })
    afterEach(() => {
        taskForm.setState({
            title: '',
            description: '',
            id:''
          })
    })
       it('<TaskForm/> should have  changed state',() => {
        expect(taskForm.state()).toEqual({
            title: 'new task',
            description: 'new task description',
            id:''
        })
       })
    //    it('resets <TaskForm/> state on click',() => {
       
    //      taskForm.find('#reset-btn').simulate('click')
    //      expect(taskForm.state()).toEqual({
    //         title: '',
    //         description: '',
    //         id:''
    //     })
    //    })
   })
  
    
})
