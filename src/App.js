import React, { Component, Fragment } from 'react';
import Task from './components/Task';
import TaskForm from './containers/TaskForm';
import Toggle from './containers/Toggle';
import Portal from './containers/Portal';
import saveTasksToLS from './utilities/saveTasksToLS';
import './App.css';

class App extends Component {
  state = {
    tasks: []
  };

  addTask = task => {
    console.log(task);
    this.setState(
      prevState => ({
        tasks: [...prevState.tasks, task]
      }),
      () => {
        saveTasksToLS(this.state.tasks);
      }
    );
  };

  deleteTask = taskId => {
    const editedTasks = [...this.state.tasks].filter(
      task => task.id !== taskId
    );
    console.log(editedTasks);
    this.setState(
      prevState => ({
        tasks: editedTasks
      }),
      () => {
        saveTasksToLS(this.state.tasks);
      }
    );
  };
  editTask = editedTask => {
    const editedTasks = [...this.state.tasks].filter(task => {
      return task.id !== editedTask.id;
    });
  };
  getTasks = (toggle) => {
    return this.state.tasks.map(task => {
      return <Task key={task.id} title={task.title} description={task.description}  deleteTask={() => this.deleteTask(task.id)} openEditModal={() => {
        console.log(toggle)
        toggle()
      }}/>
    })
  }
  render() {
    return (
      <div className="App">
  
        <div>
          <Toggle>
            {({ on, toggle }) => (
              <>
                {on && (
                  <Portal>
                          <TaskForm addTask={this.addTask} />
                  </Portal>
                )}
                <button onClick={toggle}>{on ? "Close" : "Open"}</button>
               
              </>
            )}
          </Toggle>
          <div>
       
          <Toggle>
            {({ on, toggle }) => (
              <>
                {on && (
                  <Portal>
                          <h1>Edit Task</h1>
                  </Portal>
                )}
                 <div>
                  { this.state.tasks.length > 0 ? this.getTasks(toggle) :<h1 >No Tasks!</h1>}
                </div>
               
              </>
            )}
          </Toggle>
         
          </div>
        </div>
      </div>
    );
  }
}

export default App;
