import axios from 'https://cdn.skypack.dev/axios';

const location = document.querySelector('#location'); //지역정보
const weather = document.querySelector('#weather'); //날씨정보
const error = document.querySelector('#error'); //에러메시지
console.log(axios);

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                if (lat && long) {
                    //현재 위도,경도의 지역정보 얻어와 #location 에 출력하는 함수
                    let address = await fetchAddress(lat, long); //axios 이용해서 지역정보 받아오는 함수
                    showLocation(lat, long, address);
                    //날씨정보 얻어오기
                    fetchWeather(lat, long); //axios 이용해서 날씨정보 받아오는 함수
                } else {
                    showError('위도 경도 데이터 받기 실패');
                }
            },
            (error) => {
                showError('Geolocation Error: ' + error.message);
            }
        );
    } else {
        showError('Geolocation이 지원되지 않는 브라우저에요');
    }
} //----------------------------
const fetchWeather = async (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily,minutely&appid=45935dd1a2899d80c9fde5a5206a2d9f`;
    console.log(url);
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        //destructure-비구조화 할당(구조분해 할당)
        //data.timezone
        const { timezone, current } = data;
        //weather:[ {id:111,main:'Snow'} ]

        const { temp, weather: wt } = current;
        //wt[0].description/ wt[0].main
        const { description, icon } = wt[0];

        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        weather.innerHTML = `
        <h3>Timezone: ${timezone}</h3>
        <h3>Temparature: ${temp-273.15}</h3>
        <h3>Description: ${description}</h3>
        <p><img src="${iconUrl}"></p>
        `;
    } catch (err) {
        showError('날씨정보 얻기 실패: ' + err.message);
    }
}; //-----------------------------

const showLocation = (lat, long, address) => {
    location.innerHTML = `
    <h3>Lattitude: ${lat} </h3>
    <h3>Longitude: ${long} </h3>
    <h3>Address :  ${address} </h3>
    `;
}; //--------------------------------
const fetchAddress = async (lat, long) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
    console.log(url);
    try {
        const response = await axios.get(url);
        console.log(response);
        const address = response.data.display_name;
        return address;
    } catch (err) {
        showError('지역정보 얻기 실패: ' + err.message);
        return 'Unknown Location';
    }
}; //-----------------------------

function showError(msg) {
    error.textContent = `Error: ${msg}`;
    error.style.display = 'block';
} //------------------------------

//DOM이 로드되면 getCurrentLocation()호출
document.addEventListener('DOMContentLoaded', getCurrentLocation);
