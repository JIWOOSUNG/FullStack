// TodoHeader.jsx
import React from 'react';
import { FcCalendar } from 'react-icons/fc';
//npm i react-icons
export default function TodoHeader() {
    return (
        <div className="py-4">
            <h1 className="text-secondary my-2"> 오늘 할 일 (To Do List)</h1>
            <h2 className="text-info my-2">
                <FcCalendar /> {new Date().toLocaleDateString()}{' '}
            </h2>
        </div>
    );
}
