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
public class SessionController {

    protected static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private ChatMapper chatMapper;

    @Autowired
    private SessionMapper sessionMapper;

    @Autowired
    public Session session;


    @GetMapping("/sessions/userid/{userId}")
    public Object fetchSessionsByUserId(@PathVariable("userId") Integer userId){
        List<DetailedSession> sessions = sessionMapper.fetchSessionsById(userId);
        for(DetailedSession detailedSession: sessions){
            Chat c = chatMapper.getLatestTime(detailedSession.getSessionId());
            if(c != null){
                detailedSession.setMessageDigestion(c.getChatContent());
                detailedSession.setUpdateTime(c.getChatTimestamp());
            }
        }
        return sessions;
    }

    @GetMapping("/sessions/sessionid/{sessionId}")
    public Object getSessionsBySessionId(@PathVariable("sessionId") String sessionId){
        return sessionMapper.getSessionBySessionId(sessionId);
    }


    @PostMapping("/sessions/new")
    public Integer createSession(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        session = objectMapper.readValue(content, Session.class);
        sessionMapper.createSession(session.getSessionId(), session.getUserAId(), session.getUserAName(), session.getUserAAvatar(),
                session.getUserBId(), session.getUserBName(), session.getUserBAvatar(), session.getSessionTimestamp());
        return 1;
    }


}
