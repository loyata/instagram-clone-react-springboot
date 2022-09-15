package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.Save;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface SaveMapper {

    @Insert("INSERT INTO saves(user_id, post_id, save_timestamp) values(#{userId}, #{postId}, #{saveTimestamp})")
    int insertSave(Integer userId, Integer postId, String saveTimestamp);

    @Delete("DELETE FROM saves WHERE user_id = #{userId} and post_id = #{postId}")
    int deleteSave(Integer userId, Integer postId);

    @Select("SELECT * FROM saves WHERE user_id = #{userId} and post_id = #{postId}")
    List<Save> checkIsSaving(Integer userId, Integer postId);


}

