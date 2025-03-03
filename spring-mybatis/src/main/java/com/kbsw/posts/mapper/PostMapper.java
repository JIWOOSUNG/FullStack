package com.kbsw.posts.mapper;

import com.kbsw.posts.model.PagingDTO;
import com.kbsw.posts.model.PostDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PostMapper {  //스프링이 XXXMapper의 구현체(XXXProxy)를 알아서 구현한다
    //글쓰기                   //==>이를 위해서 SpringMyBatisApplication에 @MapperScan()을 붙여줘야 한다.
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
