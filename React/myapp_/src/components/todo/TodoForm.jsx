//TodoForm.jsx
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { TfiPencilAlt } from 'react-icons/tfi';
import { IoIosAddCircle } from 'react-icons/io';
import { RiResetRightFill } from 'react-icons/ri';
import { useState } from 'react';
import { useRef } from 'react';

export default function TodoForm({ onInsert }) {
    const [content, setContent] = useState('');
    const inputRef = useRef();
    //[1] onChange이벤트 처리=> input에 입력한 값과 state의 content값을 일치시키고
    //[2] 등록버튼 onClick이벤트 처리 ==> 입력값 유효성 체크 (입력값이 없을 경우 알람창 띄우고 입력 포커스 주기)
    //   ===> 부모(TodoApp)에 입력받은 값을 전달 ==> 이벤트를 통해서 전달  )
    //[3] 리셋버튼 onClick이벤트 처리 ==> 입력박스 초기화시키기
    const onSubmit = () => {
        //입력값 유효성 체크
        if (!content) {
            alert('할 일을 입력하세요');
            inputRef.current.focus();
            return;
        }
        //부모에게 입력값 전달
        onInsert(content);
        //입력값 초기화. 입력 포커스주기
        setContent('');
        inputRef.current.focus();
    };
    const onKeyDownHandler = (e) => {
        console.log('keyCode: ', e.keyCode);
        if (e.keyCode === 13) {
            //엔터 입력시
            onSubmit();
        }
    };

    const onChangeHandler = (e) => {
        setContent(e.target.value);
    };
    const onReset = () => {
        setContent('');
        inputRef.current.focus();
    };

    return (
        <div>
            <h4 className="my-3">
                <TfiPencilAlt /> 새로운 Todo 추가
            </h4>
            <Row>
                <Col xs={12} sm={8} md={8} className="mx-0">
                    <input
                        name="content"
                        ref={inputRef}
                        className="form-control"
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        value={content}
                    />
                </Col>
                <Col xs={12} sm={4} md={4}>
                    <Button variant="outline-success" onClick={onSubmit}>
                        {' '}
                        <IoIosAddCircle />{' '}
                    </Button>
                    <Button variant="outline-danger" className="mx-1" onClick={onReset}>
                        <RiResetRightFill />
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
