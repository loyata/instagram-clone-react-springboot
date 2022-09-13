package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {


    @Insert("INSERT INTO users(user_name, email, password, full_name, avatar) values(#{userName}, #{email}, #{password}, #{fullName}, #{avatar})")
    int insertUser(String userName, String email, String password, String fullName, String avatar);

    @Select("SELECT * FROM users WHERE user_id = #{id}")
    User getUserById(Integer id);

    @Select("SELECT * FROM users WHERE user_name = #{name}")
    User getUserByName(String name);

    @Select("SELECT * FROM users")
    List<User> getAllUsers();

    @Select("SELECT user_name FROM users")
    List<String> getAllUserNames();

    @Select("SELECT email FROM users")
    List<String> getAllEmails();

    @Update("UPDATE users SET avatar = #{imageUrl} WHERE user_name = #{userName}")
    int updateAvatar(String userName, String imageUrl);
}