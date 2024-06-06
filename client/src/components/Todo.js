import React from 'react';

export const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? 'line-through' : '',
      }}
    >
      <div className="content">
        <p>
          <strong>Task:</strong> {todo.task}
        </p>
        <p className="category">
          <strong>Category:</strong> {todo.category}
        </p>
        <p className="date-added">
          <strong>Created in: </strong>
          {todo.dateAdded}
        </p>
      </div>
      <div>
        <button
          type="button"
          className="complete"
          onClick={() => completeTodo(todo._id)}
        >
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button
          type="button"
          className="remove"
          onClick={() => removeTodo(todo._id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
