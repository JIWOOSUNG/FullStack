// page02_fs.js
const fs = require('fs');
//동기방식으로 파일을 읽자
console.log('1. 안녕하세요');

const data = fs.readFileSync('server.js', 'utf8');
console.log(data);
console.log('2. 잘가세요~');
