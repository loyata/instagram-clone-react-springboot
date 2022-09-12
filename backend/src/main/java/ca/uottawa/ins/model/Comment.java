package ca.uottawa.ins.model;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private Integer commentId;
    private Integer postId;
    private Integer commenterId;
    private String commentContent;
    private String commentTimestamp;
    private String commenterName;
    private String commenterAvatar;
}