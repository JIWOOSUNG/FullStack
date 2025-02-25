// MyPage.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

export default function MyPage() {
    const { user, loginAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    //useEffect()훅에서 로그인 하지 않았다면 홈으로 이동시키자
    useEffect(() => {
        //세션 스토리지에서 accessToken을 꺼낸다.
        //토큰이 있다면 백엔드쪽에 토큰에 해당하는 사용자 정보를 얻자
        // '/api/auth/user' 로 요청을 보내서 user정보를 받아
        //user정보가 있다면 loginAuthUser(user)
        //세션 스토리지에 저장한 user가 있는지 확인. 있다면 로그인했다는 의미. user정보를 꺼내서 활용하자
        //const tmpUser = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = sessionStorage.getItem('accessToken'); //세션스토리지에서 꺼내기
        // if (accessToken) alert(accessToken);
        //const refreshToken = localStorage.getItem('refreshToken'); //로컬스토리지에서 꺼내기

        if (accessToken) {
            // 토큰이 있다면, 로그인된 상태로 간주
            axiosInstance
                .get('http://localhost:7777/api/auth/user', {
                    //package.json에 proxy 설정하면 http://localhost:7777 생략해도 된다 but 자꾸 오류가 나서 붙이도록 한다
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    //alert('/api/auth/user요청으로 받음 데이터' + JSON.stringify(response.data));
                    const authUser = {
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                    };

                    loginAuthUser(authUser); // 로그인된 사용자 정보 설정
                })
                .catch((error) => {
                    alert('로그인해야 사용할 수 있어요');
                    console.error('Access token이 유효하지 않습니다.', error);
                    // sessionStorage.removeItem('accessToken');
                    // localStorage.removeItem('refreshToken');
                    navigate('/');
                });
        } else {
            alert('로그인해야 사용할 수 있어요');
            navigate('/');
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
