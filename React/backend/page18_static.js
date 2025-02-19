// page18_static.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
//PORT가져오기
const port = process.env.PORT || 5000;

//public이라는 디렉토리에 있는 정적인 파일(css,images,미디어파일)들을 '/' 경로로 접근하고자 한다면
//아래와 같이 미들웨어를 설정하자
app.use('/', express.static(path.join(__dirname, 'public')));

//app.get('/', (req, res) => res.sendFile(__dirname + '/public/main.html'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/main.html'));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
