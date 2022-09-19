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
public class PostController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    public User user;

    @Autowired
    public Post post;

    @Autowired
    public DetailedPost detailedPost;


    @GetMapping("/posts/user/{userId}")
    public Object getPostsById(@PathVariable("userId") Integer userId){
        List<Post> allPosts = postMapper.getPostsById(userId);
        return allPosts;
    }

    @GetMapping("/posts/username/{userId}")
    public Object getPostsByName(@PathVariable("userName") String userName){
        List<Post> allPosts = postMapper.getPostsByName(userName);
        return allPosts;
    }

    @GetMapping("/posts/friends")
    public Object getFriendPosts(@RequestParam("userId") Integer userId, @RequestParam("startIndex") Integer startIndex, @RequestParam("limit") Integer limit){
        return postMapper.getFriendPostsPaging(userId, startIndex, limit);
    }

    @GetMapping("/posts/random/others")
    public Object getSamplePostsExcludingSelf(@RequestParam("userId") Integer userId, @RequestParam("limit") Integer limit){
        return postMapper.getSamplePostsExcludingSelf(userId, limit);
    }

    @GetMapping("/posts/favorites")
    public Object getFavoritePosts(@RequestParam("userId") Integer userId, @RequestParam("startIndex") Integer startIndex, @RequestParam("limit") Integer limit){
        return postMapper.getFavoritePostsPaging(userId, startIndex, limit);
    }

    @GetMapping("/posts/random/{limit}")
    public Object getFriendPostsPaging(@PathVariable("limit") Integer limit){
        List<DetailedPost> randomPosts = postMapper.getRandomPosts(limit);
        return randomPosts;
    }

    @GetMapping("/posts/identifier/{identifier}")
    public Object getPostByIdentifier(@PathVariable("identifier") String identifier){
        List<Post> post = postMapper.getPostByIdentifier(identifier);
        return post.get(0);
    }

    @GetMapping("/posts/postid/{postId}")
    public Object getPostByPostId(@PathVariable("postId") Integer postId){
        detailedPost = postMapper.getPostByPostId(postId);
        Integer userId = detailedPost.getUserId();
        user = userMapper.getUserById(userId);
        String userAvatar = user.getAvatar();
        String userName = user.getUserName();
        detailedPost.setUserAvatar(userAvatar);
        detailedPost.setUserName(userName);
        return detailedPost;
    }

    @GetMapping("/posts/saved/userid/{userId}")
    public Object getSavedPostsByUserId(@PathVariable("userId") Integer userId){
        List<Post> allPosts = postMapper.getSavedPostsByUserId(userId);
        return allPosts;
    }

    @PostMapping("/posts/new")
    public Integer newPost(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        post = objectMapper.readValue(content, Post.class);
        logger.info(post.toString());
        Integer res = postMapper.insertPost(post.getPostIdentifier(), post.getImageUrl(), post.getUserId(), post.getPostDate(), post.getPostLocation(), post.getPostCaption(), post.getPostAlt(), post.getPostComments(), post.getPostLikes(), post.isAllowComment(), post.isAllowLike());
        return res;
    }

    @PatchMapping("/posts/update")
    public Integer updatePost(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        post = objectMapper.readValue(content, Post.class);
        return postMapper.updatePost(post.getPostId(), post.getPostCaption(), post.getPostLocation(), post.getPostAlt());
    }

    @DeleteMapping("/posts/delete/{postId}")
    public Integer deletePost(@PathVariable("postId") Integer postId){
        return postMapper.deletePost(postId);
    }


}
