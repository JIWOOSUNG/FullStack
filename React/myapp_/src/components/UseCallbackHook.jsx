// UseCallbackHook.jsx
import React, { useMemo, useState, useCallback } from 'react';

export default function UseCallbackHook() {
    const [list, setList] = useState([1, 2, 3]);
    const [count, setCount] = useState(0);

    // 리스트가 변경될 때만 평균값을 계산
    const avg = useMemo(() => {
        console.log('평균 계산!');
        return list.reduce((a, b) => a + b, 0) / list.length;
    }, [list]);

    const updateList1 = () => {
        setList([...list]); // 같은 값이라도 새로운 배열이 생성됨
    };

    const updateList2 = useCallback(() => {
        //setList([...list]);// 같은 값이라도 새로운 배열이 생성됨
        setList((prevList) => {
            return prevList === list ? prevList : [...list]; //같은 값이면 변경하지 않음
        });
    }, [list]);
    //list가 변경될 때만 함수가 새로 생성된다

    /*useCallback의 역할
            useCallback은 함수의 참조를 유지하는 역할을 함.
            즉, list가 변경되지 않는 한 updateList 함수의 참조가 변하지 않음. (새로 생성되지 않음)
            하지만 함수가 실행되는 것과는 별개임. */

    return (
        <div>
            <h3>평균값: {avg}</h3>
            <button onClick={useCallback(() => setCount(count + 1), [count])}>Count 증가 ({count})</button>
            <button onClick={() => setList([])}>리스트 초기화</button>
            <button onClick={updateList1}>리스트 변경1</button>
            <button onClick={updateList2}>리스트 변경2</button>
            <hr></hr>
            <ul>
                {list.map((v, i) => (
                    <li key={i}>{v}</li>
                ))}
            </ul>
        </div>
    );
}
