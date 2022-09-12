package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface FollowMapper {


    @Insert("INSERT INTO follows(follower_id, followee_id, follow_timestamp) values(#{followerId}, #{followeeId}, #{followTimestamp})")
    int insertFollow(Integer followerId, Integer followeeId, String followTimestamp);

    @Delete("DELETE FROM follows WHERE follower_id = #{followerId} and followee_id = #{followeeId}")
    int deleteFollow(Integer followerId, Integer followeeId);

}