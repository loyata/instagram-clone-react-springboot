import React, {useEffect, useState} from 'react';
import {Avatar} from "@mui/material";
import {BsCameraVideo, BsInfoCircle, BsTelephone} from "react-icons/bs";
import {FaRegSmile} from "react-icons/fa";

import "../MessagePage.css"
import {useSelector} from "react-redux";
import {createChat, getChatsBySessionId, getLoginTime, getSessionsBySessionId} from "../../../api";
import {useParams} from "react-router-dom";

import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

import moment from 'moment';
import Picker from "emoji-picker-react";

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
    const [showEmoji, setShowEmoji] = useState(false)
    const [messageState, setMessageState] = useState(false)
    const [timer, setTimer] = useState(0);


    useEffect(()=>{
        const temp = setInterval(() => {
            setTimer(timer => timer + 1 >= 4 ? 0 : timer + 1)
        },1000)
        return () => clearInterval(temp);
    }, []);

    useEffect(()=>{
        if(timer === 3) setMessageState(!messageState)
    },[timer])


    useEffect(() => {
        document.addEventListener('click', () => {
            setShowEmoji(false)
        })
    },[])


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
    },[sessionId, messageState])

    useEffect(() => {
        getChats()
    },[])






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
                                        <div className="messagePage_time">{moment(new Date(chat.chatTimestamp)).format("MMMM DD, YYYY h:mm a")}</div>
                                        <div className="messagePage_self">
                                            <div className="box_self">
                                                {chat.chatContent}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="messagePage_right_down_chatDetail">
                                        <div className="messagePage_time">{moment(new Date(chat.chatTimestamp)).format("MMMM DD, YYYY h:mm a")}</div>
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
                            <div style={{position:"absolute", transform:"translate(0, -60%)", display:`${showEmoji ? "block" :"none"}`, userSelect:"none"}} onClick={(e) => {
                                e.nativeEvent.stopImmediatePropagation();
                            }}>
                                <Picker
                                    onEmojiClick={(event, emojiObject) => {
                                    setCommentInput(commentInput => commentInput += emojiObject.emoji);
                                }}/>
                            </div>
                            <div className="postCard_commentEmoji">
                                <FaRegSmile style={{fontSize:"1.5rem",fontWeight:"bold"}} onClick={(e) => {
                                    e.nativeEvent.stopImmediatePropagation();
                                    setShowEmoji(!showEmoji)
                                }}/>
                                <input type="text"
                                       value={commentInput}
                                       placeholder="Message..."
                                       className="postCard_commentInput"
                                       onChange={event => setCommentInput(event.target.value)}/>
                            </div>
                            {
                                commentInput === ''?
                                    <button className="postCard_commentButtonCannotPost">Send</button>
                                    :
                                    <button className="postCard_commentButtonCanPost" onClick={async () => {
                                            const formData = {
                                                sessionId:sessionId,
                                                userId:userInfo.userId,
                                                chatContent:commentInput,
                                                chatTimestamp:new Date().toISOString()
                                            }
                                            await createChat(formData);
                                            setMessageState(!messageState);
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