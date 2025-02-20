const pool = require('../models/dbPool');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //secret key 값 가져오기 위해 설정
//npm i dotenv
//JWT 토큰을 생성해서 반환하는 함수
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign(user, secret, { expiresIn });
};

exports.login = async (req, res) => {
    const { email, passwd } = req.body;
    console.log(`email: ${email}, passwd: ${passwd}`);
    try {
        const sql = 'select id,name,email from members where email=? and passwd=?';

        const [result] = await pool.query(sql, [email, passwd]);
        console.log('result: ', result);
        if (result.length === 0) {
            //아이디, 비번이 일치하지 않는 경우
            return res.json({ result: 'fail', message: '아이디 또는 비밀번호를 확인하세요' });
        }
        //회원으로 인증받은 경우-------------> accessToken 과 refreshToken을 생성
        //아이디,비번이 일치하는 경우 => 회원 인증을 해줘야 한다
        const user = result[0]; //회원정보 꺼내기 (id,email,name)
        console.log(process.env.ACCESS_SECRET);
        console.log(process.env.REFRESH_SECRET);

        const accessToken = generateToken(user, process.env.ACCESS_SECRET, '15m'); //토큰 유효시간 15분 설정
        const refreshToken = generateToken(user, process.env.REFRESH_SECRET, '1d'); //유효시간 1일 설정

        //members테이블에 refreshToken값(null===>발급받은 refreshtoken으로)을 수정해줘야 한다
        const sql2 = 'update members set refreshtoken =? where id=?';
        await pool.query(sql2, [refreshToken, user.id]);

        res.json({ result: 'success', data: user, message: '로그인 성공!!', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Error', message: error.message });
    }
};
exports.test = (req, res) => {
    res.json({ message: '테스트 중' });
};
