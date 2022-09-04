package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.UserMapper;
import ca.uottawa.ins.model.User;
import ca.uottawa.ins.service.UserService;
import ca.uottawa.ins.service.impl.UserServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    @RequestMapping("/test")
    public String test(){
        return "xxx";
    }


    @PostMapping("/accounts/signup")
    public Integer index(@RequestBody String content) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        user = objectMapper.readValue(content, User.class);
        Integer res = userMapper.insertUser(user);

        logger.info(res.toString());

        return res;
    }
}
