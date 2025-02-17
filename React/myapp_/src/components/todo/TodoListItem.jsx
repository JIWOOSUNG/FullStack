// TodoListItem.jsx
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import './TodoListItem.css';

export default function TodoListItem(props) {
    const { id, content, isDone, wdate, onChangeDone, onDelete } = props;

    const onChangeCheckbox = () => {
        //TodoApp의 state 인 todo에서 체크한 객체를 찾아서 해당 객체의 isDone값을 변경
        onChangeDone(id);
    };
    const onDeleteTodo = () => {
        onDelete(id);
    };

    return (
        <div className="container TodoListItem">
            <div className="chkbox">
                <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
            </div>
            <div
                className="content"
                style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'gray' : 'black' }}
            >
                {content}
            </div>
            <div className="wdate">{new Date(wdate).toLocaleDateString()}</div>
            <div className="btDel">
                <span className="badge-danger" onClick={onDeleteTodo}>
                    <h4>
                        <MdDeleteForever />
                    </h4>
                </span>
            </div>
        </div>
    );
}
