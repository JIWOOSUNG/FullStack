//TodoList.jsx
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import { FcTodoList } from 'react-icons/fc';
import TodoListItem from './TodoListItem';
export default function TodoList({ todo }) {
    return (
        <div>
            <h3 className="text-primary">
                <FcTodoList /> TodoList
            </h3>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <div className="alert alert-success my-4">
                        <div>총 개수: </div>
                        <div>완료된 일: </div>
                        <div>해야할 일: </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <input name="search" className="form-control" placeholder="검색어 입력하세요" />
                </Col>
                <Col xs={12} sm={4} md={4}>
                    <Button variant="success">
                        <IoIosSearch />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={10} md={10}>
                    {/* map()함수 이용해서 TodoListItem 렌더링 */}
                    {todo.map((obj) => (
                        <TodoListItem key={obj.id} {...obj} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}
