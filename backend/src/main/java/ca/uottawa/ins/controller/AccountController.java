package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.*;
import ca.uottawa.ins.model.*;
import ca.uottawa.ins.service.UserService;
import ca.uottawa.ins.service.impl.UserServiceImpl;
import ca.uottawa.ins.utils.JWTUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class AccountController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PostMapper postMapper;

    @Autowired
    private FollowMapper followMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private LikeMapper likeMapper;

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private SaveMapper saveMapper;

    @Autowired
    private SessionMapper sessionMapper;

    @Autowired
    private ChatMapper chatMapper;

    @Autowired
    public User user;

    @Autowired
    public Image image;

    @Autowired
    public Post post;

    @Autowired
    public Follow follow;

    @Autowired
    public Comment comment;

    @Autowired
    public Like like;

    @Autowired
    public Tag tag;

    @Autowired
    public Save save;

    @Autowired
    public Chat chat;

    @Autowired
    public Session session;

    @Autowired
    public DetailedFollow detailedFollow;

    @Autowired
    public DetailedSession detailedSession;

    @Autowired
    public DetailedPost detailedPost;

    @Autowired
    public MutualFriend mutualFriend;

    @Autowired
    public MutualResult mutualResult;


    // User








    @GetMapping("/chats/sessionid/{sessionId}")
    public Object getLatestSession(@PathVariable("sessionId") String sessionId){
        return chatMapper.getLatestTime(sessionId);
    }


    @CrossOrigin
    @GetMapping("/users/username/{username}")
    public Object getUserByName(@PathVariable("username") String username){
        return userMapper.getUserByName(username);
    }

    @CrossOrigin
    @GetMapping("/users/userid/{userId}")
    public Object getUserById(@PathVariable("userId") Integer userId){
        return userMapper.getUserById(userId);
    }

//    queryUser
    @CrossOrigin
    @GetMapping("/users/query/{query}")
    public Object queryUser(@PathVariable("query") String query){
        return userMapper.queryUsers("%" + query + "%");
    }


    @CrossOrigin
    @GetMapping("/users/random/{num}")
    public Object getRandomUsers(@PathVariable("num") Integer num){
        return userMapper.getRandomUsers(num);
    }

//    getMutualFollowsByUserId
    @CrossOrigin
    @GetMapping("/follows/mutual/{userId}")
    public Object getMutualFollowsByUserId(@PathVariable("userId") Integer userId){
        List<User> queryUsers = userMapper.getQueryObjects(userId);

        List<Follow> allFollowees = followMapper.getAllFollowees(userId);
        List<Integer> friends = new ArrayList<>();
        for(Follow f: allFollowees){
            friends.add(f.getFolloweeId());
        }

        List<MutualResult> res = new ArrayList<>();
        for(int i = 0; i < queryUsers.size(); i++){
            List<MutualFriend> temp = userMapper.getMutualFriends(userId, queryUsers.get(i).getUserId());
            if(temp.size() != 0 && !friends.contains(queryUsers.get(i).getUserId())){
                MutualResult mutualResult = new MutualResult();
                mutualResult.setUserId(queryUsers.get(i).getUserId());
                mutualResult.setUserAvatar(queryUsers.get(i).getAvatar());
                mutualResult.setUserName(queryUsers.get(i).getUserName());
                mutualResult.setMutualNumber(temp.size());
                mutualResult.setMutual(temp);
                res.add(mutualResult);
            }
        }
        return res;
    }


    @GetMapping("/accounts/validate/username/{username}")
    public boolean checkUserName(@PathVariable("username") String username){
        List<String> allUserNames = userMapper.getAllUserNames();
        return !allUserNames.contains(username);
    }


    @GetMapping("/accounts/validate/email/{email}")
    public boolean checkEmail(@PathVariable("email") String email){
        List<String> allEmails = userMapper.getAllEmails();
        return !allEmails.contains(email);
    }


    @GetMapping("/follows/followers/{userId}")
    public Object getFollowersById(@PathVariable("userId") Integer userId){
        List<Follow> allFollowers = followMapper.getAllFollowers(userId);

        return allFollowers;
    }

    @GetMapping("/follows/followees/{userId}")
    public Object getFolloweesById(@PathVariable("userId") Integer userId){
        logger.info(userId.toString());
        List<Follow> allFollowees = followMapper.getAllFollowees(userId);
        return allFollowees;
    }

    @GetMapping("/sessions/userid/{userId}")
    public Object fetchSessionsByUserId(@PathVariable("userId") Integer userId){
        List<DetailedSession> sessions = sessionMapper.fetchSessionsById(userId);
        for(DetailedSession detailedSession: sessions){
            Chat c = chatMapper.getLatestTime(detailedSession.getSessionId());
            if(c != null){
                detailedSession.setMessageDigestion(c.getChatContent());
                detailedSession.setUpdateTime(c.getChatTimestamp());
            }
        }
        return sessions;
    }

