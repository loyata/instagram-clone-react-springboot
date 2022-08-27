import React, {useEffect, useState} from 'react';
import "./PostCard.css"
import {Avatar} from "@mui/material";
import {BsThreeDots} from "react-icons/bs"
import {BsHeart} from "react-icons/bs"
import {BsHeartFill} from "react-icons/bs"
import {BsChat} from "react-icons/bs"
import {BsEmojiSmileUpsideDown} from "react-icons/bs"
import {IoPaperPlaneOutline} from "react-icons/io5"
import {RiBookmarkFill} from "react-icons/ri"
import {RiBookmarkLine} from "react-icons/ri"

import links from "./images/links.png"

const PostCard = () => {

    const [commentInput, setCommentInput] = useState("");


    return (
        <div className="postCard_container">
            <div className="postCard_header">
                <div className="postCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span style={{marginLeft:"0.2rem"}}>
                        <div style={{fontSize:"16px", fontWeight:"bold"}}>UserName</div>
                        <div style={{fontSize:"12px"}}>location</div>
                    </span>
                </div>
                <BsThreeDots style={{fontSize:"1.2rem"}}/>
            </div>

            <img src={links} width="100%"/>

            <div className="postCard_icon">
                <div className="postCard_iconLeft">
                    <BsHeart/>
                    <BsChat/>
                    <IoPaperPlaneOutline/>
                </div>

                <BsThreeDots style={{fontSize:"1.2rem", position:"absolute", left:"50%"}}/>

                <RiBookmarkLine/>

            </div>
            <div className="postCard_like">
                <Avatar sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;
                <span>Liked by xxx and others</span>
            </div>
            <span style={{fontSize:"0.5rem", padding:"0 0.7rem 0.7rem 0.7rem", color:"rgb(158,158,158)",fontWeight:"bold"}}>2 HOURS AGO</span>
            <hr/>

            <div className="postCard_comment">
                <div className="postCard_commentEmoji">
                    <BsEmojiSmileUpsideDown style={{fontSize:"1.5rem",fontWeight:"bold"}}/>
                    <input type="text" value={commentInput} placeholder="Add a comment..." className="postCard_commentInput" onChange={event => setCommentInput(event.target.value)}/>
                </div>
                {
                    commentInput === ''?
                        <button className="postCard_commentButtonCannotPost">POST</button>
                        :
                        <button className="postCard_commentButtonCanPost" onClick={() => {
                            alert(commentInput);
                            setCommentInput("");
                        }}>POST</button>
                }
                </div>
        </div>
    );
};

export default PostCard;