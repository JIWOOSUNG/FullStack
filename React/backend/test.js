const express = require('express');
const bodyParser = require('body-parser');
//const mysql = require('mysql2');//require('mysql2')를 사용할 경우 (콜백 방식)
//const pool = mysql.createPool({...}).promise();  // .promise() 필요

const mysql = require('mysql2/promise'); //이 경우는 .promise() 필요 없음
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// 데이터베이스 연결 풀 설정 (mysql2)
const pool = mysql
    .createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '1234',
        port: '3306',
        database: 'mydb',
    })
    .promise(); // Promise 기반으로 변환

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server2 on: http://localhost:${PORT}`);
});

// 회원 가입
app.post('/api/user', async (req, res) => {
    const { name, nickname, pwd } = req.body;
    if (!name || !nickname || !pwd) {
        return res.status(400).json({ error: '이름, 닉네임, 비밀번호 모두 입력해야 해요' });
    }

    const sql = 'INSERT INTO react_member SET ?';
    const userData = { name, nickname, pwd };

    try {
        const [result] = await pool.query(sql, userData);
        res.json({ result: 'ok', data: { name } });
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 닉네임 중복 체크
app.post('/api/nickCheck/:nickname', async (req, res) => {
    const nickname = req.params.nickname;
    const sql = 'SELECT id FROM react_member WHERE nickname = ?';

    try {
        const [rows] = await pool.query(sql, [nickname]);
        if (rows.length > 0) {
            res.json({ result: 'exists', data: { nickname } });
        } else {
            res.json({ result: 'not_exists', data: { nickname } });
        }
    } catch (err) {
        console.error('Error checking nickname:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 로그인 요청 테스트
app.post('/api/login_test', (req, res) => {
    let { nickname, pwd } = req.body;
    console.log(`nickname ${nickname}, pwd ${pwd}`);
    res.json({ result: 'fail', data: { nickname, name: '' } });
});

// 실제 로그인 요청
app.post('/api/login', async (req, res) => {
    const { nickname, pwd } = req.body;
    console.log(`nickname ${nickname}, pwd ${pwd}`);

    const sql = 'SELECT id, name, nickname FROM react_member WHERE nickname=? AND pwd=?';

    try {
        const [results] = await pool.query(sql, [nickname, pwd]);
        if (results.length > 0) {
            const user = results[0];
            res.json({ result: 'success', data: { nickname: user.nickname, name: user.name } });
        } else {
            res.status(401).json({ result: 'failure', message: 'Invalid nickname or password' });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 데이터베이스 테이블 생성
const initDB = async () => {
    const createMemberTable = `
   create table if not exists members(
    id int primary key auto_increment,
    name varchar(30) not null,
    email varchar(50) not null unique,
    passwd varchar(20) not null,
    indate date default (current_date())
)
`;

    try {
        await pool.query(createMemberTable);
        console.log('Table "react_member" is ready.');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

// 초기 데이터베이스 테이블 생성
// initDB();
