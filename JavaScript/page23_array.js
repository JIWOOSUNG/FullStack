// 2차월 배열
const array=[
    [90,67,88,55,79] ,
    [50,70,98,66,48] ,
    [100,21,90,59,38] ,
    [18,99,98,58,28] ,
];
console.log(array.length); //행의크기 : 4
console.log(array[0].length); // 열의 크기 : 5
console.log(array[3].length); // 열의 크기 : 5

//반복문을 이용해서
// 1반: 90, 67, 88, 55, 79
// 총점:       평균:
// 2반: 50, 70, 98, 66, 48
let str=``;
for(let i=0; i<array.length; i++){
    str = `${i + 1}반:`;
    let scores=array[i];
    let total=0;
    for(const su of scores){
        str+=`${su}, `;
        total += su; // 총점
    }
    console.log(str);
    console.log(`총점: ${total}, 평균점수: ${total/scores.length}`);
    console.log('----------------------------------------------');
}