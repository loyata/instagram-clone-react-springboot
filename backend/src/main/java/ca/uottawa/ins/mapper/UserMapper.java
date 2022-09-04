package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {


    @Insert("INSERT INTO user values(null, #{user.userName}, #{user.email}, #{user.password})")
    int insertUser(User user);

    @Select("SELECT * FROM user WHERE user_id = #{id}")
    User getUserById(Integer id);

    @Select("SELECT * FROM user")
    List<User> getAllUsers();
}