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
    
    private int pageNum=1;//현재 보여줄 페이지 번호. 페이지 링크에 따라 변경됨
    private int pageSize=10;//한 페이지 당 보여줄 목록 개수
    private int totalCount;//총 게시글 수 DB에서 가져와 설정할 예정
    private int pageCount;//총 게시글 수와 pageSize와의 연산으로 결정됨

    //DB에서 레코드를 끊어오기 위한 프로퍼티
    private int offset;
    
    //페이징 블럭 처리를 위한 프로퍼티
    private int prevBlock; //이전 5개 <-(이전 블럭)
    private int nextBlock; //이후 5개 ->(다음 블럭)
    private int pagingBlock=5;//한 블럭 당 보여줄 페이지 수

    public void init(){
        if(findType==null) findType="";
        if(findKeyword==null) findKeyword="";

        //페이지수 구하기
        pageCount=(totalCount-1)/pageSize+1;
        if(pageNum<1){
            pageNum=1;//1페이지를 디폴트로 설정
        }
        if(pageNum>pageCount){
            pageNum=pageCount;//마지막 페이지로 설정
        }
        //DB에서 끊어서 가져오기 위한 변수값 연산하기 (offset)
        offset=(pageNum-1)*pageSize;
        //페이징 블럭 연산
        prevBlock = (pageNum-1)/pagingBlock * pagingBlock;
        nextBlock = prevBlock +(pagingBlock+1);
    }

}
