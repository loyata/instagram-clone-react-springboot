package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.DetailedPost;
import ca.uottawa.ins.model.Post;
import ca.uottawa.ins.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface PostMapper {


    @Insert("INSERT INTO posts(post_identifier, image_url, user_id, post_date, post_location, " +
            "post_caption, post_alt, post_comments, post_likes, allow_comment, allow_like) " +
            "values(#{postIdentifier}, #{imageUrl}, #{userId}, #{postDate}, #{postLocation}, #{postCaption}," +
            " #{postAlt}, #{postComments}, #{postLikes}, #{allowComment}, #{allowLike})")
    int insertPost(String postIdentifier, String imageUrl, int userId, String postDate,
                   String postLocation, String postCaption, String postAlt,
                   int postComments,int postLikes,boolean allowComment,boolean allowLike);


    @Select("SELECT * FROM posts WHERE user_id = #{id}")
    List<Post> getPostsById(Integer id);

    @Select("SELECT * FROM posts WHERE user_name = #{userName}")
    List<Post> getPostsByName(String userName);

    @Select("SELECT * FROM posts WHERE post_identifier = #{identifier}")
    List<Post> getPostByIdentifier(String identifier);

    @Select("SELECT * FROM posts WHERE post_id = #{postId}")
    DetailedPost getPostByPostId(Integer postId);

    @Select("SELECT posts.user_id, post_id, post_likes, avatar as user_avatar, user_name, post_location, image_url, post_date, post_likes " +
            "FROM posts, users " +
            "WHERE posts.user_id = users.user_id " +
            "ORDER BY RAND() " +
            "LIMIT 5")
    List<DetailedPost> getRandomPosts(Integer limit);

    @Select("SELECT b.* FROM (" +
            "SELECT * FROM saves WHERE saves.user_id = #{userId}" +
            ") a, posts b " +
            "WHERE " +
            "a.post_id = b.post_id")
    List<Post> getSavedPostsByUserId(Integer userId);

    @Update("UPDATE posts SET post_comments = post_comments + 1 WHERE post_id = #{postId}")
    int increaseComments(Integer postId);

    @Update("UPDATE posts SET post_comments = post_comments - 1 WHERE post_id = #{postId}")
    int decreaseComments(Integer postId);

    @Update("UPDATE posts SET post_likes = post_likes + 1 WHERE post_id = #{postId}")
    int increaseLikes(Integer postId);

    @Update("UPDATE posts SET post_likes = post_likes - 1 WHERE post_id = #{postId}")
    int decreaseLikes(Integer postId);


}
