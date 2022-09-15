package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.DetailedSession;
import ca.uottawa.ins.model.Save;
import ca.uottawa.ins.model.Session;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface SessionMapper {

    @Insert("INSERT INTO sessions(session_id, userA_id, userA_name, userA_avatar, userB_id, userB_name, userB_avatar, session_timestamp)" +
            " values(#{sessionId}, #{userAId}, #{userAName}, #{userAAvatar}, #{userBId}, #{userBName}, #{userBAvatar}, #{sessionTimestamp})")
    int createSession(String sessionId, Integer userAId, String userAName, String userAAvatar, Integer userBId, String userBName, String userBAvatar, String sessionTimestamp);


    @Select("SELECT * FROM sessions WHERE userA_id = #{id} OR userB_id = #{id}")
    List<DetailedSession> fetchSessionsById(Integer id);

    @Select("SELECT * FROM sessions WHERE session_id = #{sessionId}")
    List<DetailedSession> getSessionBySessionId(String sessionId);
}

