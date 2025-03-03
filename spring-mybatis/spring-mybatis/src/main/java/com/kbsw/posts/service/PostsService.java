package com.kbsw.posts.service;

import com.kbsw.posts.model.PagingDTO;
import com.kbsw.posts.model.PostDTO;

import java.util.List;

public interface PostsService {
    //글쓰기
    int insertPost(PostDTO board);
    //글목록, 검색목록
    List<PostDTO> listPost(PagingDTO paging);
    //총게시글 수 or 검색한 게시글 수
    int getTotalCount(PagingDTO paging);

    //글번호(id -PK)로 해당 글 가져오기
    PostDTO findPostById(int id);
    int updateReadNum(int id);//조회수 증가

    //글삭제
    int deletePostById(int id);
    //글수정
    int updatePost(PostDTO board);

}
