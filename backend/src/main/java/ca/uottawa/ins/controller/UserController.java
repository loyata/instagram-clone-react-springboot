package ca.uottawa.ins.controller;

import ca.uottawa.ins.service.UserService;
import ca.uottawa.ins.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;


    @GetMapping("/users")
    public Object getAllUsers(){
        return userServiceImpl.getAllUsers();
    }


}
