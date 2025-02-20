// axiosInstance.js
import axios from 'axios';
import { checkTokenExpiration } from './authUtil';

//axios 인스턴스 생성
const axiosInstance = axios.create();

//요청 인터셉터(interceptor) 설정
//요청(request) 헤더에 'Authorization': 'Bearer accessToken값'
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        console.log('요청 인터셉터 실행중 ... accessToken: ' + accessToken);
        if (accessToken) {
            //유효한 토큰인지 체크하는 로직
            if (checkTokenExpiration(accessToken)) {
                //유효시간이 지났다면
                //리프레시 토큰을 서버에 보내서 새로운 accessToken을 발급받고 요청 헤더에 넣어준다
                //////////////////////////////
            }

            //요청 헤더에 authorization 키값으로 토큰 저장
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        } //if-----
        return config;
    },
    (error) => Promise.reject(error)
);

//응답 인터셉터(interceptor)  설정

export default axiosInstance;
