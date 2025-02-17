import React, { useState, createContext } from 'react';
// Context Api를 사용해보자

const UserContext = createContext('unknown');
//createContext()를 호출하면 Context객체가 생성된다.
//React.createContext(기본값) ==> 반환하는 값 ==> { Provider, Consumer}
//Provider : 데이터 공급자 ==> App컴포넌트
//Consumer : 데이터 소비자 ==> Greeting 컴포넌트
export default function App() {
    const [nickName, setNickName] = useState('김프로');

    return (
        <div className="container py-4 text-center">
            <UserContext.Provider value={nickName}>
                {/* nickName을 공급한다 */}
                <div>
                    <h1>상위 부모 App - 상단 메뉴</h1>
                </div>
                <div>
                    {/* 프로필 컴포넌트 - 컨텐츠 */}
                    <Profile />
                </div>
                <div>
                    <h3>하단 메뉴</h3>
                </div>
            </UserContext.Provider>
        </div>
    );
}
function Profile() {
    return (
        <>
            <div className="alert alert-danger">
                <h3>My Profile</h3>
                {/* Greeting 컴포넌트 */}
                <Greeting />
            </div>
        </>
    );
} //----------------------
function Greeting() {
    return (
        <UserContext.Consumer>
            {(nickName) => (
                // User.Consumer ==> useContext()훅으로 대체할 수 있다.
                <p>
                    <h4 className="text-primary">저는 백엔드 {nickName} 개발자인 입니다</h4>
                </p>
            )}
        </UserContext.Consumer>
    );
}
