import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");

	const handleAddTodo = () => {
		if (newTodo.trim() !== "") {
			setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
			setNewTodo("");
		}
	};

	const handleChangeTodoStatus = (id) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
	};

	const handleDeleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div>
			<h1>Todo App</h1>
			<div>
				<input type="text" placeholder="Add todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
				<button onClick={handleAddTodo}>Add Todo</button>
			</div>
			<ul>
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onChangeStatus={handleChangeTodoStatus} onDelete={handleDeleteTodo} />
				))}
			</ul>
		</div>
	);
}

export default App;
