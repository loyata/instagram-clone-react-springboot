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
public class CommentController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    public Comment comment;


    @GetMapping("/comments/postid/{postId}")
    public Object fetchCommentsByPostId(@PathVariable("postId") Integer postId){
        List<Comment> allComments = commentMapper.fetchCommentsByPostId(postId);
        return allComments;
    }

    @PostMapping("/comments/new")
    public Integer newComment(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        comment = objectMapper.readValue(content, Comment.class);
        logger.info(comment.toString());
        postMapper.increaseComments(comment.getPostId());
        commentMapper.insertComment(comment.getPostId(), comment.getCommenterId(), comment.getCommentContent(), comment.getCommentTimestamp(), comment.getCommenterName(), comment.getCommenterAvatar());
        return 1;
    }

}
