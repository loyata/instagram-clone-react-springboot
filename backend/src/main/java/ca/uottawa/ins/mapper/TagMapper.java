package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.Tag;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface TagMapper {

    @Insert("INSERT INTO tags(user_id, post_id, tag_timestamp) values(#{userId}, #{postId}, #{tagTimestamp})")
    int insertTag(Integer userId, Integer postId, String tagTimestamp);

    @Delete("DELETE FROM tags WHERE user_id = #{userId} and post_id = #{postId}")
    int deleteTag(Integer userId, Integer postId);

    @Select("SELECT * FROM tags WHERE user_id = #{userId} and post_id = #{postId}")
    List<Tag> checkIsTagging(Integer userId, Integer postId);

}
