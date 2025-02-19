// page14_mysql.js
const express = require('express');
const mysql = require('mysql2'); //promise사용하지 않을 경우

const app = express();

//미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.post('/api/users', (req, res) => {
    const { name, email, passwd } = req.body;
    if (!name || !email || !passwd) {
        return res.status(400).json({ message: '이름,이메일,비밀번호 모두 입력해야 해요' });
    }
    const userData = [name, email, passwd];
    //sql문을 준비
    const sql = `insert into members(name,email,passwd) values(?,?,?)`;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('db연결 실패 ', err);
            return res.status(500).send(err);
        } //if-------
        //sql문을 db서버에 전송
        connection.query(sql, userData, (err, result) => {
            if (err) {
                connection.rollback();
                connection.release();
                return res.status(500).send(err);
            }
            console.log('result: ', result);
            if (result.affectedRows > 0) {
                connection.commit();
                res.json({ result: 'success', message: '회원 데이터 삽입 성공' });
            } else {
                connection.rollback();
                res.json({ result: 'fail', message: '회원 데이터 삽입 실패' });
            }
            connection.release(); //pool에 커넥션 반납
            //connection.end() ==> 커넥션 종료
        });
    });
});

app.listen(7777, () => {
    console.log(`http://localhost:7777`);
});
