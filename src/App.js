import {v4 as uuidv4} from 'uuid'
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList'
import { TodoSearch } from './components/TodoSearch';
import { TodoItem } from './components/TodoItem';

//Key para local storage
const KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([
    {id: 1, task: "Tarea 1", completed: false },
    {id: 2, task: "Tarea 2", completed: false },
  ]);

  //--------------------------------------
  //busqueda

  const [searchTodo, setSearchTodo] = useState('');

  let searchedTodos = [];

  if (!searchTodo.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.task.toLowerCase();
      const searchText = searchTodo.toLowerCase();
      return todoText.includes(searchText);
    })
  }

  //--------------------------------------
  //guardado en local storage

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos]);

  //--------------------------------------
  //agregar y borrar todos los acabados


  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false}]
    });

    todoTaskRef.current.value = null;
  }

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  //------------------------------
  const completedTodos = todos.filter((todo) => !todo.completed).length
  const countTodos = todos.length

  //------------------------------
  // completar todo
  const completeTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed
    setTodos(newTodos);
  };

  //Eliminar Todo
  const deleteTodo= (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1 
        className="mt-3 
        text-white d-flex 
        justify-content-center">
          ToDos {} 
      </h1>
      
      <TodoSearch 
        searchTodo={searchTodo} 
        setSearchTodo={setSearchTodo} 
      />
      
      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            onDelete={() => deleteTodo(todo.id)}
            onComplete={() => completeTodo(todo.id)}
          />
        ))}
      </TodoList>
      
      <input className="form-control my-3" ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      
      <div className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white">
        <button type="button" className="btn btn-danger" onClick={handleClearAll}> Eliminar ToDos </button>
        <button type="button" className="btn btn-secondary" onClick={handleTodoAdd} > Añadir ToDo </button>
      </div>
      
      <div className="list-group-item d-flex justify-content-center align-items-center bg-dark text-white"> 
        <div> Te quedan {completedTodos} tareas por terminar de {countTodos} totales </div>
      </div>
    </Fragment>
  );
}

export default App;
