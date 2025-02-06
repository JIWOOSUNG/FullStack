const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');
const result = document.querySelector('#result');
const url = 'https://reqres.in';

b1.onclick = function () {
    const findId = prompt('검색할 회원의 ID번호 입력하세요', 1);
    if (!findId) {
        return;
    }
    const newUrl = url + `/api/users/${findId}`;
    console.log(newUrl);
    getUserInfo(newUrl);
}; //--------------------

//async ~ await
const getUserInfo = async function (url) {
    try {
        const response = await fetch(url);
        const user = await response.json();
        //alert(JSON.stringify(user));
        renderUI(user.data);
    } catch (error) {
        alert('에러 발생: ' + error);
    }
}; //------------------------
const getUserInfo_old = function (url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error('요청 실패 에러');
            return response.json();
        })
        .then((res) => {
            const user = res.data;
            renderUI(user);
        })
        .catch((error) => {
            alert(error);
        });
}; //---------------------
const renderUI = function (user) {
    result.innerHTML = `
    <h2>User Info</h2>
    <img src="${user.avatar}" alt="${user.first_name}">
    <h3>ID: ${user.id}</h3>
    <h3>Name: ${user.first_name} ${user.last_name}</h3>
    <h3>Email: ${user.email}</h3>
    `;
}; //-------------------------------

//모든 유저 정보 가져오기
b2.onclick = function () {
    const newUrl = url + '/api/users?page=2';
    getAllUsers(newUrl);
}; //--------------------
const getAllUsers = async (url) => {
    console.log(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        //alert(JSON.stringify(data));
        let len = data.data.length;
        if (len === 0) {
            result.innerHTML = `<h2>요청한 페이지의 데이터는 없어요</h2>`;
        } else {
            renderUITable(data);
        }
    } catch (error) {
        alert(error);
    }
};
const renderUITable = (data) => {
    console.log('page: ', data.page); //페이지번호
    console.log('total: ', data.total); //총 회원수
    console.log('per_page: ', data.per_page); //한페이지에 출력할 목록 개수
    console.log('total_pages: ', data.total_pages); //총 페이지수

    //ES6 이후 비구조화 할당
    const { page, total, per_page, total_pages, data: userList } = data;
    //alert(userList.length);

    //테이블 형태로 회원목록 보여주기
    //반복문 이용
    let str = `<table class="table">
        <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
    `;
    //반복문
    for (const user of userList) {
        const { id, avatar, first_name, last_name, email } = user;
        str += `
        <tr id="${id}">
            <td>${user.id}</td>
            <td><img src="${avatar}"></td>
            <td>${first_name} ${last_name}</td>
            <td>${email}</td>
        </tr>
        `;
    }
    str += `</table>`;
    result.innerHTML = str;
};
