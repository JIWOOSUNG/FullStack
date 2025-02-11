import Comp1 from './example/JsxEx1' //export defaut 로 내보낸 경우
// import {JsxEx2, Ex3}  from './example/JsxEx2'
import * as Comp2 from './example/JsxEx2'
import {GetBrand, GetOS} from './example/JsxEx3'
// JsxEx4를 import하여 각 컴포넌트를 출력하기
import {GetLang as Lang , GetJob as Job} from './example/JsxEx4'
import MyPet from './example/JsxEx4';
import Anonymous from './example/JsxEx5';
import GetName from './example/JsxEx6';


function App() {
    return (
        <div className="container py-4">
            <h1 class="text-primary">Hi React App00.js</h1>
            <hr></hr>
            <Comp1></Comp1>
            <hr></hr>
            <Comp2.JsxEx2></Comp2.JsxEx2>
            <br></br>
            <Comp2.Ex3></Comp2.Ex3>
            <hr></hr>
            <div className='alert alert-info'>
                <GetBrand></GetBrand>
                <GetOS></GetOS>
                <Lang></Lang>
                <Job></Job>
                <MyPet/>
            </div>
            <hr></hr>
            <GetName></GetName>
            <Anonymous></Anonymous>
        </div>
    )
}
export default App;