import React, { useState, createContext, useContext } from 'react';
// Context Api를 사용해보자

//[1] Context객체 생성 ==>
const UserContext = createContext('unknown');
//createContext()를 호출하면 Context객체가 생성된다.
//React.createContext(기본값) ==> 반환하는 값 ==> { Provider, Consumer}
//Provider : 데이터 공급자 ==> App컴포넌트
//Consumer : 데이터 소비자 ==> Greeting 컴포넌트
export default function App() {
    const [nickName, setNickName] = useState('이상아');

    return (
        <div className="container py-4 text-center">
            {/*[2] Provider 에 value라는 속성값으로 전달할 데이터 넣어주자 */}
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
            <div className="alert alert-warning">
                <h3>My Profile</h3>
                {/* Greeting 컴포넌트 */}
                <Greeting />
            </div>
        </>
    );
} //----------------------
//[3] useContext()훅을 이용해 Consumer없이 데이터를 받아 사용
function Greeting() {
    const nickName = useContext(UserContext);

    return (
        <p>
            <h4 className="text-primary">저는 백엔드 {nickName} 개발자인 입니다</h4>
        </p>
    );
}
