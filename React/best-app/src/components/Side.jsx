import React, { useContext } from 'react';
import { AuthContext } from './member/AuthContext';
import { Stack, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './member/axiosInstance';
export default function Side({ onShowLogin }) {
    const { user, logoutUser } = useContext(AuthContext);
    console.log(`Side컴포넌트에서 user: ${user} `);

    const navigate = useNavigate();

    const handleLogout = async () => {
        //로그아웃 처리
        //1. 서버에 로그아웃 요청
        try {
            const url = `http://localhost:7777/api/auth/logout`;
            await axiosInstance.post(url, { email: user.email });
        } catch (error) {
            alert('로그아웃 처리 중 에러: ' + error);
        }

        logoutUser(); //2. AuthContext 에서 제공하는 logoutUser를 호출하여 user 상태를 null로 초기화
        //sessionStorage.removeItem('user'); //세션스토리지에 저장한 user정보 삭제
        //3. 토큰 삭제
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/'); //5. ㅡ페이지 이동
    };

    //회원인증이 필요한 경우는 axiosInstance를 사용
    //회원인증이 필요없는 경우는 axios를 사용
    const handleTest = async () => {
        try {
            const response = await axiosInstance.post('http://localhost:7777/api/auth/test');
            alert(response.data.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Stack gap={2} className="col-md-10 mx-auto">
            <Button variant="primary" as={Link} to="/">
                Home
            </Button>
            {!user && (
                <Button variant="outline-success" as={Link} to="/signup">
                    SignUp
                </Button>
            )}
            {user && <div className="alert alert-danger">{user.name}님 로그인 중 ...</div>}
            {user ? (
                <Button variant="outline-success" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Button variant="outline-success" onClick={() => onShowLogin(true)} as={Link}>
                    SignIn
                </Button>
            )}
            <Button variant="outline-danger" onClick={handleTest}>
                인증 테스트
            </Button>

            <hr></hr>
            <ListGroup>
                <ListGroup.Item as={Link} to="/hook1">
                    Menu 1
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/hook2">
                    Menu 2
                </ListGroup.Item>
            </ListGroup>
        </Stack>
    );
}
