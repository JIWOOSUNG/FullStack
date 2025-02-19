// page06_process.js
/*
    전역 객체
    프로그램 프로세스 관련 기능
    1) argv: 프로세스 실행할 때 전달되는 매개변수 정보
    2) env : 환경변수 정보
    3) exit(): 프로세스 종료시킴
*/
console.log(process.argv.length);
console.log(process.argv[2]);
process.argv.forEach((val, i) => {
    console.log(`${i} : ${val}`);
});

// process.exit(); //시스템 종료
console.log('**********************');
console.log(process.env['OS']);
console.log('**********************');
// console.log(process.env['path']);
console.log(process.env.path);
