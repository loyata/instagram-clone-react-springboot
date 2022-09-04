package ca.uottawa.ins;
import ca.uottawa.ins.mapper.UserMapper;
import ca.uottawa.ins.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackendApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void getAll(){
        List<User> users = userMapper.getAllUsers();
        System.out.println(users.toString());
    }

}
