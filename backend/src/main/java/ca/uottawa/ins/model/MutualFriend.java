package ca.uottawa.ins.model;
import java.util.List;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor

public class MutualFriend {

    private Integer userId;
    private String userName;
    private String userAvatar;


}
