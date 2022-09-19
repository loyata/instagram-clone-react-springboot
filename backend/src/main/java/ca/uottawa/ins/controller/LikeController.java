package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.*;
import ca.uottawa.ins.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@CrossOrigin
public class LikeController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private LikeMapper likeMapper;

    @Autowired
    public Like like;


    @GetMapping("/likes/postid/{postId}")
    public Object getLikesById(@PathVariable("postId") Integer postId){
        List<Like> allLikes = likeMapper.getAllLikes(postId);
        return allLikes;
    }

    @PostMapping("/likes/like")
    public Integer like(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        like = objectMapper.readValue(content, Like.class);
        likeMapper.insertLike(like.getUserId(), like.getUserName(), like.getUserAvatar(), like.getPostId(), like.getLikeTimestamp());
        postMapper.increaseLikes(like.getPostId());
        return 1;
    }

    @PostMapping("/likes/unlike")
    public Integer unlike(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        like = objectMapper.readValue(content, Like.class);
        likeMapper.deleteLike(like.getUserId(),like.getPostId());
        postMapper.decreaseLikes(like.getPostId());
        return 1;
    }


    @PostMapping("/likes/check")
    public boolean checkLike(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        like = objectMapper.readValue(content, Like.class);
        List<Like> res = likeMapper.checkIsLiking(like.getUserId(),like.getPostId());
        return res.size() != 0 ;
    }

}
