import React, {useEffect, useState} from 'react';
import {Avatar} from "@mui/material";
import {BsCameraVideo, BsInfoCircle, BsTelephone} from "react-icons/bs";
import {FaRegSmile} from "react-icons/fa";

import "../MessagePage.css"
import {useSelector} from "react-redux";
import {getChatsBySessionId, getLoginTime, getSessionsBySessionId} from "../../../api";
import {useParams} from "react-router-dom";

import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

const MessageDetail = ({selectedSessionDetail}) => {

    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    let {sessionId} = useParams();
    const [session, setSession] = useState({});
    const [commentInput, setCommentInput] = useState('');
    const userInfo = useSelector(state => state.user);
    const [self, setSelf] = useState('');
    const [other, setOther] = useState('');
    const [loginTime, setLoginTime] = useState('');
    const [chats, setChats] = useState([]);



    useEffect(() => {
        const getSession = async () => {
            if(sessionId.length > 0){
                const res = await getSessionsBySessionId(sessionId);
                setSession(res.data[0])
            }
        }
        getSession();
    },[sessionId])


    useEffect(() => {
        if(session.userAId === userInfo.userId){
            setSelf('userA');
            setOther('userB');
        }else{
            setSelf('userB');
            setOther('userA');
        }
    },[sessionId])

    useEffect(() => {
        if(session.userAId === userInfo.userId){
            setSelf('userA');
            setOther('userB');
        }else{
            setSelf('userB');
            setOther('userA');
        }
    })


    useEffect(() => {
        const getLogin = async () => {
            const res = await getLoginTime(session[`${session.userAId !== userInfo.userId ? 'userAId' :'userBId'}`])
            setLoginTime(res.data)
        }

        if(sessionId && Object.keys(session).length !== 0) {
            getLogin()
        }
    })

    const getChats = async () => {
        const res = await getChatsBySessionId(sessionId)
        setChats(res.data)
    }

    useEffect(() => {
        getChats()
    },[sessionId])

    useEffect(() => {
        getChats()
    },[])

    useEffect(() => {
        console.log(chats)
    },[chats])









    return (
        <div className="messagePage_right">
            <div className="messagePage_right_up">
                <div className="messagePage_right_up_left">
                    <Avatar sx={{width:"23px", height:"23px"}} src={session[other+'Avatar']}/>&nbsp;&nbsp;
                    {loginTime === '' ?
                        <div>
                            <div style={{fontSize:"1.1rem"}}><b>{session[other+'Name']}</b></div>
                        </div>
                        :
                        <div>
                            <div style={{fontSize:"1.1rem"}}><b>{session[other+'Name']}</b></div>
                            <div style={{fontSize:"0.8rem", color:"rgb(143,143,143)"}}>{`Active ${timeAgo.format(new Date(loginTime))}`}</div>
                        </div>
                    }
                </div>
                <div className="messagePage_right_up_right">
                    <div><BsTelephone/></div>
                    <div style={{fontSize:"1.6rem", marginTop:"0.3rem"}}><BsCameraVideo/></div>
                    <div><BsInfoCircle/></div>
                </div>
            </div>
            <div className="messagePage_right_down">
                <div className="messagePage_right_down_chat">

                    {
                        chats.map((chat, index) => (
                            <>
                                {userInfo.userId === chat.userId ?
                                    <div className="messagePage_right_down_chatDetail">
                                        <div className="messagePage_time">{chat.chatTimestamp}</div>
                                        <div className="messagePage_self">
                                            <div className="box_self">
                                                {chat.chatContent}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="messagePage_right_down_chatDetail">
                                        <div className="messagePage_time">{chat.chatTimestamp}</div>
                                        <div className="messagePage_counterpart">
                                            <Avatar sx={{width:"25px", height:"25px"}} src={session[other+'Avatar']}/>
                                            <div className="box_other">
                                                {chat.chatContent}
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        ))
                    }

                </div>
                <div className="messagePage_right_down_text">
                    <div className="messagePage_right_down_border">
                        <div className="postCard_comment">
                            <div className="postCard_commentEmoji">
                                <FaRegSmile style={{fontSize:"1.5rem",fontWeight:"bold"}}/>
                                <input type="text" value={commentInput} placeholder="Message..." className="postCard_commentInput" onChange={event => setCommentInput(event.target.value)}/>
                            </div>
                            {
                                commentInput === ''?
                                    <button className="postCard_commentButtonCannotPost">Send</button>
                                    :
                                    <button className="postCard_commentButtonCanPost" onClick={() => {
                                        alert(commentInput);
                                        setCommentInput("");
                                    }}>Send</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetail;