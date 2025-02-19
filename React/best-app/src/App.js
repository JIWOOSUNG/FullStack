import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Header from './components/Header';
import Side from './components/Side';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import SignUp from './components/member/SignUp';
import LoginModal from './components/member/LoginModal';
function App() {
    // 로그인 모달을 보여줄지 여부값을 갖는 state
    const [showLogin, setShowLogin] = useState(false);

    const onShowLoginChange = (bool) => {
        //alert(bool);
        setShowLogin(bool);
    };

    return (
        <div className="container py-5">
            <BrowserRouter>
                {/* BrowserRouter로 앱 전체를 감싸야 라우팅 기능을 사용할 수 있다 */}
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={9} md={9} lg={9}>
                            {/* 로그인 모달 다이얼로그 */}
                            <LoginModal show={showLogin} setShow={setShowLogin} />
                            {/* 라우트 */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/*" element={<PageNotFound />} />
                            </Routes>
                        </Col>
                        <Col xs={12} sm={3} md={3} lg={3} className="d-none d-sm-block mt-3">
                            {/* d-none: 모두 안보이게한 뒤 d-sm-block => small사이즈부터 보여준다 */}
                            <Side onShowLogin={onShowLoginChange} />
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
