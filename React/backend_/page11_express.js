// page11_express.js
//외장모듈 express를 사용해보자
//npm i express --s
//http모듈 (장점: 경량 단점: 기본기능만 제공)
//express모듈을 이용하면 라우팅, 미들웨어, 에러 처리 등 다양한 기능을 사용할 수 있다
//Restful api구축시 유용
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello Express</h1>');
    //send(): 기본 상태코드 200이며, Content-Type도 자동으로 설정하고, 응답도 자동으로 종료함
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
    //fs모듈 대신 sendFile()함수 사용
});
app.get('/login/killer', (req, res) => {
    //헤더 설정 res.set('Content-Type','image/png').send('Hello Word')
    res.status(401).send('인증되지 않은 사용자에요');
});
//public/board.html 을 읽어서 브라우저에 출력
app.get('/board', (req, res) => {
    res.sendFile(__dirname + '/public/board.html');
    //fs모듈 대신 sendFile()함수 사용
});

app.listen(3333, function () {
    console.log(`http://localhost:3333`);
});
