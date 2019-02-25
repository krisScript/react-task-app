import React, { Component } from 'react';
const uuidv4 = require('uuid/v4')

class TaskForm extends Component {
  state = {
    title: '',
    description: ''
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
      task.id =  uuidv4()
      this.props.addTask(this.state)
      this.resetForm()
      
  }
  render() {
    const { title, description } = this.state;
    return (
      <form className="task-form" onSubmit={this.onSubmit}>
        <input name="title" placeholder="Enter task title" type="text" value={title} onChange={this.onChange} required/>
        <input name="description" placeholder="Enter task description" type="text" value={description} onChange={this.onChange} required />
        <button>Submit</button>
      </form>
    );
  }
}

export default TaskForm;
