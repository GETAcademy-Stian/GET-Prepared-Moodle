import React from 'react';

function TodoItem({ todo, onChangeStatus, onDelete }) {
  const handleCheckboxChange = () => {
    onChangeStatus(todo.id);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <li className="flex items-center justify-between border-b border-gray-300 py-2">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <span
          className={`text-lg ${todo.completed ? 'line-through' : ''}`}
        >
          {todo.text}
        </span>
      </label>
      <button
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={handleDeleteClick}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
