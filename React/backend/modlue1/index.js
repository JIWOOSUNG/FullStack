//exports 전역객체 이용해서 add, minus 함수를 내보내자
//page07_exports.js에서 require()로 가져온다
exports.add = function (a, b) {
    console.log(`${a} + ${b} =${a + b}`);
};
exports.minus = (a, b) => {
    console.log(`${a} - ${b} =${a - b}`);
};
