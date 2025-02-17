//생성자 함수 =>함수명 첫글자를 대문자로 구상한다
function User(name, userid) {
    //생성자 함수
    this.name = name;
    this.userid = userid;
}
User.prototype.showInfo = function () {
    console.log(`Name: ${this.name}`);
    console.log(`User ID: ${this.userid}`);
};
//let u1=new User()
module.exports = User;
