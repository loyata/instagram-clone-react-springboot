package ca.uottawa.ins.model;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Save {
    private Integer saveId;
    private Integer userId;
    private Integer postId;
    private String saveTimestamp;
}