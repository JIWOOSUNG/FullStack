// 전역객체
// 1. console : 콘솔창에 출력할 때 사용
// 2. process : 프로세스 실행정보를 다루는 객체
// 3. exports : 모듈을 다루는 객체
console.log('숫자 출력하기: %d', 500);
console.log('실수 : %d', 123.456);
console.log('문자열 출력하기: %s', 'Hi Node.js');
const obj = { num: 1, name: '홍길동' };
console.log('JSON객체: %j', obj);
console.log(`이 위치에 변수 출력: ${JSON.stringify(obj)}`);
//dir()
console.dir(obj); //객체가 갖고 있는 속성 등을 볼 수 있다
console.log(obj);
//time() /timeEnd() ==>시간 측정시 사용
let total = 0;
console.time('sum'); //시간 측정 시작
for (let i = 1; i <= 10000; i++) {
    total += i;
}
console.timeEnd('sum'); //시간 측정 종료
console.log('1~10000합: %d', total);
console.log('============================');
//노드의 전역변수: __filename, __dirname
console.log('현재 실행 중인 파일명: %s', __filename);
console.log('현재 실행 중인 파일의 상위 경로: %s', __dirname);