//    getSessionsBySessionId
    @GetMapping("/sessions/sessionid/{sessionId}")
    public Object getSessionsBySessionId(@PathVariable("sessionId") String sessionId){
        return sessionMapper.getSessionBySessionId(sessionId);
    }

    @GetMapping("/chats/allchats/{sessionId}")
    public Object getChatsBySessionId(@PathVariable("sessionId") String sessionId){
        return chatMapper.getChatsBySessionId(sessionId);
    }


    @CrossOrigin
    @GetMapping("/posts/user/{userId}")
    public Object getPostsById(@PathVariable("userId") Integer userId){
        List<Post> allPosts = postMapper.getPostsById(userId);
        return allPosts;
    }



    @CrossOrigin
    @GetMapping("/posts/username/{userId}")
    public Object getPostsByName(@PathVariable("userName") String userName){
        List<Post> allPosts = postMapper.getPostsByName(userName);
        return allPosts;
    }

    @CrossOrigin
    @GetMapping("/posts/friends")
    public Object getFriendPosts(@RequestParam("userId") Integer userId, @RequestParam("startIndex") Integer startIndex, @RequestParam("limit") Integer limit){
        return postMapper.getFriendPostsPaging(userId, startIndex, limit);
    }

    @CrossOrigin
    @GetMapping("/posts/random/others")
    public Object getSamplePostsExcludingSelf(@RequestParam("userId") Integer userId, @RequestParam("limit") Integer limit){
        return postMapper.getSamplePostsExcludingSelf(userId, limit);
    }


    @CrossOrigin
    @GetMapping("/follows/recent")
    public Object getRecentFollows(@RequestParam("userId") Integer userId, @RequestParam("limit") Integer limit){
        return followMapper.getAllRecentFollows(userId, limit);
    }

    @CrossOrigin
    @GetMapping("/posts/favorites")
    public Object getFavoritePosts(@RequestParam("userId") Integer userId, @RequestParam("startIndex") Integer startIndex, @RequestParam("limit") Integer limit){
        return postMapper.getFavoritePostsPaging(userId, startIndex, limit);
    }


    @CrossOrigin
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

