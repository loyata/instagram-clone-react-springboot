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
            "LIMIT #{limit}")
    List<DetailedPost> getRandomPosts(Integer limit);


    @Select("SELECT posts.user_id, post_id, post_likes, avatar as user_avatar, user_name, post_location, image_url, post_date, post_likes " +
            "FROM posts, users " +
            "WHERE users.user_id != #{userId} AND posts.user_id = users.user_id " +
            "ORDER BY RAND() " +
            "LIMIT #{limit}")
    List<DetailedPost> getSamplePostsExcludingSelf(Integer userId, Integer limit);


    @Select("SELECT p.user_id, post_id, post_likes, avatar as user_avatar, user_name, post_location, image_url, post_date, post_likes \n" +
            "FROM follows f, posts p, users u \n" +
            "WHERE f.follower_id = #{userId} \n" +
            "AND f.followee_id = p.user_id \n" +
            "AND p.user_id = u.user_id \n" +
            "ORDER BY post_id \n" +
            "LIMIT #{startIndex}, #{limit}")
    List<DetailedPost> getFriendPostsPaging(Integer userId, Integer startIndex, Integer limit);

    @Select("SELECT p.user_id, p.post_id, post_likes, avatar as user_avatar, user_name, post_location, image_url, post_date, post_likes\n" +
            "FROM saves s, posts p, users u\n" +
            "WHERE s.user_id = #{userId} \n" +
            "AND s.post_id = p.post_id\n" +
            "AND p.user_id = u.user_id \n" +
            "ORDER BY post_id \n" +
            "LIMIT #{startIndex}, #{limit}")
    List<DetailedPost> getFavoritePostsPaging(Integer userId, Integer startIndex, Integer limit);

    @Select("SELECT b.* FROM (" +
            "SELECT * FROM saves WHERE saves.user_id = #{userId}" +
            ") a, posts b " +
            "WHERE " +
            "a.post_id = b.post_id")
    List<Post> getSavedPostsByUserId(Integer userId);

    @Delete("DELETE FROM posts WHERE post_id = #{postId}")
    Integer deletePost(Integer postId);

    @Update("UPDATE posts SET post_caption = #{postCaption}, post_location = #{postLocation}, post_alt = #{postAlt} WHERE post_id = #{postId}")
    int updatePost(Integer postId, String postCaption, String postLocation, String postAlt);

    @Update("UPDATE posts SET post_comments = post_comments + 1 WHERE post_id = #{postId}")
    int increaseComments(Integer postId);

    @Update("UPDATE posts SET post_comments = post_comments - 1 WHERE post_id = #{postId}")
    int decreaseComments(Integer postId);

    @Update("UPDATE posts SET post_likes = post_likes + 1 WHERE post_id = #{postId}")
    int increaseLikes(Integer postId);

    @Update("UPDATE posts SET post_likes = post_likes - 1 WHERE post_id = #{postId}")
    int decreaseLikes(Integer postId);


}
