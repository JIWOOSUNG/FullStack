// MyPage.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const { user, loginAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    //useEffect()훅에서 로그인 하지 않았다면 홈으로 이동시키자
    useEffect(() => {
        if (!user) {
            //세션 스토리지에 저장된 user가 있는지 꺼낸다
            const tmpUser = JSON.parse(sessionStorage.getItem('user'));
            if (tmpUser) {
                loginAuthUser(tmpUser);
            } else {
                alert('로그인 해야 이용할 수 있어요');
                navigate('/');
            }
        }
    }, [user, navigate]);

    return (
        <div className="container py-4">
            <h1 className="my-4">MyPage</h1>
            {user && (
                <div className="alert alert-primary p-3">
                    <h3>회원번호: {user.id} </h3>
                    <h3>이 름 : {user.name} </h3>
                    <h3>이 메 일 : {user.email} </h3>
                </div>
            )}

            {!user && (
                <div className="alert alert-danger p-3">
                    <h3>로그인한 사용자만 확인할 수 있어요</h3>
                </div>
            )}
        </div>
    );
}
