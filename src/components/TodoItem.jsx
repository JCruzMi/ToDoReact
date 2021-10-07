import React from 'react'
import '../styles/TodoItem.css'

export function TodoItem(props) {
    return (
        <li 
            className="
                list-group-item 
                d-flex 
                justify-content-between 
                align-items-center 
                bg-dark text-white 
                text-capitalize"
        >
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}
            
            onClick={props.onComplete}>
                {props.task}
            </p>
            <span
                className="Icon-delete"
                onClick={props.onDelete}
            >
                X
            </span>
        </li>
    )
}
