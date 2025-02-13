// UseRefHook.jsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
//useRef훅
/* useRef는 리액트에서 DOM 요소에 직접 접근하거나, 
    컴포넌트의 상태를 변경하지 않고 값을 저장하는 데 사용되는 훅입니다.
- 렌더링 없이 값 유지: useRef의 값이 변경되어도 컴포넌트가 리렌더링되지 않음.
- DOM 요소 접근: useRef를 사용하면 직접 input, button, div 등의 DOM 요소에 접근 가능.
- 렌더링 간 값 유지: useState처럼 상태를 유지하지만, 값이 바뀌어도 리렌더링되지 않는 차이점이 있음.

current 속성: useRef()훅이 반환하는 객체가 갖는 속성
            ref로 연결된 요소나 값에 대한 참조를 갖는다
*/
export default function UseRefHook() {
    const [score, setScore] = useState('');
    const [name, setName] = useState('');
    const [list, setList] = useState([]);

    const myref1 = useRef(null);
    const myref2 = useRef(null);

    const handlerName = (e) => {
        //사용자가 입력한 값=> e.target.value
        setName(e.target.value);
    };
    const handleAdd = () => {
        //유효성 체크
        //if(!form.name.value) alert('입력하세요') form.name.focus(); return;
        if (!name) {
            alert('이름을 입력하세요');
            /////////////////
            myref1.current.focus();
            ////////////////
            return;
        }

        if (!score) {
            alert('점수를 입력하세요');
            myref2.current.focus();
            return;
        }
        //점수값 숫자여부 체크: isNaN(값) 값이 숫자가 아니면 true,
        if (isNaN(score)) {
            alert('점수는 숫자여야 해요');
            myref2.current.select();
            return;
        }

        const student = { name, score };
        // {name:name, score:score}
        const tmpList = [...list, student];
        setList(tmpList);
        //form.input.value=''
        setName(''); //입력값 초기화
        setScore('');
    };

    const getAvg = (array) => {
        if (array.length == 0) return 0;
        //평균점수 반환
        let sum = 0;
        for (let obj of array) {
            sum += Number(obj.score);
        }
        //console.log(sum);
        return sum / array.length;
    };

    return (
        <div>
            <h1>useRef() 훅 사용</h1>
            <Form.Group>
                <Form.Label>학생명:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    ref={myref1}
                    placeholder="Name"
                    onChange={handlerName}
                    value={name}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>수학점수:</Form.Label>
                <Form.Control
                    type="text"
                    name="score"
                    ref={myref2}
                    placeholder="Score"
                    onChange={(e) => {
                        setScore(e.target.value);
                    }}
                    value={score}
                />
            </Form.Group>
            <Button variant="success" onClick={handleAdd}>
                등록
            </Button>
            <hr></hr>
            <h3>
                {name} / {score}
            </h3>
            {/* list에 등록된 모든 학생명단, 점수를 목록으로 출력하기 */}
            <ul className="list-group">
                {list.map((st, i) => (
                    <li key={i} className="list-group-item">
                        {st.name} : {st.score} 점
                    </li>
                ))}
            </ul>
            <hr></hr>
            <h2 className="text-danger">평균 점수: {getAvg(list).toFixed(2)} </h2>
        </div>
    );
}
