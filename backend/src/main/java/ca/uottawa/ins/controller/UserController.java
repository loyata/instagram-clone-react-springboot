package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.*;
import ca.uottawa.ins.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@CrossOrigin
public class UserController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    public User user;

    @GetMapping("/users/username/{username}")
    public Object getUserByName(@PathVariable("username") String username){
        return userMapper.getUserByName(username);
    }

    @GetMapping("/users/userid/{userId}")
    public Object getUserById(@PathVariable("userId") Integer userId){
        return userMapper.getUserById(userId);
    }

    @GetMapping("/users/query/{query}")
    public Object queryUser(@PathVariable("query") String query){
        return userMapper.queryUsers("%" + query + "%");
    }

    @GetMapping("/users/random/{num}")
    public Object getRandomUsers(@PathVariable("num") Integer num){
        return userMapper.getRandomUsers(num);
    }

    @GetMapping("/users/login/{userId}")
    public String getLoginTime(@PathVariable("userId") Integer userId){
        return userMapper.getLoginTime(userId);
    }
}
