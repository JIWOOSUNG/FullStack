// TodoApp.jsx
import React from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { dummyData } from './todoData';
import { useState, useRef } from 'react';
export default function TodoApp() {
    const [todo, setTodo] = useState(dummyData);

    const idRef = useRef(todo.length); //초기값: 3

    const handleCreate = (content) => {
        //alert(content);
        idRef.current += 1;
        const newItem = { id: idRef.current, content, isDone: false, wdate: new Date().getTime() };
        setTodo([newItem, ...todo]);
    };
    const handleUpdate = (id) => {
        //alert(id);
        //todo 에서 id값에 해당하는 객체를 찾아서 isDone값을 변경
        // const tmpTodo = [...todo];
        // for (let i = 0; i < tmpTodo.length; i++) {
        //     let tmp = tmpTodo[i];
        //     if (tmp.id === id) {
        //         const obj = { ...tmp, isDone: !tmp.isDone };
        //         tmpTodo[i] = obj;
        //     }
        // }

        const tmpTodo = todo.map((tmp) => (tmp.id === id ? { ...tmp, isDone: !tmp.isDone } : tmp));

        //변경된 값을 갖는 배열(사본)을 todo값으로 설정
        setTodo(tmpTodo);
    };
    const handleDelete = (id) => {
        //alert(id);
        const tmpTodo = todo.filter((tmp) => tmp.id !== id);
        setTodo(tmpTodo);
    };

    return (
        <div>
            <TodoHeader />
            <TodoForm onInsert={handleCreate} />
            <br></br>
            <TodoList todo={todo} onChangeDone={handleUpdate} onDelete={handleDelete} />
            {/* onInsert ==> props */}
        </div>
    );
}
