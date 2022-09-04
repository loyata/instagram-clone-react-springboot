package ca.uottawa.ins.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Follow {
    private Integer user_id;
    private Integer follower_id;

}
