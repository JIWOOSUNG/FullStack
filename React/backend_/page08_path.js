// page08_path.js
//path내장모듈 : 파일 경로 처리 모듈
const path = require('path');

let currentPath = path.join(__dirname, 'node.exe');
console.log(currentPath);

const dirs = ['C:', 'fullstack', 'React', 'backend', 'page08_path.js'];
const mypath = path.join(dirs.join(path.sep)); //path.sep ==> 파일 구분자
console.log(mypath);

//mypath에서 디렉토리명, 파일명, 확장자를 추출해보자
const upDir = path.dirname(mypath);
const fname = path.basename(mypath);
const ext = path.extname(mypath);
console.log(`upDir: ${upDir}`);
console.log(`fname: ${fname}`);
console.log(`ext: ${ext}`);
