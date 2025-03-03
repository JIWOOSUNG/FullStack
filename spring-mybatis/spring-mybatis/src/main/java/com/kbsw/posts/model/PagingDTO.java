package com.kbsw.posts.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//페이징 처리 및 검색 관련 프로퍼티를 갖는 객체
@Setter
@Getter
@ToString
public class PagingDTO {
    private String findType;//검색 유형 (0,1,2,3,)
    private String findKeyword;//검색어
}
