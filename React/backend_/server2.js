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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
