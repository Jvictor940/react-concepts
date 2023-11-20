import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // Loads our todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);
  // We only want to call this useEffect once. So we set an empty array to our second parameter so it'll recall the useEffect. 

  // Saves to our local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null; // So that every time we enter a value and hit add Todo it clears out the field.
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} >Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

// useRef hook allows us to reference elements inside of our HTML 
// uuid generates random ids for us
// the data doesn't persist on the page once reloaded. To fix this we must use useEffect. So everytime we add a todo we save it. Takes in a function as the first paramenter. this is the function that we want to do things and the way we determine when to call that function is to pass in an array of properties in the second param. in this case [todos]. When that array changes we call that function. So in this case anytime our array chages we are going to save it to the localStorage.


export default App;
