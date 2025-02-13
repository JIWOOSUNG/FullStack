// UseNavigate.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseNavigate() {
    const navigate = useNavigate();

    const handleClick1 = () => {
        window.location.href = '/users/300';
    };
    function handleClick2() {
        navigate('/boards?bid=500&page=12&size=20');
    }

    return (
        <div className="container py-5">
            <h1>useNavigate() 훅 사용</h1>
            <p>React Router 에서 제공하는 훅. 페이지를 이동시키는 훅</p>
            <button className="btn btn-info mx-1" onClick={handleClick1}>
                Go to UserDetail
            </button>
            <button className="btn btn-danger" onClick={handleClick2}>
                Go to Boards
            </button>
            <button
                className="btn btn-warning mx-1"
                onClick={() => {
                    navigate('/hook2');
                }}
            >
                Go to Clock
            </button>
        </div>
    );
}
