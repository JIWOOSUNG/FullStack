<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
    <div class="wrap">
        <table class="table table-bordered">
                            <tr>
                                <td width="20%"><b>글번호</b></td>
                                <td width="30%"></td>
                                <td width="20%"><b>작성일</b></td>
                                 <td width="30%">

                                 </td>
                            </tr>
                            <tr>
                                <td width="20%"><b>글쓴이</b></td>
                                <td width="30%">

                                </td>
                                <td width="20%"><b>조회수</b></td>
                                 <td width="30%">

                                 </td>
                            </tr>
                            <tr>
                                <td width="20%"><b>첨부파일</b></td>
                                <td colspan="3">
                                <a href="#" download>
                                  파일명
                                </a>
                                    [파일크기 bytes ]
                                </td>
                            </tr>
                            <tr>
                                <td width="20%"><b>제  목</b></td>
                                <td colspan="3">

                                </td>
                            </tr>
                            <tr>
                                <td width="20%"><b>글 내용</b></td>
                                <td colspan="3" id="content">

                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align:center">
                                    <a href="/posts/form">글쓰기</a>
                                    | <a href="/posts/list">글목록</a>
                                    <!--로그인한 사람이 글을 쓴 사람이라면 -->

                                        <a href="javascript:goEdit()">글수정</a> |
                                        <a href="javascript:goDel()">글삭제</a>

                                </td>
                            </tr>
                        </table>
        </div>
    </body>
</html>