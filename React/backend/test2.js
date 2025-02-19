const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');//require('mysql2')를 사용할 경우 (콜백 방식)
//const pool = mysql.createPool({...}).promise();  // .promise() 필요

const mysql = require('mysql2/promise'); //이 경우는 .promise() 필요 없음
const cors = require('cors');
require('dotenv').config(); // .env 파일 로드
const jwt = require('jsonwebtoken'); // JWT 라이브러리

const app = express();
const PORT = process.env.PORT || 7777;

// app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true, // 쿠키 허용 (JWT 사용 시 필요)
    })
);

app.use(express.urlencoded({ extended: true })); //html form
app.use(express.json()); //json 데이터 파싱하는 미들웨어 설정

// 데이터베이스 연결 풀 설정 (mysql2)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'reactdb',
    waitForConnections: true,
    connectionLimit: 10, // 최대 커넥션 수
    queueLimit: 0, // 대기열에 들어갈 수 있는 요청 수 (0은 무제한)
});
// 서버 시작
app.listen(PORT, () => {
    console.log(`Server2 on: http://localhost:${PORT}`);
});

// 로그인 요청 테스트
app.post('/api/login_test', (req, res) => {
    let { email, passwd } = req.body;
    console.log(`email ${email}, passwd ${passwd}`);
    res.json({ result: 'fail', data: { email, name: '' } });
});
//JWT(JSON Web Token) 토큰 생성 함수
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign(user, secret, { expiresIn });
    /*secret은 JWT(JSON Web Token)를 암호화하여 서명하는 데 사용되는 비밀 키
    secret은 서명을 생성하는 데 사용되며, 이 서명을 통해 토큰이 변조되지 않았음을 보장한다
    내부적으로 암호화( HMAC SHA256 같은... ) 알고리즘을 사용해 서명을 생성한다
    https://jwt.io/ 사이트에서 확인해보자
    */
};
// 실제 로그인 요청
app.post('/api/login', async (req, res) => {
    const { email, passwd } = req.body;
    console.log(`email ${email}, passwd ${passwd}`);

    const sql = 'SELECT id, name, email FROM members WHERE email=? AND passwd=?';

    try {
        const [results] = await pool.query(sql, [email, passwd]);
        if (results.length > 0) {
            const user = results[0];

            //access token과 refresh token생성
            const accessToken = generateToken(
                { id: user.id, email: user.email, name: user.name },
                process.env.ACCESS_SECRET,
                '15m' //access token유효시간 15분
            );

            const refreshToken = generateToken(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.REFRESH_SECRET,
                '1d' //refresh token 유효시간 (1일)
            );

            //res.json({ result: 'success', data: { email: user.email, name: user.name } });
            res.json({
                result: 'success',
                data: { email: user.email, name: user.name },
                accessToken,
                refreshToken, // 클라이언트에 반환
            });
        } else {
            res.status(401).json({ result: 'failure', message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

//AccessToken 검증 미들웨어
const verifyAccessToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // ? (optional chaining)
    //클이 요청을 보낼 때 요청 헤더에 아래와 같은 형태로 보낸다  토큰값만 추출하기 위해 공백으로 분리
    //Authorization: Bearer 토큰값
    //"Bearer abcdefg12345".split(' ') => 결과: ["Bearer", "abcdefg12345"]

    console.log('검증 미들웨어 토큰: ', token);

    if (!token) return res.status(401).json({ message: 'Access Token required' });

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            console.log('토큰 검증 실패 verify fail');

            return res.status(403).json({ message: 'Invalid Access Token' });
        }
        req.user = decoded; // 토큰 정보 저장
        next();
    });
};

// RefreshToken을 이용한 새로운 AccessToken 발급
app.post('/api/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh Token required' });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Refresh Token' });

        // 새 AccessToken 발급
        const newAccessToken = generateToken(
            { id: decoded.id, email: decoded.email },
            process.env.ACCESS_SECRET,
            '15m'
        );

        res.json({ accessToken: newAccessToken });
    });
});

// 인증이 필요한 API 예제
app.get('/api/protected', verifyAccessToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}, you have access!` });
});
