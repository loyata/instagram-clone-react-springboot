import React, {useState} from 'react';
import "./MessagePage.css"
import NavBar from "../NavBar/NavBar";
import {
    BsChevronDown,
    BsPencilSquare,
    BsTelephone,
    BsCameraVideo,
    BsInfoCircle,
    BsEmojiSmileUpsideDown
} from "react-icons/bs";
import {Avatar} from "@mui/material";
import {FaRegSmile} from "react-icons/fa";

const MessagePage = () => {

    const [commentInput, setCommentInput] = useState('');

    return (
        <div style={{height:"100vh", display:"flex", flexDirection:"column"}}>
            <div>
                <NavBar/>
            </div>
            <div className="messagePage_container">
                <div className="messagePage_main">
                    <div className="messagePage_main2">
                        <div className="messagePage_left">
                            <div className="messagePage_left_up">
                                <div style={{marginLeft:"30%"}}><b>user_name</b></div>&nbsp;
                                <div className="messagePage_change" onClick={() => {
                                    alert("function:ChangeUser")
                                }}><BsChevronDown/></div>
                                <div className="messagePage_new_msg" onClick={() => {
                                    alert("function:new msg")
                                }}><BsPencilSquare/></div>
                            </div>
                            <div className="messagePage_left_down">
                                <div className="chat_session_container">

                                    <div className="chat_session_containerContent contentSelected">
                                        <Avatar sx={{width:"50px", height:"50px"}}/>&nbsp;&nbsp;
                                        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                                            <div style={{marginTop:"0.3rem"}}>user_name</div>
                                            <div className="messagePage_summary" >
                                                <div style={{width:"200px", overflow:"hidden", textOverflow:"ellipsis"}}>
                                                    This is a test message digest that may overflow the length limit.
                                                </div>
                                                <span style={{width:"50px"}}>&nbsp;
                                                    · 14w
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat_session_containerContent">
                                        <Avatar sx={{width:"50px", height:"50px"}}/>&nbsp;&nbsp;
                                        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                                            <div style={{marginTop:"0.3rem"}}>user_name</div>
                                            <div className="messagePage_summary" >
                                                <div style={{width:"200px", overflow:"hidden", textOverflow:"ellipsis"}}>
                                                    This is a test message digest that may overflow the length limit.
                                                </div>
                                                <span style={{width:"50px"}}>&nbsp;
                                                    · 14w
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat_session_containerContent">
                                        <Avatar sx={{width:"50px", height:"50px"}}/>&nbsp;&nbsp;
                                        <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start"}}>
                                            <div style={{marginTop:"0.3rem"}}>user_name</div>
                                            <div className="messagePage_summary" >
                                                <div style={{width:"200px", overflow:"hidden", textOverflow:"ellipsis"}}>
                                                    This is a test message digest that may overflow the length limit.
                                                </div>
                                                <span style={{width:"50px"}}>&nbsp;
                                                    · 14w
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="messagePage_right">
                            <div className="messagePage_right_up">
                                <div className="messagePage_right_up_left">
                                    <Avatar sx={{width:"23px", height:"23px"}}/>&nbsp;&nbsp;
                                    <div>
                                        <div style={{fontSize:"1.1rem"}}><b>user_name</b></div>
                                        <div style={{fontSize:"0.8rem", color:"rgb(143,143,143)"}}>Active xx ago</div>
                                    </div>
                                </div>
                                <div className="messagePage_right_up_right">
                                    <div><BsTelephone/></div>
                                    <div style={{fontSize:"1.6rem", marginTop:"0.3rem"}}><BsCameraVideo/></div>
                                    <div><BsInfoCircle/></div>
                                </div>
                            </div>
                            <div className="messagePage_right_down">
                                <div className="messagePage_right_down_chat">

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
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MessagePage;