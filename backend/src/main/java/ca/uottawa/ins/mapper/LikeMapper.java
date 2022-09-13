package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.Follow;
import ca.uottawa.ins.model.Like;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface LikeMapper {


    @Insert("INSERT INTO likes(user_id, user_name, user_avatar, post_id, like_timestamp) values(#{userId}, #{userName}, #{userAvatar}, #{postId}, #{likeTimestamp})")
    int insertLike(Integer userId, String userName, String userAvatar, Integer postId, String likeTimestamp);

    @Delete("DELETE FROM likes WHERE user_id = #{userId} and post_id = #{postId}")
    int deleteLike(Integer userId, Integer postId);

    @Select("SELECT * FROM likes WHERE post_id = #{postId}")
    List<Like> getAllLikes(Integer postId);

    @Select("SELECT * FROM likes WHERE user_id = #{userId} and post_id = #{postId}")
    List<Like> checkIsLiking(Integer userId, Integer postId);

}
