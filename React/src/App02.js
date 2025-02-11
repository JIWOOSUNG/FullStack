import MyComp from "./component/Ex02";
function App() {
    return (
        <div className="container py-5">
            <h1>함수형 App02 부모 컴포넌트</h1>
            <hr></hr>
            {/* props로 배경색과 텍스트를 전달해서 출력해보기 */}
            <MyComp mycolor="navy" mybgcolor='lightblue'> 잘가</MyComp> 
            {/* mycolor => 프롭스 */}
            <MyComp mycolor="red" mybgcolor='yellow'>반갑</MyComp>
            <MyComp mycolor="#def" mybgcolor='grey'>안녕</MyComp>
        </div>
    )
}

export default App;