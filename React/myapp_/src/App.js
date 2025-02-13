import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Side from './components/Side';
import Home from './components/Home';
import MyComp2 from './components/MyComp2';
import MyComp1 from './components/MyComp1';
import UseEffectHook from './components/UseEffectHook';
import PageNotFound from './components/PageNotFound';

function App() {
    return (
        <div className="container py-5">
            <BrowserRouter>
                {/* BrowserRouter로 앱 전체를 감싸야 라우팅 기능을 사용할 수 있다 */}
                <Container>
                    <Row>
                        <Col>
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={3} md={4} lg={4} className="d-none d-sm-block mt-3">
                            {/* d-none: 모두 안보이게한 뒤 d-sm-block => small사이즈부터 보여준다 */}
                            <Side />
                        </Col>
                        <Col xs={12} sm={9} md={8} lg={8}>
                            <Routes>
                                {/* Routes: 여러 개의 Route을 감싸는 컨테이너 
                                    Route : 특정 url에 대해 렌더링할 컴포넌트를 정의
                                */}
                                <Route path="/" element={<Home />} />
                                <Route path="/comp1" element={<MyComp1 />} />
                                <Route path="/comp2" element={<MyComp2 />} />
                                <Route path="/hook1" element={<UseEffectHook />} />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
