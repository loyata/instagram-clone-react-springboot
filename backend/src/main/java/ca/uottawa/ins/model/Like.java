package ca.uottawa.ins.model;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Like {
    private Integer likeId;
    private Integer userId;
    private String userName;
    private String userAvatar;
    private Integer postId;
    private String likeTimestamp;
}