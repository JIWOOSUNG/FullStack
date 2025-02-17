import React, { useState } from 'react';
//props drilling
export default function App() {
    const [nickName, setNickName] = useState('홍길동');
    return (
        <div className="container py-4 text-center">
            <div>
                <h1>상위 부모 App - 상단 메뉴</h1>
            </div>
            <div>
                {/* 프로필 컴포넌트 - 컨텐츠 */}
                <Profile userName={nickName} />
            </div>
            <div>
                <h3>하단 메뉴</h3>
            </div>
        </div>
    );
}
function Profile({ userName }) {
    return (
        <>
            <div className="alert alert-success">
                <h3>My Profile</h3>
                {/* Greeting 컴포넌트 */}
                <Greeting userName={userName} />
            </div>
        </>
    );
} //----------------------
function Greeting({ userName }) {
    return (
        <p>
            <h4 className="text-primary">저는 프런트엔드 개발자인 {userName} 입니다</h4>
        </p>
    );
}
