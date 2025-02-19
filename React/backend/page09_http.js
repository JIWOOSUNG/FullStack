// page09_http.js
//http모듈 ==>웹서버를 구축하는 모듈
const http = require('http');
const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //응답 헤더에 상태코드와 컨텐트 타입을 기술
    res.write('<h1>http모듈을 이용해봅시다</h1>');
    res.write('<h2>Hello http</h2>');
    res.end(); //반드시 끝에 호출
}); //서버 생성
//서버 동작
server.listen(3333, function () {
    console.log(`http://localhost:3333`);
});
