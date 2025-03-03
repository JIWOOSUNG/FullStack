package com.kbsw.posts.service;

import com.kbsw.posts.mapper.PostMapper;
import com.kbsw.posts.model.PagingDTO;
import com.kbsw.posts.model.PostDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("postsServiceImpl")
@Slf4j
public class PostsServiceImpl implements PostsService{

    @Autowired
    private PostMapper postMapper;

    @Override
    public int insertPost(PostDTO board) {
        log.info("insertPost 들어옴");
        return postMapper.insertPost(board);
    }
    @Override
    public List<PostDTO> listPost(PagingDTO paging) {

        return postMapper.listPost(paging);
    }
    @Override
    public int getTotalCount(PagingDTO paging) {
        return postMapper.getTotalCount(paging);
    }
    @Override
    public PostDTO findPostById(int id) {
        return null;
    }

    @Override
    public int updateReadNum(int id) {
        return 0;
    }

    @Override
    public int deletePostById(int id) {
        return 0;
    }

    @Override
    public int updatePost(PostDTO board) {
        return 0;
    }
}
