package ca.uottawa.ins.mapper;
import ca.uottawa.ins.model.MutualFriend;
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

    @Select("SELECT * FROM users ORDER BY RAND() LIMIT #{num}")
    List<User> getRandomUsers(Integer num);

    @Select("SELECT * FROM users")
    List<User> getAllUsers();

    @Select("SELECT * FROM users WHERE user_name LIKE #{query}")
    List<User> queryUsers(String query);

    @Select("SELECT user_name FROM users")
    List<String> getAllUserNames();

    @Select("SELECT email FROM users")
    List<String> getAllEmails();

    @Update("UPDATE users SET avatar = #{imageUrl} WHERE user_name = #{userName}")
    int updateAvatar(String userName, String imageUrl);

    @Update("UPDATE users SET last_login = #{loginTime} WHERE user_name = #{userName}")
    int updateLoginTime(String loginTime, String userName);

    @Update("UPDATE users SET avatar = #{imageUrl}, full_name = #{fullName}, website = #{website}, bio = #{bio}, phone_number = #{phoneNumber} " +
            "WHERE user_name = #{userName}")
    int updateInSettings(String userName, String imageUrl, String fullName, String website, String bio, String phoneNumber);

    @Select("SELECT last_login FROM users WHERE user_id = #{userId}")
    String getLoginTime(Integer userId);

    @Select("SELECT u.user_id, u.user_name, u.avatar\n" +
            "FROM\n" +
            "(\n" +
            "SELECT followee_id \n" +
            "FROM follows f1 WHERE f1.follower_id = #{userId1} \n" +
            "AND f1.followee_id IN (SELECT followee_id FROM follows f2 WHERE f2.follower_id = #{userId2})\n" +
            ") t1, users u\n" +
            "WHERE t1.followee_id = u.user_id")
    List<MutualFriend> getMutualFriends(Integer userId1, Integer userId2);


    @Select("SELECT * FROM users WHERE user_id != #{self}")
    List<User> getQueryObjects(Integer self);
}