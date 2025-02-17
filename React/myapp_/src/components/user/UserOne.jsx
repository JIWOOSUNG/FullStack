//UserOne.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//ajax1/3  ==>3번 회원정보 보여주기 useParams()  /node.js ==>req.params

export default function UserOne() {
    const { id } = useParams();
    const [user, setUser] = useState({ id: 0, name: '아무개', email: '', indate: '' });
    console.log(`id: ${id}`);
    //백엔드 서버에 요청을 보내서 회원정보 받아오자
    //http://localhost:7777/api/users/3 ===>해당 회원정보를 json으로 보내준다
    useEffect(() => {
        getUserInfo();
    }, [id]);
    //id값이 변경될 때 마다  useEffect안의 콜백함수 실행

    //ajax ==> fetch()/axios()
    const getUserInfo = async () => {
        try {
            let url = `/api/users/${id}`; //package.json에 "proxy":"http://localhost:7777" 설정함
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('네트워크 에러');
            }
            //alert(response);
            const res = await response.json();
            alert(JSON.stringify(res));
            setUser({ ...res });
        } catch (err) {
            alert('error: ' + err.message);
        }
    };
    //const { id: no, name, email, indate } = user;
    return (
        <div>
            <h1>User Info</h1>
            <div className="alert alert-danger">
                <h3>Id: {user.id} </h3>
                <h3>Name: {user.name} </h3>
                <h3>Email: {user.email} </h3>
                <h3>Indate:{new Date(user.indate).toLocaleDateString()} </h3>
            </div>
        </div>
    );
}
