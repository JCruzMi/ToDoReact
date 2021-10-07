import React from 'react'
import '../styles/TodoList.css'

export function TodoList(props) {
    return (
        <ul className="list-group">
            {props.children}
        </ul>
    );
}
