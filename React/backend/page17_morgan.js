// page17_morgan.js
// npm i morgan --s
//요청과 응답시마다 로그를 남기는 미들웨어. 클라이어트와 서버의 응답 사이에 존재하는 미들웨어
//서버의 상태를 모니터링하고 디버깅하는 데 유용
/*
morgan은 여러 가지 로그 형식을 지원합니다. 위의 예제에서는 'combined' 형식을 사용했지만, 다른 형식도 사용할 수 있습니다:

'combined': Apache combined 로그 형식
'common': Apache common 로그 형식
'dev': 개발 중 사용하기 좋은 형식
'short': 짧은 로그 형식
'tiny': 더 간단한 로그 형식
예를 들어, 'dev' 형식을 사용하고 싶다면 app.use(morgan('dev'));로 변경
 */
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const morgan = require('morgan');

const app = express();
//PORT가져오기
const port = process.env.PORT || 5000;

// morgan.format('myformat', ':method :url :status :response-time ms - :res[content-length]');
// app.use(morgan('myformat'));
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('<h1>Hello</h1>'));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
// 사용자 정의 로그 형식: 로그 형식을 사용자 정의하고 싶다면, morgan의 format을 직접 정의할 수 있다
/*
morgan.format('myformat', ':method :url :status :response-time ms - :res[content-length]');
HTTP 메소드, URL, 상태 코드, 응답 시간, 응답 본문 크기 등을 로그로 기록
app.use(morgan('myformat'));
--------------------------------------------------
주요 morgan 포맷 토큰
:method: HTTP 메소드 (예: GET, POST)
:url: 요청된 URL (예: /home)
:status: HTTP 응답 상태 코드 (예: 200, 404)
:response-time: 요청 처리에 걸린 시간 (밀리초 단위)
:res[content-length]: 응답의 콘텐츠 길이 (바이트 단위)
-------------------------------------------------
*/
