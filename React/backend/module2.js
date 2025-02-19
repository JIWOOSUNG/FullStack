//exports.변수 =함수
//module.exports=객체
const calc = {};
calc.gop = function (a, b) {
    console.log(`${a} x ${b}=${a * b}`);
};
calc.divide = (a, b) => {
    console.log(`${a} / ${b}=${a / b}`);
};
module.exports = calc;
