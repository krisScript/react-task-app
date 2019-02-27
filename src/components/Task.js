import React from 'react';

const Task = props => (

<div className="card">
  <header className="card-header">
    <p className="card-header-title">
    {props.title}
    </p>
    <a href="#" className="card-header-icon" aria-label="more options">
      <span className="icon">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div className="card-content">
    <div className="content">
    <p>{props.description}</p>
    </div>
  </div>
  <footer class="card-footer">
  <button
        onClick={() => {
          props.openEditModal();
          props.setEditTask({
            title: props.title,
            description: props.description,
            id: props.id
          });
        }}
        className="delete-btn button"
      >
        Edit
      </button>
      <button onClick={props.deleteTask} className="edit-btn button">
        Delete
      </button >
  </footer>
</div>
);

export default Task;
