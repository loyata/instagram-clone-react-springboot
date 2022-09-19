import React, {useEffect, useState} from 'react';
import "./MessagePage.css"
import NavBar from "../NavBar/NavBar";
import {
    BsChevronDown,
    BsPencilSquare,
} from "react-icons/bs";
import {Avatar} from "@mui/material";
import {FaRegSmile} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import NewMessage from "./NewMessage/NewMessage";
import {fetchSessionsById} from "../../api";

import {Routes, Route, useNavigate} from "react-router-dom"
import Inbox from "./Inbox/Inbox";
import MessageDetail from "./MessageDetail/MessageDetail";
import {updateStateSimple} from "../../redux/navbarStatusSlice";


import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'



const MessagePage = ({setSwitchAccount}) => {


    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getDate = (updateTime) => {
        const spr = timeAgo.format(new Date(updateTime)).split(' ');
        return spr[0]+spr[1][0];
    }

    useEffect(() => {
        dispatch(updateStateSimple('message'))
    }, [])

    const [showNewMessage, setShowNewMessage] = useState(false);

    const [sessions, setSessions] = useState([]);

    const [selectedSession, setSelectedSession] = useState(-1);

    const [selectedSessionDetail, setSelectedSessionDetail] = useState({});



    const fetchSessions = async ()=>{
        if(userInfo.userId){
            const res = await fetchSessionsById(userInfo.userId);
            setSessions(res.data);
        }
    }

    useEffect(() => {
        fetchSessions();
    },[userInfo.userId])

    return (
        <div style={{height:"90vh", display:"flex", flexDirection:"column", position:"relative"}}>
            <div style={{zIndex:"20"}}>
                <Routes>
                    <Route path="new" element={<NewMessage setShowNewMessage={setShowNewMessage}/>}/>
                </Routes>
            </div>
            <div className="messagePage_container">
                <div className="messagePage_main">
                    <div className="messagePage_main2">
                        <div className="messagePage_left">
                            <div className="messagePage_left_up">
                                <div style={{marginLeft:"30%"}}><b>{userInfo.userName}</b></div>&nbsp;
                                <div className="messagePage_change" onClick={() => {
                                    setSwitchAccount(true)
                                }}><BsChevronDown/></div>
                                {/*<div className="messagePage_new_msg" onClick={() => {*/}
                                {/*    navigate('/direct/new')*/}
                                {/*    // setShowNewMessage(true)*/}
                                {/*}}><BsPencilSquare/></div>*/}
                            </div>
                            <div className="messagePage_left_down">
                                <div className="chat_session_container">

                                    {sessions.map((session, index) =>(
                                        <div style={{backgroundColor:`${selectedSession === index ? 'rgb(239,239,239)' :'unset'}`}} className="chat_session_containerContent" key={index} onClick={() => {
                                            setSelectedSession(index);
                                            setSelectedSessionDetail(session);
                                            navigate(`/direct/t/${session.sessionId}`)
                                        }}>
                                            <Avatar sx={{width:"50px", height:"50px"}} src={session.userAId  !== userInfo.userId ? session.userAAvatar : session.userBAvatar}/>&nbsp;&nbsp;
                                            {session.messageDigestion === null && session.updateTime === null ?
                                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                                    <div style={{marginTop:"0.3rem"}}>{session.userAId  !== userInfo.userId ? session.userAName : session.userBName || 'userName'}</div>
                                                </div>
                                                :
                                                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                                                    <div style={{marginTop:"0.3rem"}}>{session.userAId  !== userInfo.userId ? session.userAName : session.userBName || 'userName'}</div>
                                                    <div className="messagePage_summary" >
                                                        <div style={{width:"200px", overflow:"hidden", textOverflow:"ellipsis"}}>
                                                            {session.messageDigestion}
                                                        </div>
                                                        <span style={{width:"50px"}}>&nbsp;
                                                            · {getDate(session.updateTime)}
                                                </span>
                                                    </div>
                                                </div>
                                            }


                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Routes>
                            <Route path="inbox" element={<Inbox/>}/>
                            <Route path="t/:sessionId" element={<MessageDetail selectedSessionDetail={selectedSessionDetail}/>}/>
                        </Routes>



                    </div>
                </div>

            </div>
        </div>
    );
};

export default MessagePage;