//authUtil.js
export const checkTokenExpiration = (token) => {
    //header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expTime = payload.exp * 1000; //exp 초단위
    let isInValid = expTime < Date.now(); //accessToken의 만료시간이 지났는지 여부를 체크
    // 1시  < 2시 ==> 유효시간이 지난 경우 true반환, 아직 남은 경우는 false반환
    return isInValid;
};
