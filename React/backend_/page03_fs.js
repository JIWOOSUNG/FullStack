const fs = require('fs');
/**
 * [1]비동기 방식으로 파일쓰기
 * writeFile(파일명, data, 옵션, 콜백함수)
 *
 * [2]동기 방식으로 파일 쓰기
 * writeFileSync(파일명,data, 옵션)
 *
 */
const data = 'Hello Node.js? 반가워요 노드!!';
console.log('1. 파일 쓰기 시작');
fs.writeFile('result.txt', data, 'utf-8', function (err) {
    if (err) {
        console.log('파일 쓰기 중 에러: ' + err.message);
        return;
    }
    console.log('2. result.txt파일에 쓰기 완료!!');
});
console.log('3. Bye Bye~~~');
//비동기 방식이므로 순서대로 진행되진 않는다.
