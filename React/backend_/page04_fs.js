const fs = require('fs');
const data = '파일에 동기방식으로 쓰기를 해봅시다.';
console.log('1. ');
fs.writeFileSync('result2.txt', data, 'utf-8');
console.log('2. result2.txt 파일쓰기 완료 ');
