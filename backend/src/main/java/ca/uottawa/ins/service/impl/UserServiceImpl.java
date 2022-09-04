package ca.uottawa.ins.service.impl;

import ca.uottawa.ins.mapper.UserMapper;
import ca.uottawa.ins.model.User;
import ca.uottawa.ins.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }
}
