//TodoList.jsx
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import { FcTodoList } from 'react-icons/fc';
import TodoListItem from './TodoListItem';
import { useState } from 'react';
export default function TodoList({ todo, onChangeDone, onDelete }) {
    const [search, setSearch] = useState(''); //검색어

    const getSearchResult = () => {
        const tmpTodo =
            search === ''
                ? todo
                : todo.filter((obj) => {
                      //obj.content에 search 내용을 포함하고있는지 검사해서 있으면 true를 반환 없으면 false반환
                      //   let findIndex = obj.content.indexOf(search);
                      //검색한 문자열이 있으면 해당 문자열의 시작 인덱스번호를 반환/ 없으면 -1을 반환
                      //   return findIndex !== -1;
                      return obj.content.toLowerCase().includes(search.toLowerCase());
                  });

        return tmpTodo; //검색 결과 todo list 또는 모든 todo list
    };

    const getTotal = () => {
        //총개수
        const totalCount = todo.length;
        //완료된 일 개수
        const doneCount = todo.filter((obj) => obj.isDone === true).length;
        //해야할 일 개수
        const notDoneCount = totalCount - doneCount;
        return { totalCount, doneCount, notDoneCount };
    };

    const { totalCount, doneCount, notDoneCount } = getTotal();

    return (
        <div>
            <h3 className="text-primary">
                <FcTodoList /> TodoList
            </h3>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <div className="alert alert-success my-4">
                        <div>총 개수: {totalCount} </div>
                        <div>완료된 일: {doneCount} </div>
                        <div>해야할 일: {notDoneCount}</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} md={8}>
                    <input
                        name="search"
                        className="form-control"
                        placeholder="검색어 입력하세요"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
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
                    {getSearchResult().map((obj) => (
                        <TodoListItem key={obj.id} {...obj} onChangeDone={onChangeDone} onDelete={onDelete} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}
