package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.Chat;
import ca.uottawa.ins.model.Save;
import ca.uottawa.ins.model.Session;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ChatMapper {

    @Insert("INSERT INTO chats(session_id, user_id, chat_content, chat_timestamp)" +
            " values(#{sessionId}, #{userId}, #{chatContent}, #{chatTimestamp})")
    int createChat(String sessionId, Integer userId, String chatContent, String chatTimestamp);


    @Select("SELECT * FROM chats WHERE session_id = #{sessionId} ORDER BY chat_timestamp DESC")
    List<Chat> getChatsBySessionId(String sessionId);


    @Select("SELECT chat_timestamp, chat_content FROM chats WHERE session_id = #{sessionId} ORDER BY chat_timestamp DESC LIMIT 1")
    Chat getLatestTime(String sessionId);

}