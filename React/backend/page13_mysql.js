// page13_mysql.js
// const express = require('express');
const mysql = require('mysql2/promise');

let db;

//즉시 실행함수
(async () => {
    console.log('즉시 실행함수 실행됨...');
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'scott',
            password: 'tiger',
            database: 'edudb',
        });
        console.log('db 연결 성공: ');
    } catch (err) {
        console.error('db 접속 에러: ', err);
    }
})();
