//ES6 이후 속성을 캡슐화 할 수 있게 되었다.
// # 속성명
class Person{
    #name; //private field
    constructor(name) {
        this.#name= name;  
        console.log(this.#name);
    }
    //private 속성에 접근하는 setter/getter 메서드를 구성해야한다
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name = name;
    }
}

let p1 = new Person('아무개');
// console.log(p1.#name); // 접근에러. (외부에서 접근 불가)

console.log(p1.getName());
p1.setName('이강호');
console.log(p1.getName());
