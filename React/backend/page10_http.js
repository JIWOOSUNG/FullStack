// page10_http.js
const http = require('http');
const fs = require('fs');
const fs2 = require('fs').promises;
//fs.promise를 사용하면 파일 작업을 Promise를 사용해 처리할 수 있도록 한다
//=> 콜백함수 대신 Promise를 반환한다. (asyn/await 사용할 수 있다)
const path = require('path');
const server = http.createServer();

//클이 접속해서 연결이 이뤄질때
server.on('connection', function (socket) {
    const serverIp = socket.address(); //서버 ip주소
    const clientIp = socket.remoteAddress; //클라이언트의 ip주소
    console.log(`${clientIp}님이 [${serverIp.address}]에 접속했습니다`);
});

//브라우저(client)가 요청을 보낼 때
server.on('request', async (req, res) => {
    //console.log(`클라이언트 요청이 들어왔어요`);
    let url = req.url;
    console.log(url);
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`<h1>Index Page</h1>
                <a href="/login">로그인</a>
                <a href="/board">게시판</a>
            `);
        res.end();
    } else if (url === '/login') {
        const filepath = path.join('public', 'login.html');
        console.log(filepath);
        //절대경로=>path.resolve()함수 활용
        console.log(path.resolve(filepath));
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(data);
            res.end();
        });
    } else if (url === '/board') {
        //public/board.html 파일 읽어서 응답으로 내보내세요
        // fs.readFile('public/board.html', 'utf-8', (err, data) => {
        //     if (err) throw err;
        //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //     res.end(data);
        // });
        const data = await fs2.readFile('public/board.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    }
});

//웹서버 종료시 발생함.
server.on('close', () => {
    console.log('서버가 종료됨...');
});

server.listen(3333, function () {
    console.log(`http://localhost:3333`);
});
//3초 뒤에 서버 종료
// setTimeout(() => {
//     server.close(() => {
//         console.log('서버가 종료되었습니다');
//     });
// }, 3000);
