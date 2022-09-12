import React, {useState} from 'react';
import "./Display.css"
import "../MainContent/PostCard/PostCard.css"

import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
import {Avatar} from "@mui/material";
import {BsChat, BsEmojiSmileUpsideDown, BsHeart, BsThreeDots} from "react-icons/bs";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {RiBookmarkLine} from "react-icons/ri";
import {GrClose} from "react-icons/gr"
import {useSelector} from "react-redux";

const Display = ({setDisplay}) => {


    const userInfo = useSelector(state => state.user);

    const posts = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        }
    ];

    const [commentInput, setCommentInput] = useState("");

    return (
        <div className="display_container" onClick={() => {
            setDisplay(false)
        }}>

            <div className="display_close"><GrClose/></div>

            <div className="display_nav" onClick={(e) => {
                e.stopPropagation();
            }}>
                <AiOutlineLeft/>
            </div>

            <div className="display_card" onClick={(e) => {
                e.stopPropagation();
            }}>

                <div className="display_card_left">
                    <img src={posts[0].img} width="100%"/>
                </div>

                <div className="display_card_right">

                    <div className="display_card_right_up">
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
                        <hr/>
                    </div>





                    <div className="display_card_right_middle">

                        <div className="display_comment">
                            <Avatar sx={{height:"35px", width:"35px"}}/>
                            <div>
                                <div className="display_all">
                                    <b>Username</b>    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque doloremque exercitationem fuga ipsum itaque laborum molestias perspiciatis porro possimus quo ratione, saepe sapiente, sequi suscipit tempore ullam veritatis. Consectetur!
                                    <div className="display_reply">
                                        <div>2w</div>
                                        <div><b>1 like</b></div>
                                        <div><b>Reply</b></div>
                                        {/*<div><b>See Translation</b></div>*/}
                                        <div className="display_3dots"><BsThreeDots/></div>
                                    </div>
                                </div>
                            </div>
                            <BsHeart style={{fontSize:"0.8rem", marginTop:"0.8rem", width:"60px"}}/>
                        </div>




                    </div>


                    <div className="display_card_right_down">
                        <hr/>
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




                </div>
            </div>

            <div className="display_nav" onClick={(e) => {
                e.stopPropagation();
            }}>
                <AiOutlineRight/>
            </div>

        </div>
    );
};

export default Display;