const result = document.getElementById('result');
const paging = document.getElementById('paging');
const bt1 = document.getElementById('bt1');
const url = 'https://reqres.in';

bt1.onclick = () => {
    getAllUsers(1, 3);
};
const getAllUsers = async (page, per_page) => {
    const newUrl = url + `/api/users?page=${page}&per_page=${per_page}`;

    console.log(page, per_page);
    console.log(newUrl);

    const response = await fetch(newUrl);
    const data = await response.json();
    renderUITable(data);
};

const renderUITable = (data) => {
    //ES6 이후 비구조화 할당
    const { page, total, per_page, total_pages, data: userList } = data;
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

    //페이지 네비게이션 문자열 만들기
    let pageStr = '<ul class="pagination justify-content-center">';
    for (let p = 1; p <= total_pages; p++) {
        //pageStr += `[<a href="javascript:getAllUsers(${p},${per_page})">${p}</a>]`;
        let cls = p == page ? 'active' : '';

        pageStr += `<li class="page-item ${cls}">
        <a class="page-link" href='#' onclick="getAllUsers(${p}, ${per_page})">
        ${p}
        </a>
        </li>
        `;
    }
    pageStr += '</ul>';
    paging.innerHTML = pageStr;
};
