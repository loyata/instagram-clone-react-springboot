package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.*;
import ca.uottawa.ins.model.*;
import ca.uottawa.ins.utils.JWTUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@CrossOrigin
public class AccountController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    public User user;

    @Autowired
    public Image image;

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

    @PostMapping("/accounts/signup")
    public String signup(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        String token = JWTUtil.sign(user.getUserName(), user.getUserId());
        userMapper.insertUser(user.getUserName(), user.getEmail(), user.getPassword(), user.getFullName(), user.getAvatar());
        return token;
    }

    @PostMapping("/accounts/avatar")
    public Integer avatar(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        image = objectMapper.readValue(content, Image.class);
        Integer res = userMapper.updateAvatar(image.getUserName(), image.getImageUrl());
        return res;
    }

    @PostMapping("/accounts/update")
    public Integer userUpdate(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        Integer res = userMapper.updateInSettings(user.getUserName(), user.getAvatar(), user.getFullName(),user.getWebsite(), user.getBio(), user.getPhoneNumber());
        return res;
    }

    @PostMapping("/accounts/login")
    public String login(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        String emailOrPassword = user.getEmail();
        String lastLoginTime = user.getLastLogin();
        List<User> allUsers = userMapper.getAllUsers();
        List<String> allUserNames = userMapper.getAllUserNames();
        List<String> allEmails = userMapper.getAllEmails();
        String encodedPassword = "";
        String userName = "";
        Integer id = -1;
        logger.info(emailOrPassword);
        if(allUserNames.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getUserName().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    id = user.getUserId();
                    break;
                }
            }
        }else if(allEmails.contains(emailOrPassword)){
            for(User user:allUsers){
                if(user.getEmail().equals(emailOrPassword)){
                    encodedPassword = user.getPassword();
                    userName = user.getUserName();
                    id = user.getUserId();
                    break;
                }
            }
        }else return "NO_SUCH_ACCOUNT";
        logger.info(encodedPassword);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean result = passwordEncoder.matches(user.getPassword(), encodedPassword);
        if(!result) return "WRONG PASSWORD";
        userMapper.updateLoginTime(lastLoginTime, userName);
        String token = JWTUtil.sign(userName, id);
        return token;
    }
}
