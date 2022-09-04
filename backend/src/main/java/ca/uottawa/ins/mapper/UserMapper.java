package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface UserMapper {


    @Insert("INSERT INTO user(user_name, email, password) values(#{userName}, #{email}, #{password})")
    int insertUser(String userName, String email, String password);

    @Select("SELECT * FROM user WHERE user_id = #{id}")
    User getUserById(Integer id);

    @Select("SELECT * FROM user")
    List<User> getAllUsers();
}