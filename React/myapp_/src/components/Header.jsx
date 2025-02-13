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
            </ul>
        </div>
    );
}
