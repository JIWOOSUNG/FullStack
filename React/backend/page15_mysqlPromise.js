// page15_mysqlPromise.js
const express = require('express');
const mysql = require('mysql2/promise'); //promise사용하는 경우
const cors = require('cors');
const app = express();

//미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//데이터베이스 연결 풀 (connection pool) 설정
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'scott',
    password: 'tiger',
    port: '3306',
    database: 'edudb',
});

//회원 가입하기
app.post('/api/users', async (req, res) => {
    const { name, email, passwd } = req.body;
    if (!name || !email || !passwd) {
        return res.status(400).json({ message: '이름,이메일,비밀번호 모두 입력해야 해요' });
    }
    const userData = [name, email, passwd];
    //sql문을 준비
    const sql = `insert into members(name,email,passwd) values(?,?,?)`;
    try {
        const [result] = await pool.query(sql, userData);
        console.log('result: ', result);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: `등록 성공 회원번호는 ${result.insertId}번 입니다` });
        } else {
            res.json({ result: 'fail', message: '회원 정보 등록 실패' });
        }
    } catch (err) {
        console.error('error: ', err);
        res.status(500).json({ result: 'fail', message: 'DB 에러 발생: ' + err.message });
    }
});

//모든 회원 정보 조회
app.get('/api/users', async (req, res) => {
    const sql = `select id,name,email,indate,refreshtoken from members order by id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//특정 회원 정보 조회
app.get('/api/users/:id', async (req, res) => {
    try {
        const sql = `select * from members where id=?`;
        const { id } = req.params;
        const [result] = await pool.query(sql, [id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(7777, () => {
    console.log(`http://localhost:7777`);
});
