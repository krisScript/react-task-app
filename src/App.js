import React, { Component, Fragment } from 'react';
import Task from './components/Task';
import TaskForm from './containers/TaskForm/TaskForm';
import Toggle from './containers/Toggle';
import Portal from './containers/Portal';
import saveTasksToLS from './utilities/saveTasksToLS';
import './App.css';

class App extends Component {
  state = {
    editTask: null,
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
    this.setState(prevState => ({
      tasks: [...editedTasks, editedTask]
    }));
    saveTasksToLS([...editedTasks, editedTask]);
  };
  setEditTask = task => {
    this.setState(prevState => ({
      editTask: task
    }));
  };
  getTasks = (toggle, setEditTask) => {
    return this.state.tasks.map(task => {
      return (
        <Task
          key={task.id}
          title={task.title}
          description={task.description}
          id={task.id}
          deleteTask={() => this.deleteTask(task.id)}
          openEditModal={() => {
            toggle();
          }}
          setEditTask={setEditTask}
        />
      );
    });
  };
  componentDidMount = () => {
    const lsTasks = JSON.parse(localStorage.getItem('tasks'));
    if (lsTasks) {
      this.setState(prevState => ({
        tasks: [...lsTasks]
      }));
    }
  };
  render() {
    return (
      <div className="App">
        <div>
          <Toggle>
            {({ on, toggle }) => (
              <>
                {on && (
                  <Portal>
                    <TaskForm addTask={this.addTask} closeToggle={toggle} />
                  </Portal>
                )}
                <button id="btn-add" onClick={toggle}>{on ? 'Close' : 'Open'}</button>
              </>
            )}
          </Toggle>
          <div>
            <Toggle>
              {({ on, toggle }) => (
                <>
                  {on && (
                    <Portal>
                      <TaskForm
                        editTaskFunc={this.editTask}
                        editTask={this.state.editTask}
                        closeToggle={toggle}
                      />
                    </Portal>
                  )}
                  <div>
                    {this.state.tasks.length > 0 ? (
                      this.getTasks(toggle, this.setEditTask)
                    ) : (
                      <h1>No Tasks!</h1>
                    )}
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
