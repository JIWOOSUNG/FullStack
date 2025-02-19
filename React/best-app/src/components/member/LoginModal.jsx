// LoginModal.jsx
import React, { useState, useRef } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default function LoginModal({ show, setShow }) {
    const [loginUser, setLoginUser] = useState({ email: '', passwd: '' });
    const idRef = useRef(null);
    const pwRef = useRef(null);

    const { email, passwd } = loginUser;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        //유효성 체크 - alert띄우고 입력 포커스 준뒤 return;

        //백엔드 쪽에 요청 보내기 - post /api/login   {email,passwd}
        requestLogin();
    };
    const requestLogin = async () => {
        let url = `http://localhost:7777/api/auth/login`;
    };

    return (
        <div>
            {/* 로그인 모달 */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="LoginForm">
                        <Col className="p-4 mx-auto" xs={10} sm={10} md={8}>
                            <Form onSubmit={onSubmitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="email"
                                        ref={idRef}
                                        name="email"
                                        onChange={onChangeHandler}
                                        value={loginUser.email}
                                        placeholder="ID (email)"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="passwd"
                                        ref={pwRef}
                                        name="passwd"
                                        onChange={onChangeHandler}
                                        value={loginUser.passwd}
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="outline-success">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