//    export const getSavedPostsByUserId = (userId) => instance.get(`/posts/saved/userid/${userId}`)
    @GetMapping("/posts/saved/userid/{userId}")
    public Object getSavedPostsByUserId(@PathVariable("userId") Integer userId){
        List<Post> allPosts = postMapper.getSavedPostsByUserId(userId);
        return allPosts;
}





    @RequestMapping("/test")
    public String test(){
        return "xxx";
    }


    @PostMapping("/follows/follow")
    public Integer follow(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        follow = objectMapper.readValue(content, Follow.class);
        followMapper.insertFollow(follow.getFollowerId(), follow.getFolloweeId(), follow.getFollowTimestamp());
        return 1;
    }




    @PostMapping("/sessions/new")
    public Integer createSession(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        session = objectMapper.readValue(content, Session.class);
        sessionMapper.createSession(session.getSessionId(), session.getUserAId(), session.getUserAName(), session.getUserAAvatar(),
                session.getUserBId(), session.getUserBName(), session.getUserBAvatar(), session.getSessionTimestamp());
        return 1;
    }

    @PostMapping("/chats/new")
    public Integer newChat(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        chat = objectMapper.readValue(content, Chat.class);
        chatMapper.createChat(chat.getSessionId(), chat.getUserId(), chat.getChatContent(), chat.getChatTimestamp());
        return 1;
    }


    @PostMapping("/follows/check")
    public boolean checkIsFollowing(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        follow = objectMapper.readValue(content, Follow.class);
        logger.info(follow.toString());
        List<Follow> res = followMapper.checkIsFollowing(follow.getFollowerId(), follow.getFolloweeId());
        return res.size() == 1;
    }

    @PostMapping("/follows/unfollow")
    public Integer unfollow(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        follow = objectMapper.readValue(content, Follow.class);
        followMapper.deleteFollow(follow.getFollowerId(), follow.getFolloweeId());
        return 1;
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

    @CrossOrigin
    @GetMapping("/likes/postid/{postId}")
    public Object getLikesById(@PathVariable("postId") Integer postId){
        List<Like> allLikes = likeMapper.getAllLikes(postId);
        return allLikes;
    }



    @PostMapping("/likes/check")
    public boolean checkLike(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        like = objectMapper.readValue(content, Like.class);
        List<Like> res = likeMapper.checkIsLiking(like.getUserId(),like.getPostId());
        return res.size() != 0 ;
    }


    @PostMapping("/tags/tag")
    public Integer tag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);

        logger.info(tag.toString());

        tagMapper.insertTag(tag.getUserId(), tag.getPostId(), tag.getTagTimestamp());
        return 1;
    }

    @PostMapping("/tags/untag")
    public Integer untag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);
        tagMapper.deleteTag(tag.getUserId(),tag.getPostId());
        return 1;
    }


    @PostMapping("/tags/check")
    public boolean checkTag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);
        List<Tag> res = tagMapper.checkIsTagging(tag.getUserId(),tag.getPostId());
        return res.size() != 0 ;
    }




    @PostMapping("/saves/save")
    public Integer save(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        logger.info(save.toString());
        saveMapper.insertSave(save.getUserId(), save.getPostId(), save.getSaveTimestamp());
        return 1;
    }

    @PostMapping("/saves/unsave")
    public Integer unsave(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        saveMapper.deleteSave(save.getUserId(),save.getPostId());
        return 1;
    }


    @PostMapping("/saves/check")
    public boolean checkSave(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        List<Save> res = saveMapper.checkIsSaving(save.getUserId(),save.getPostId());
        return res.size() != 0 ;
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

    @CrossOrigin
    @GetMapping("/comments/postid/{postId}")
    public Object fetchCommentsByPostId(@PathVariable("postId") Integer postId){
        List<Comment> allComments = commentMapper.fetchCommentsByPostId(postId);
        return allComments;
    }

//    export const getLoginTime = (userId) => instance.get(`/users/login/${userId}`)
    @CrossOrigin
    @GetMapping("/users/login/{userId}")
    public String getLoginTime(@PathVariable("userId") Integer userId){
        return userMapper.getLoginTime(userId);
    }



    @CrossOrigin
    @PostMapping("/accounts/signup")
    public String signup(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        String token = JWTUtil.sign(user.getUserName(), user.getUserId());

        userMapper.insertUser(user.getUserName(), user.getEmail(), user.getPassword(), user.getFullName(), user.getAvatar());

        return token;
    }

    @CrossOrigin
    @PostMapping("/accounts/avatar")
    public Integer avatar(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        image = objectMapper.readValue(content, Image.class);
        Integer res = userMapper.updateAvatar(image.getUserName(), image.getImageUrl());
        return res;
    }

    @CrossOrigin
    @PostMapping("/accounts/update")
    public Integer userUpdate(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        Integer res = userMapper.updateInSettings(user.getUserName(), user.getAvatar(), user.getFullName(),user.getWebsite(), user.getBio(), user.getPhoneNumber());
        return res;
    }

    @CrossOrigin
    @PostMapping("/posts/new")
    public Integer newPost(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        post = objectMapper.readValue(content, Post.class);
        logger.info(post.toString());
        Integer res = postMapper.insertPost(post.getPostIdentifier(), post.getImageUrl(), post.getUserId(), post.getPostDate(), post.getPostLocation(), post.getPostCaption(), post.getPostAlt(), post.getPostComments(), post.getPostLikes(), post.isAllowComment(), post.isAllowLike());
        return res;
    }

    @DeleteMapping("/posts/delete/{postId}")
    public Integer deletePost(@PathVariable("postId") Integer postId){
        return postMapper.deletePost(postId);
    }

    @PatchMapping("/posts/update")
    public Integer updatePost(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        post = objectMapper.readValue(content, Post.class);
        return postMapper.updatePost(post.getPostId(), post.getPostCaption(), post.getPostLocation(), post.getPostAlt());
    }



    @CrossOrigin
    @PostMapping("/accounts/login")
    public String login(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        String emailOrPassword = user.getEmail();

        String lastLoginTime = user.getLastLogin();


        List<User> allUsers = userMapper.getAllUsers();
        List<String> allUserNames = userMapper.getAllUserNames();
        List<String> allEmails = userMapper.getAllEmails();

        String encodedPassword = "";
        String userName = "";
        Integer id = -1;

        logger.info(emailOrPassword);

        if(allUserNames.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getUserName().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    id = user.getUserId();
                    break;
                }
            }

        }else if(allEmails.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getEmail().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    id = user.getUserId();
                    break;
                }
            }
        }else return "NO_SUCH_ACCOUNT";

        logger.info(encodedPassword);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean result = passwordEncoder.matches(user.getPassword(), encodedPassword);
        if(!result) return "WRONG PASSWORD";

        userMapper.updateLoginTime(lastLoginTime, userName);
        String token = JWTUtil.sign(userName, id);

        return token;
    }


}
