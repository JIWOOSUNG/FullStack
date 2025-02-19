const express = require('express');
const cors = require('cors');
//npm i cors

const app = express();
const PORT = 7777;
const users = [
    { id: 1, name: '홍길동', email: 'hong@naver.com', passwd: '111', indate: new Date().getTime() },
    { id: 2, name: '김연희', email: 'yeon@naver.com', passwd: '222', indate: new Date().getTime() },
    { id: 3, name: '최미남', email: 'choi@naver.com', passwd: '333', indate: new Date().getTime() },
];
//미들웨어 설정
app.use(cors()); //cors 에러 문제 해결됨
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Hi</h1>');
});
//GET  /api/users 요청을 보내면 응답을 json형태로 보내보자
app.get('/api/users', (req, res) => {
    //html 데이터 응답==>res.send('html')
    //json 데이터 응답==>res.json('json')
    res.json(users);
});
app.get(`/api/users/:id`, (req, res) => {
    //users에서 :id에 해당하는 사람정보를 찾아서 json형태로 브라우저에 출력하세요
    const { id } = req.params; //string
    const findUser = users.find((obj) => obj.id === Number(id));
    if (findUser) {
        res.json(findUser);
    } else {
        res.status(404).json({ message: '검색한 회원은 없습니다' });
    }
});
//REST - CRUD 작업을 http method와 mapping
// C ==> post
// post  /api/users   새로운 회원정보는 request의 body부분에 포함되서 온다
app.post(`/api/users`, (req, res) => {
    //post방식일 때 데이터 얻기 ==> req.body
    const { name, email, passwd } = req.body;
    let lastUser = undefined;
    if (users.length > 0) {
        lastUser = users[users.length - 1];
    }
    const id = lastUser === undefined ? 1 : lastUser.id + 1;
    // console.log(name, email, id);
    const newUser = { id, name, email, passwd, indate: new Date().getTime() };
    users.push(newUser);
    //let tmpUser=[ ...users, newUser] ==>react==>  users=tmpUser;
    res.json({ result: 'success', user: { id, name, email } });
});

//D ==> delete
app.delete(`/api/users/:id`, (req, res) => {
    const id = req.params.id; //string
    console.log(id);

    //배열에서 해당 회원번호가 있는지 검색해보자==>findIndex()
    const delIdx = users.findIndex((user) => user.id === parseInt(id));
    if (delIdx === -1) {
        res.status(404).json({ result: 'fail', message: '해당 번호의 회원은 없습니다' });
    } else {
        //해당 회원이 있다면 배열에서 삭제 처리
        const delUser = users.splice(delIdx, 1);
        res.json({ result: 'success', user: { name: delUser[0].name } });
    }
});
//U ==> put or options
//회원번호==>req.params, 수정할 회원정보==>req.body
app.put(`/api/users/:id`, (req, res) => {
    //수정할 회원의 id 추출
    const { id } = req.params;
    //회원의 수정 데이터 추출  //post,put ==>req.body
    const { name, passwd, email } = req.body;

    //id번 회원정보 검색
    const findIdx = users.findIndex((u) => u.id === Number(id));
    if (findIdx === -1) {
        res.status(404).json({ result: 'fail', message: '해당 번호의 회원은 없습니다' });
    } else {
        const updateUser = { ...users[findIdx], name, passwd, email };
        console.log(updateUser);
        users[findIdx] = updateUser; //교체
        res.json({ result: 'success', user: { id: updateUser.id, name, email } });
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
