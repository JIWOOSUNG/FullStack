// page07_exports.js
const obj = require('./modlue1'); // modlue1/index.js
const objCalc = require('./module2'); //module2.js
const obj3 = require('./module3'); //module3.js
/**1. 모듈 가져오는 방법
 * require('모듈파일명')
 * - 확장자(.js)는 생략해도 된다
 * [1] require()를 하면 먼저 module1.js를 찾는다
 * [2] 해당 파일이 없다면 module1 디렉토리를 찾는다
 * [3] 디렉토리가 있으면 해당 디렉토리의 index.js를 찾는다
 *
 */
obj.add(1, 3);
obj.minus(10, 4);
objCalc.gop(3, 8);
objCalc.divide(24, 6);

let kim = new obj3('김철수', 'Kim');
console.dir(kim);//
kim.showInfo();

/**2. 모듈화해서 내보내는 방법
 * 1. exports.프로퍼티
   2. module.exports=프로퍼티
   ----------------------------------
   exports	: 값 자체를 할당하는 것이 아닌 외부로 보낼 요소를
   			  exports 객체의 프로퍼티 또는 메서드로 추가한다
   module.exports : 객체에 하나의 값(기본자료형,함수,객체)만 
   			  할당할 수 있다.
 */
/**모듈화해서 내보내는 방법
 * 1. exports전역객체에 메서드를 등록하여 내보내는 방법
 *      exports.변수1 = function(){...}
 *      exports.변수2 = function(){...}
 * 2. 모듈 안에서 객체를 만들어서 할당하는 경우
 *      객체를 내보낼 때는 module.exports =객체
 *      이 때 주의사항. 객체는 하나만 내보낼 수 있다.
 * 3. 프로토타입 객체를 할당하는 경우
 *      프로토타입을 먼저 정의한 후
 *      module.exports에 할당한다.
 *      => 그러면 이를 가져다 쓰는 파일에서는 new 연산자를 사용할 수 있다.
 */
