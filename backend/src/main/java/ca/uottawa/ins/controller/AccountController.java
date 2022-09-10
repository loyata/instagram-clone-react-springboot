package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.UserMapper;
import ca.uottawa.ins.model.User;
import ca.uottawa.ins.service.UserService;
import ca.uottawa.ins.service.impl.UserServiceImpl;
import ca.uottawa.ins.utils.JWTUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin
public class AccountController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    public User user;



    @GetMapping("/users")
    public Object getAllUsers(){
        return userServiceImpl.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public Object getUserById(@PathVariable("id") Integer id){
        return userMapper.getUserById(id);
    }



    @GetMapping("/accounts/validate/username/{username}")
    public boolean checkUserName(@PathVariable("username") String username){
        List<String> allUserNames = userMapper.getAllUserNames();
        return !allUserNames.contains(username);
    }


    @GetMapping("/accounts/validate/email/{email}")
    public boolean checkEmail(@PathVariable("email") String email){
        List<String> allEmails = userMapper.getAllEmails();
        return !allEmails.contains(email);
    }




    @RequestMapping("/test")
    public String test(){
        return "xxx";
    }


    @CrossOrigin
    @PostMapping("/accounts/signup")
    public Integer signup(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        Integer res = userMapper.insertUser(user.getUserName(), user.getEmail(), user.getPassword(), user.getFullName());

        return res;
    }

    @CrossOrigin
    @PostMapping("/accounts/login")
    public String login(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        String emailOrPassword = user.getEmail();

        List<User> allUsers = userMapper.getAllUsers();
        List<String> allUserNames = userMapper.getAllUserNames();
        List<String> allEmails = userMapper.getAllEmails();

        String encodedPassword = "";
        String userName = "";

        logger.info(emailOrPassword);

        if(allUserNames.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getUserName().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    break;
                }
            }

        }else if(allEmails.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getEmail().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    break;
                }
            }
        }else return "NO_SUCH_ACCOUNT";

        logger.info(encodedPassword);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean result = passwordEncoder.matches(user.getPassword(), encodedPassword);
        if(!result) return "WRONG PASSWORD";

        String token = JWTUtil.sign(userName);

        return token;
    }


}
