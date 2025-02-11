import Counter from "./component/Ex04";

const App = () => {
    return(
        <div className="container py-5 text-center">
            <h1>함수형 App04 - state 사용 Count 증가/감소 </h1>
            <hr></hr>
            {/* Ex04.js의 Counter 컴포넌트를 삽입하시오 */}
            <Counter></Counter>
        </div>
    )
};

export default App