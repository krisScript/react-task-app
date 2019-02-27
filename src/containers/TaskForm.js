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
     <div className="field">
     <div className="control">   <input name="title" className="input"  placeholder="Enter task title" type="text" value={title} onChange={this.onChange} required/></div></div>
     <div className="field">
     <div className="control">   <input name="description" className="input" placeholder="Enter task description" type="text" value={description} onChange={this.onChange} required /></div></div>
     <div class="field is-grouped">
  <div class="control">
  <button id="submit-btn" className="button is-primary">Submit</button>
  </div>
  <div class="control">
  <button id="reset-btn" type="button" onClick={this.resetForm}>Reset</button>
  </div>
</div>
       
      </form>
    );
  }
}

export default TaskForm;
