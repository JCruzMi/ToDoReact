import React from 'react'

export function TodoSearch({ searchTodo, setSearchTodo }) {

    const onSearchTodoChange = (event) =>{

        console.log(event.target.value)
        setSearchTodo(event.target.value)
        
    }

    return (
        <input className="card mt-3 bg-dark text-white mb-3" 
            placeholder="Buscar ToDo" 
            value={ searchTodo }
            onChange={ onSearchTodoChange }
        />
        
    )
}
