// UseEffectHook.jsx
import React from 'react';
import { useState, useEffect } from 'react';
export default function UseEffectHook() {
    const [count, setCount] = useState(0);
    //componentDidMount(), componentDidUpdate() 함수와 비슷
    //count값이 변경되면 useEffect안에 콜백함수가 실행된다
    //빈 배열[] 을 두번째 인자로 전달하면=> 처음 렌더링한 후에만 useEffect콜백함수가 실행된다
    useEffect(() => {
        console.log(`useEffect훅: Component Mounted =>count: ${count}`);
        document.title = `click count: ${count} times`;

        return () => {
            //componentWillUnmount() 비슷
            //useEffect에서 함수를 반환하면 이 함수에서는 unmount될 때 해야할 작업을 기술하면 된다
            console.log(`Clean Up: effect를 해제할 필요가 있다면 해제하는 함수를 반환한다`);
        };
    }, []);

    return (
        <div>
            <div className="alert alert-danger">
                <h3>You clicked {count} times </h3>
            </div>
            <button className="btn btn-info" onClick={() => setCount((prev) => prev + 1)}>
                Click Me
            </button>
        </div>
    );
}
