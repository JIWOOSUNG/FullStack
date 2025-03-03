package com.kbsw.posts.controller;

import com.kbsw.posts.model.PagingDTO;
import com.kbsw.posts.model.PostDTO;
import com.kbsw.posts.service.PostsService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@Slf4j
@RequestMapping("/posts")  //공통적으로 적용되는 매핑
public class PostsController {

    //Field Injection
    @Autowired //byType 으로 주입.  PostsService 타입
    private PostsService postService;


    //http://localhost:8080/posts/form
    @RequestMapping(value="/form", method = RequestMethod.GET)
    public String postsForm(){

        return "posts/postsForm";
        //"WEB-INF/views/posts/postsForm.jsp"
    }//------------------

    @RequestMapping(value="/write", method = RequestMethod.POST)
    public String postsWrite(@ModelAttribute PostDTO dto,
                             @RequestParam("mfileName") MultipartFile mfileName, //첨부파일 파라미터=> MultipartFile로 받는다
                             HttpServletRequest req,
                             Model model){ //html input name과 DTO의 property명이 동일하면 스프링이 자동으로 값을 DTO에 담아준다
        //System.out.println("postsWrite() 들어옴..."+dto);
        log.info("mode==={}, dto==={}", dto.getMode(), dto);
        log.info("mfileName=={}", mfileName);
        //1. 유효성 체크==>생략
        
        //2. 파일 업로드 처리
        //2_1. 업로드할 디렉토리 절대 경로 얻기 /posts_upload
        ServletContext app=req.getServletContext();
        String upDir=app.getRealPath("/posts_upload"); //절대경로 반환
        log.info("upDir=={}",upDir);
        File dir=new File(upDir);
        if(! dir.exists()){//디렉토리가 없다면
            //디렉토리 생성
            dir.mkdirs();
        }
        //2_2. 파일 업로드 처리
        if(! mfileName.isEmpty()){//첨부파일이 있다면
            //원본파일명 구하기
            String fname=mfileName.getOriginalFilename();
            
            //물리적 파일명 만들기=> uuid_원본파일명
            UUID uuid=UUID.randomUUID();
            String fileName=uuid.toString()+"_"+fname;
            long fileSize=mfileName.getSize();
            log.info("fname={}",fname);
            log.info("fileName={}",fileName);
            //업로드 처리/////////////////////
            try{
                mfileName.transferTo(new File(upDir, fileName));
                log.info("파일 업로드 성공!!");
            }catch(IOException e){
                log.error("파일 업로드 실패: "+e);
            }
            if("edit".equals(dto.getMode())){
                //수정처리할 경우 ==> 예전에 첨부했던 파일이 있다면 삭제 처리
                String old_file=dto.getOld_fileName();
                if(old_file!=null){
                    File tmp=new File(upDir,old_file);
                    if(tmp.exists()){
                        boolean b=tmp.delete();
                        log.info("예전파일 삭제 여부={}",b);
                    }//if
                }//if
            }//if------
            //////////////////////////////////
            dto.setOriginFileName(fname);
            dto.setFileName(fileName);
            dto.setFileSize(fileSize);
        }//if----------------
        //3. DB에 insert 또는 update 처리
        int n=0;
        String msg="", loc="";
        if(dto.getMode().equals("write")) {
           // for(int i=0;i<30;i++)
            n = postService.insertPost(dto);

            msg = (n > 0) ? "포스트 등록 성공" : "등록 실패";
            loc = (n > 0) ? "list" : "javascript:history.back()";
        }else if(dto.getMode().equals("edit")){
            n=postService.updatePost(dto);
            msg=(n>0)?"수정 성공":"수정 실패";
            loc = (n > 0) ? "list" : "javascript:history.back()";
        }
        //Model에 key,value 형태로 매핑해서 저장하면 ==>View(jsp)에서 꺼내서 사용할 수 있다
        model.addAttribute("msg", msg);
        model.addAttribute("loc", loc);
        return "message";
        //"WEB-INF/views/message.jsp
    }
    /** 전체 목록 가져오기 또는 검색 목록 가져오기 */
    @RequestMapping(value="/list",method = RequestMethod.GET)
    public String postsList(Model model, PagingDTO pageDto){
        log.info("pageDto: {}",pageDto);
        //1. 총 게시글 수 또는 검색한 게시글 수 가져오기
        int totalCount=postService.getTotalCount(pageDto);
        pageDto.setTotalCount(totalCount);//총 게시글 수 설정
        pageDto.setPageSize(5);
        //페이징 처리 연산하는 함수 호출////
        pageDto.init();
        //////////////////////////////////

        //2. 게시글 (검색한 글) 가져오기
        List<PostDTO> list=postService.listPost(pageDto);
        //list.size() ==> 총 게시글수
        model.addAttribute("list", list);
        model.addAttribute("totalCount", totalCount);
        model.addAttribute("page", pageDto);
        return "posts/postsList";
        //"WEB-INF/views/posts/postsList.jsp
    }
    @GetMapping("/view")
    public String postsView(@RequestParam(defaultValue = "0") int id, Model model){
        log.info("id==={}",id);
        if(id==0){
            return "redirect:/posts/list"; //redirect방식으로 페이지를 이동시킨다
            //redirect:  접두어를 붙이면 redirect방식으로 이동
            // 브라우저 url을 /posts/list 로 바꿔서 서버에 새로운 요청을 보내는 방식
        }
        //조회수 증가
        postService.updateReadNum(id);
        //글번호로 글 내용 가져와서 Model에 저장하기
        PostDTO dto =postService.findPostById(id);
        model.addAttribute("dto", dto);
        return "posts/postsView";
    }
    @PostMapping("/delete")
    public String postsDelete(@RequestParam(defaultValue = "0") int id,
                              @RequestParam(defaultValue = "") String pwd,
                              HttpServletRequest req,
                              Model model){
        log.info("id=={}, pwd=={}",id, pwd);
        //1. 유효성 체크
        if(id==0||pwd.isEmpty()){
            return "redirect:/posts/list";
        }
        //2. 해당 글을 DB에서 가져오기
        PostDTO dto=postService.findPostById(id);
        if(dto==null){
            model.addAttribute("msg","해당 글은 없습니다");
            model.addAttribute("loc","/posts/list");
            return "message";
        }

        //비밀번호 체크
        if(!dto.getPwd().equals(pwd)){
            model.addAttribute("msg","비밀번호가 일치하지 않아요");
            model.addAttribute("loc","javascript:history.back()");
            return "message"; //forward방식으로 이동 (서버 내부에서 이동함
        }
        //DB에서 삭제 처리
        int n=postService.deletePostById(id);
        if(n>0 && dto.getFileName()!=null) {
            //원글에 업로드했던 파일이 있다면 서버에서 파일 삭제 처리
            String upDir=req.getServletContext().getRealPath("/posts_upload");
            File file=new File(upDir,dto.getFileName());
            if(file.exists()){
                boolean b=file.delete();//파일 삭제 처리
                log.info("파일 삭제 여부={}",b);
            }
        }
        return "redirect:/posts/list";
    }//------------------------------------

    @PostMapping("/editform")
    public String postsEditForm(@RequestParam(defaultValue = "0") int id,
                                @RequestParam(defaultValue = "") String pwd,
                                Model model){
        //1. 유효성 체크
        if(id==0||pwd.isEmpty()){
            return "redirect:/posts/list";
        }
        //2. 해당 글을 DB에서 가져오기
        PostDTO dto=postService.findPostById(id);
        if(dto==null){
            model.addAttribute("msg","해당 글은 없습니다");
            model.addAttribute("loc","/posts/list");
            return "message";
        }

        //비밀번호 체크
        if(!dto.getPwd().equals(pwd)){
            model.addAttribute("msg","비밀번호가 일치하지 않아요");
            model.addAttribute("loc","javascript:history.back()");
            return "message"; //forward방식으로 이동 (서버 내부에서 이동함
        }

        model.addAttribute("post", dto);
        return "posts/postsEdit";
    }
}
