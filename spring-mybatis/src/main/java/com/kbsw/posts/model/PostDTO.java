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

    private LocalDateTime wdate;//작성일

    private int readNum;//조회수
    
    private String fileName;//첨부파일명
    private long fileSize;//첨부파일 크기
}
