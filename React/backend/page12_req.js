// page12_req.js
const express = require('express');
const path = require('path');
const app = express();

app.set('port', 5555); //포트번호 설정

//미들웨어 설정=> app.use() 함수 이용해서 설정
//post방식의 데이터를 html form을 통해 보낼 때의 설정
app.use(express.urlencoded({ extended: true }));
//x-www-form-urlencode 인 요청의 본문을 파싱한다
app.use(express.json()); //json 데이터 파싱하는 미들웨어 설정

app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'public', 'main.html');
    res.sendFile(filepath);
});
//main?userid=hong&page=10
app.get('/main', (req, res) => {
    //[1] get방식일 때 query string 값을 추출하려면==>req.query 를 이용
    const query = req.query;
    const { userid, page } = query;
    console.log(query.userid, query.page);
    const str = `
    <h1>GET방식 요청 데이터-req.query이용해 추출</h1>
    <h2>아이디: ${userid} </h2>
    <h2>page: ${page}</h2>
    <a href="/">돌아가기</a>
    `;
    res.send(str);
});
//main/kwon
app.get('/main/:nick', (req, res) => {
    //경로 방식으로 들어올 경우==> req.params
    const params = req.params;
    console.log(params);
    const { nick } = params;

    let str = `<h1>GET방식-경로에 포함된 요청 데이터=>req.params로 추출</h1>
    <h2>Nick : ${nick}</h2>
    <a href="/">돌아가기</a>
    `;
    res.send(str);
});
//post방식의 데이터 받기 ==>req.body
app.post('/main', (req, res) => {
    const body = req.body;
    console.log(body);
    const { userid, userpw } = body;
    let str = `
    <h1>POST방식 요청 데이터 =>req.body로 추출</h1>
    <h2>아이디 : ${userid} </h2>
    <h2>비밀번호: ${userpw} </h2>
    <a href="/">돌아가기</a>
    `;
    res.send(str);
});

app.listen(app.get('port'), () => {
    console.log(`http://localhost:${app.get('port')}`);
});
