const loaction=document.querySelector('#location'); //지역정보
const weather=document.querySelector('#weather'); //날씨정보
const error = document.querySelector('#error'); //에러메시지


function getCurrentLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( async (position)=>{
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            if(lat && long) {
                //현재 위도,경도의 지역정보 얻어와 #locaiton 에 출력하는 함수
                let address = await fetchAddress(lat, long) //axios이용해서 지역정보 받아오는 함수
                    showLocation(address)
                // 날씨정보 얻어오기
                fetchWeather(lat, long)//axios 이용해서 날씨정보 받아오는 함수

            } else {
                showError('위도 경도 데이터 받기 실패');
            }

        }, (error)=>{
            showError('Geolocation Error' + error.message)
        })
    } else {
        showError('Geolocation이 지원되지 않는 브라우저에요');
    }
}  //-----------------------------------------------

function showError(msg) {
    error.textContent = `Error: ${msg}`;
    error.style.display = 'block';
} //----------------------------------------------------

//DOM이 로드되면 getCurrentLocation()호출
document.addEventListener('DOMContentLoaded', getCurrentLocation)