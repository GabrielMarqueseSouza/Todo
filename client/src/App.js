import { useState, useEffect } from 'react';
import { Todo } from './components/Todo';
import { TodoForm } from './components/TodoForm';
import { Search } from './components/Search';
import { Filter } from './components/Filter';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  const fetchTodos = () => {
    fetch('/api/todo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (task, category) => {
    const data = { task, category };

    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setTodos([...todos, await response.json()]);
  };

  const removeTodo = async (id) => {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    fetchTodos();

    setTodos([...todos].filter((todo) => (todo.id !== id ? todo : null)));
  };

  const completeTodo = async (id) => {
    await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    fetchTodos();

    const currentTodos = [...todos];

    currentTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(currentTodos);
  };

  return (
    <div className="App">
      <h1>Task list</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos.length === 0 ? (
          <div id="notasksavailable">
            No tasks available. Create a task below!
          </div>
        ) : (
          todos
            .filter((todo) =>
              filter === 'All'
                ? true
                : filter === 'Completed'
                ? todo.isCompleted
                : filter === 'Incomplete'
                ? !todo.isCompleted
                : todo.dateAdded
            )
            .filter((todo) =>
              todo.task.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === 'Asc'
                ? a.task.localeCompare(b.task)
                : sort === 'Desc'
                ? b.task.localeCompare(a.task)
                : sort === 'DateAsc'
                ? b.dateAdded.localeCompare(a.dateAdded)
                : a.dateAdded.localeCompare(b.dateAdded)
            )
            .map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))
        )}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
