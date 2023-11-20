import React from 'react'
import Todo from './Todo'

export default function TodoList({todos}) {
  return (
    // <div>{todos}</div>    
    todos.map(todo => {
        return <Todo key={todo.id} todo={todo} />
    })
    
  )
}
