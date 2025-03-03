<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <link rel="stylesheet" href="/ckeditor/ckeditor.css">
        <script src="https://cdn.ckeditor.com/ckeditor5/39.0.1/super-build/ckeditor.js"></script>
        <script src="/ckeditor/ckeditor.js"></script>
    </head>
    <body>
    <div class="wrap">
        <h1> Spring Post 글 수정</h1>
        <form name="pf" action="/posts/write" method="post" enctype="multipart/form-data">
        <!-- 파일 업로드 시 주의사항. method="post" enctype="multipart/form-data"
            ==> 파일 데이터가 서버에 전송된다.
         -->
            <input type="hidden" name="mode" value="edit">
            <!-- hidden data  글쓰기 할 때는 mode값 write, 글수정 할 때는 mode값 edit  -->
            <input type="hidden" name="id" value="<c:out value='${post.id}' />">
            <!-- hidden data 글 번호 ----------------------------------------------- -->

            <ul>
                <li>제목</li>
                <li><input type="text" name="title"
                value="<c:out value='${post.title}'/>"
                id="title" placeholder="Title" required></li>

                <li>작성자</li>
                <li><input type="text" name="name"
                 value="<c:out value='${post.name}'/>"
                 id="name" placeholder="Name" required></li>

                <li>글내용</li>
                <li><textarea rows="10" cols="50" name="content" id="content" placeholder="Content">${post.content}</textarea></li>

                <li>첨부파일</li>
                <li>
                <c:out value="${post.originFileName}"/> [<c:out value="${post.fileSize}"/> bytes]<br>
                <!-- hidden data  ---------------------------- -->
                <input type="hidden" name="old_fileName" value="<c:out value='${post.fileName}'/>">
                <!-- ------------------------------------------ -->
                <input type="file" name="mfileName" id="mfileName" placeholder="Attach File">
                </li>

                <li>비밀번호</li>
                <li><input type="password" name="pwd" id="pwd" placeholder="Password" required></li>
            </ul>
            <div class="clear"></div>
            <div class="text-center">
                <button class="btn btn-info">글 수정</button>
                <button class="btn btn-warning" type="reset">다시쓰기</button>
            </div>
        </form>
</div>

    <script>
        CKEDITOR.ClassicEditor.create( document.querySelector('#content')  ,option );
    </script>

    </body>
</html>