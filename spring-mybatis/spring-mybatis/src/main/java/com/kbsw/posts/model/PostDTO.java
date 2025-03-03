package com.kbsw.posts.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDateTime;
@Setter
@Getter
@ToString
public class PostDTO {
    
    private int id;//글번호
    private String title;//글제목

    private String name;//작성자

    private String content;//글내용

    private String pwd;//글 비밀번호 (수정,삭제시 사용)

    private LocalDateTime wdate;//작성일

    private int readNum;//조회수
    
    private String fileName;//첨부파일명 -- 물리적 파일명 UUID_a.txt
    private String originFileName;//원본 파일명(논리적 파일명) -- a.txt

    private long fileSize;//첨부파일 크기

    private int mode;//글쓰기 (write), 글수정(edit) 값을 가질 예정
    private String old_fileName;//예전에 첨부했던 파일명 ==> 글 수정시 필요함
}
