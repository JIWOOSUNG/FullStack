// TodoListItem.jsx
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import './TodoListItem.css';

export default function TodoListItem(props) {
    const { id, content, isDone, wdate } = props;

    return (
        <div className="container TodoListItem">
            <div className="chkbox">
                <input type="checkbox" checked={isDone} />
            </div>
            <div className="content">{content}</div>
            <div className="wdate">{new Date(wdate).toLocaleDateString()}</div>
            <div className="btDel">
                <span className="badge-danger">
                    <h4>
                        <MdDeleteForever />
                    </h4>
                </span>
            </div>
        </div>
    );
}
