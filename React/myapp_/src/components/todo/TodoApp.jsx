// TodoApp.jsx
import React from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { dummyData } from './todoData';
import { useState } from 'react';
export default function TodoApp() {
    const [todo, setTodo] = useState(dummyData);

    const handleCreate = (content) => {
        alert(content);
    };

    return (
        <div>
            <TodoHeader />
            <TodoForm onInsert={handleCreate} />
            <br></br>
            <TodoList todo={todo} />
            {/* onInsert ==> props */}
        </div>
    );
}
