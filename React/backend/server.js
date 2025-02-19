//CommonJS 표준
const express = require('express');
const app = express();
const PORT = 5000;
//npm i axios mysql2 json express cors
//npm i nodemon --g 또는 --D (개발모드)
app.get('/', (req, res) => {
    //req: 요청 객체(request객체)
    //res: 응답 객체(response객체) ==>브라우저와 연결
    //실행할땐 npx nodemon server.js
    res.send('<h1>Hello world12</h1>');
});
app.get('/hi', (req, res) => {
    res.send(`<h1 style='color:red'>Hi Node.jsㅇㅂgg</h1>`);
});
//서버가동
app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
