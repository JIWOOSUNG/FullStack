package com.kbsw.user.controller;

import com.kbsw.user.entity.MemberEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //Restful 방식의 서비스를 지원하는 어노테이션  @Controller + @ResponseBody 합친 컨트롤러
@RequestMapping("/api/users")
@Slf4j
public class MemberApiController {

    @GetMapping("")
    public ResponseEntity<MemberEntity> getMembers(){

        MemberEntity user=new MemberEntity(1L,"김테스트","test@a.b.c",
                "111","USER",null,null);
        return ResponseEntity.status(200).body(user);
    }
}
