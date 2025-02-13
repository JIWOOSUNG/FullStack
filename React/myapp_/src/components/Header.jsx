// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//npm i react-router-dom@6

export default function Header() {
    return (
        <div className="header">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/comp1">MyComp1</Link>
                </li>
                <li>
                    <Link to="/comp2">MyComp2</Link>
                </li>
                <li>
                    <Link to="/users/100">User Detail</Link>
                </li>
                <li>
                    <Link to="/boards?bid=100&page=2&size=10">자유게시판</Link>
                </li>
                <li>
                    <Link to="/todo">ToDo</Link>
                </li>
                <li>
                    <Link to="/post">Post & Reply</Link>
                </li>
            </ul>
        </div>
    );
}
