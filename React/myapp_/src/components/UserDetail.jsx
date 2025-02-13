import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { students } from '../data/students';

export default function UserDetail() {
    //users/:id  ==> :id 동적 파라미터로 간주된다. useParams훅을 이용하면 이 파라미터값을 얻을 수 있다.
    const { id } = useParams();
    console.log('id: ', id, typeof id);
    const [user, setUser] = useState(null);

    useEffect(() => {
        //students에서 id번에 해당하는 학생정보를 검색해서 받은 객체를 user값으로 변경한다
        //find()/ findIndex()
        const findUser = students.find((person, i) => person.id === Number(id));
        console.log(findUser);
        setUser(findUser);
    }, [id]);

    return (
        <div>
            <h2>User Detail</h2>
            <h3>{id} 번 회원 정보 (후에 DB에서 가져와 보여줄 예정)</h3>

            {user ? (
                <div className="alert alert-success">
                    <h3>Name: {user.name} </h3>
                    <h3>Age : {user.age} </h3>
                    <h3>Address: {user.addr} </h3>
                </div>
            ) : (
                <div className="alert alert-danger">
                    <h3>{id}번 회원정보는 없습니다</h3>
                </div>
            )}
        </div>
    );
}
