package ca.uottawa.ins.controller;

import ca.uottawa.ins.mapper.*;
import ca.uottawa.ins.model.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@CrossOrigin
public class TagController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    public Tag tag;

    @PostMapping("/tags/tag")
    public Integer tag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);
        logger.info(tag.toString());
        tagMapper.insertTag(tag.getUserId(), tag.getPostId(), tag.getTagTimestamp());
        return 1;
    }

    @PostMapping("/tags/untag")
    public Integer untag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);
        tagMapper.deleteTag(tag.getUserId(),tag.getPostId());
        return 1;
    }

    @PostMapping("/tags/check")
    public boolean checkTag(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        tag = objectMapper.readValue(content, Tag.class);
        List<Tag> res = tagMapper.checkIsTagging(tag.getUserId(),tag.getPostId());
        return res.size() != 0 ;
    }


}
