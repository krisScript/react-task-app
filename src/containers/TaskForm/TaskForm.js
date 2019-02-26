import React, { Component } from 'react';
const uuidv4 = require('uuid/v4')

class TaskForm extends Component {
  state = {
    title: '',
    description: '',
    id:''
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  resetForm = () => {
    this.setState({
      title:'',
      description:''
    })
  }
  onSubmit = e => {
      e.preventDefault()
      const task = this.state
      if(this.props.editTask){
        this.props.editTaskFunc(this.state)
      }else{
        this.setState(prevstate => ({
          id:uuidv4()
        }))
        this.props.addTask(this.state)
      }
      this.resetForm()
      this.props.closeToggle()
      
      
  }
  componentDidMount = () => {
    if(this.props.editTask){
      const {id,title,description} = this.props.editTask
      this.setState(
        prevState => ({
          id,
          title,
          description
        })
       
      );
    }
  }
  
  render() {
    const { title, description } = this.state;
    return (
      <form className="task-form" onSubmit={this.onSubmit}>
        <input name="title"  placeholder="Enter task title" type="text" value={title} onChange={this.onChange} required/>
        <input name="description" placeholder="Enter task description" type="text" value={description} onChange={this.onChange} required />
        <button>Submit</button>
        <button id="reset-btn" type="button" onClick={this.resetForm}>Reset</button>
      </form>
    );
  }
}

export default TaskForm;
