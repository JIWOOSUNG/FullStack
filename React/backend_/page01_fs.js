// page01_fs.js
// 내장모듈(console,process,export,fs) , 외장모듈(express,axios,...)
const fs = require('fs');
//File System 모듈=>파일 쓰기,읽기 할 때 사용
/*
1. readFile(파일명, charset, 콜백함수):void : 비동기방식으로 파일을 읽는다
2. readFileSync(파일명,charset):파일데이터 반환: 동기방식으로 파일을 읽는다
*/
console.log('안녕하세요~~~~');
fs.readFile('server.js', 'utf8', function (err, data) {
    if (err) {
        // console.log('해당 파일이 없습니다');
        throw err;
        return;
    }
    console.log('======================');
    console.log(data);
    console.log('======================');
});
console.log('잘가~~~~~');
