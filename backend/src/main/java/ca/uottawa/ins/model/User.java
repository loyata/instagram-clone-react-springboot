package ca.uottawa.ins.model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String userName;
    private String email;
    private String password;
    private String avatar;
    private String fullName;
    private String lastLogin;
    private String website;
    private String bio;
    private String phoneNumber;
}

