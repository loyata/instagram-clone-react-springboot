package ca.uottawa.ins.service;

import ca.uottawa.ins.model.User;
import org.springframework.stereotype.Component;

import java.util.List;


public interface UserService {
    List<User> getAllUsers();

}
