import React from 'react';

const Task = props => (
  <div className="task">
    <h2>{props.title}</h2>
    <p>{props.description}</p>
    <div className="btn-container">
      <button
        onClick={() => {
          props.openEditModal();
          props.setEditTask({
            title: props.title,
            description: props.description,
            id: props.id
          });
        }}
        className="delete-btn"
      >
        Edit
      </button>
      <button onClick={props.deleteTask} className="edit-btn">
        Delete
      </button>
    </div>
  </div>
);

export default Task;
