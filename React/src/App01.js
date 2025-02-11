//App01.js
//class 형으로 컴포턴트 작성하기
//1. class  형으로 컴포넌트 작성하기
import React, {Component} from 'react';


//MyComp import 하기
import MyComp from './component/Ex01'
class App extends Component{
    render() {
        return <div className='container py-5'>
            <h1>App01 컴포넌트 (부모)</h1>
            <hr></hr>
            <MyComp mycolor='blue' mybgcolor='lightblue'>
                반가워</MyComp>
            <MyComp mycolor='tomato' mybgcolor='yellow'>
                안녕</MyComp>
            <MyComp mycolor='darkcyan' mybgcolor='lightgreen'>
                잘가</MyComp>
            <hr></hr>
            <MyComp></MyComp>
            {/* props를 전달하지 않을 경우 자식 (MyComp) 에서
                defaultProps를 설정하면 해당 값들이 적용된다
             */}
        </div>
    }
}   
export default App;