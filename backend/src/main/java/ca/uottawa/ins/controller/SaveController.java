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
public class SaveController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private SaveMapper saveMapper;

    @Autowired
    public Save save;

    @PostMapping("/saves/save")
    public Integer save(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        logger.info(save.toString());
        saveMapper.insertSave(save.getUserId(), save.getPostId(), save.getSaveTimestamp());
        return 1;
    }

    @PostMapping("/saves/unsave")
    public Integer unsave(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        saveMapper.deleteSave(save.getUserId(),save.getPostId());
        return 1;
    }


    @PostMapping("/saves/check")
    public boolean checkSave(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        save = objectMapper.readValue(content, Save.class);
        List<Save> res = saveMapper.checkIsSaving(save.getUserId(),save.getPostId());
        return res.size() != 0 ;
    }


}
