package com.kbsw.posts.controller;

import com.kbsw.posts.model.PostDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PostsController {

    //http://localhost:8080/posts/form
    @RequestMapping(value="/posts/form", method = RequestMethod.GET)
    public String postsForm(){

        return "posts/postsForm";
        //"WEB-INF/views/posts/postsForm.jsp"
    }//------------------

    @RequestMapping(value="/posts/write", method = RequestMethod.POST)
    public String postsWrite(@ModelAttribute PostDTO dto){ //html input name과 DTO의 property명이 동일하면 스프링이 자동으로 값을 DTO에 담아준다
        System.out.println("postsWrite() 들어옴..."+dto);
        return "message";
        //"WEB-INF/views/message.jsp
    }


}
