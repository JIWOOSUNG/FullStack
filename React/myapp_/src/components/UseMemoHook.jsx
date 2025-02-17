// UseMemoHook.jsx
import React, { useState, useMemo } from 'react';
/**
 useMemo 훅은 의존성 배열이 변경될 때만 메모이제이션된 함수가 다시 호출됩니다. 
 useMemo 훅은 성능 최적화를 위해 사용되며, 주로 비용이 많이 드는 
 계산을 메모이제이션하여 불필요한 재계산을 방지합니다.
 [참고: 메모이제이션이란? 함수의 반환값을 저장하여 동일한 입력값에 대해 
 함수가 반복적으로 호출되는 것을 방지하는 방법]
# useMemo 훅의 동작 원리

- 첫 번째 인수는 계산 결과를 반환하는 함수입니다.
- 두 번째 인수는 의존성 배열입니다.

의존성 배열의 값 중 하나라도 변경되면, useMemo 훅은 
첫 번째 인수로 전달된 함수를 다시 실행하여 새로운 값을 계산합니다.
의존성 배열의 값이 변경되지 않으면, 이전에 계산된 값을 재사용
 */
export default function UseMemoHook() {
    const [score, setScore] = useState('');
    const [list, setList] = useState([]);

    const onChangeHandler = (e) => {
        console.log(typeof e.target.value);
        setScore(e.target.value);
    };

    const onClickAdd = () => {
        //list에 입력한 score추가
        setList([...list, Number(score)]);
        setScore('');
    };
    const getAvg = () => {
        //const getAvg = () => {
        console.log('평균값 계산 중 ...');

        //list에 저장된 값들의 평균값을 반환하세요
        // let sum = 0;
        // for (const val of list) {
        //     sum += val;
        // }
        // let avg = sum / list.length;
        // return avg;
        //배열.reduce( 콜백함수, 초기값 )

        return list.reduce((prev, curr) => prev + curr, 0) / list.length;
    };

    //useMemo훅을 사용해서 연산결과를 캐시에 저장하여 사용하자.
    const avg = useMemo(getAvg, [list]);
    /* 최초 렌더링시 useMemo 내부 콜백함수(getAVG())가 실행된다
        이후 list의 값이 변경될 때만 getAvg()를 다시 실행한다.
        list가 변경되지 않으면 계산된 avg값을 캐시에서 꺼내서 재사용한다 (메모이제이션)
    */

    return (
        <div className="container py-5">
            <h1>useMemo 훅 사용</h1>
            <input
                type="text"
                name="num"
                id="num"
                placeholder="숫자를 입력하세요"
                onChange={onChangeHandler}
                value={score}
            />
            <button className="btn btn-info my-3" onClick={onClickAdd}>
                등 록
            </button>
            <hr />
            {/* getAvg() 함수 내의 console.log()를 확인해보자
        input에 입력할때도 "평균값 계산 중..."이 출력되는 것을 확인할 수 있다.
        이를 해결하기 위해 useMemo 훅을 사용하여 list 배열이 변경될 때만 평균값을 계산하도록 할 수 있다. */}
            {/* <h3 className="text-primary">평균값 : {getAvg()} </h3> */}
            <h3 className="text-danger">평균값: {avg} </h3>
            <hr />
            <ul>
                {list.map((s, i) => (
                    <li key={i}>
                        <h3>{s}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}
