import React, {useEffect, useState} from 'react';
import "./Display.css"
import "../MainContent/PostCard/PostCard.css"

import {AiOutlineLeft, AiOutlineRight, AiOutlineSmile} from "react-icons/ai"
import {Avatar} from "@mui/material";
import {BsChat, BsHeart, BsHeartFill, BsThreeDots} from "react-icons/bs";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {RiBookmarkLine, RiBookmarkFill} from "react-icons/ri";
import {GrClose} from "react-icons/gr"
import {useSelector} from "react-redux";

import Picker from 'emoji-picker-react'

import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
import {
    checkIsLiked,
    checkIsSaved,
    comment,
    fetchCommentsByPostId,
    followUser, getLikesByPostId,
    likePost, savePost,
    unlikePost,
    unSavePost
} from "../../api";
import {useNavigate} from "react-router-dom";



const Display = ({setDisplay}) => {




    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const userInfo = useSelector(state => state.user);
    const {postInfo} = useSelector(state => state.post);
    const [commentInput, setCommentInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [comments, setComments] = useState([]);

    const [liked, setLiked] = useState(false);
    const [allLikes, setAllLikes] = useState([]);

    const [saved, setSaved] = useState(false);

    const navigate = useNavigate();


    const fetchComments = async ()=>{
        if(postInfo.postId){
            const res = await fetchCommentsByPostId(postInfo.postId)
            setComments(res.data)
        }
    }

    const fetchLikes = async ()=>{
        if(postInfo.postId){
            const res = await getLikesByPostId(postInfo.postId)
            console.log(res.data)
            setAllLikes(res.data)
        }
    }

    const checkLikeAndSave = async () => {
        if(postInfo.postId){
            const res = await checkIsLiked({userId: userInfo.userId, postId: postInfo.postId});
            const res2 = await checkIsSaved({userId: userInfo.userId, postId: postInfo.postId});
            setLiked(res.data);
            setSaved(res2.data);
        }
    }

    useEffect(() => {
        fetchComments();
        fetchLikes();
    },[])

    useEffect(() => {
        checkLikeAndSave();
    },[postInfo, liked, saved, allLikes])


    const showOtherLikes = () => {
        const len = allLikes.length;
        if (len === 0) return <div/>;
        else if(len === 1) return (
            <div className="postCard_like">
                <Avatar src={allLikes[0].userAvatar} sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;
                <span>Liked by <b>{allLikes[0].userName}</b></span>
            </div>
        )
        else {
            const rd = Math.floor(Math.random() * len);
            return (
                <div className="postCard_like">
                    <Avatar src={allLikes[0].userAvatar} sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;
                    <span>Liked by <b>{allLikes[0].userName}</b> and <b>others</b></span>
                </div>
            )
        }

    }

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
                    <img src={postInfo.imageUrl} width="100%"/>
                </div>

                <div className="display_card_right">

                    <div className="display_card_right_up">


                        <div className="postCard_header">
                            <div className="postCard_names">
                                <Avatar sx={{height:"35px", width:"35px"}} src={postInfo.avatar}/>
                                <span style={{marginLeft:"0.2rem"}}>
                                <div style={{fontSize:"16px", fontWeight:"bold"}}>{postInfo.userName}</div>
                                <div style={{fontSize:"12px"}}>{postInfo.postLocation}</div>
                            </span>
                            </div>
                            <BsThreeDots style={{fontSize:"1.2rem"}}/>
                        </div>
                        <hr/>
                    </div>


                    <div className="display_card_right_middle">

                        <div className="display_comment">
                                <Avatar sx={{height:"35px", width:"35px"}} src={postInfo.avatar}/>
                                <div>
                                    <div className="display_all">

                                        <div style={{fontSize:"0.9rem"}}><b>{postInfo.userName}</b>&nbsp;{postInfo.postCaption}</div>
                                        <div className="display_reply">
                                            {/*<div>{timeAgo.format(new Date(postInfo.postDate))}</div>*/}
                                        </div>
                                    </div>
                                </div>
                            {/*<BsHeart style={{fontSize:"0.8rem", marginTop:"0.8rem", width:"60px"}}/>*/}
                        </div>

                        {comments.map((comment, index) => (
                            <div className="display_comment" key={index}>
                                <Avatar sx={{height:"35px", width:"35px"}} src={comment.commenterAvatar}/>
                                <div>
                                    <div className="display_all">
                                        <div style={{fontSize:"0.9rem"}}><b>{comment.commenterName}</b>&nbsp;{comment.commentContent}</div>
                                        <div className="display_reply">
                                            {/*<div>{timeAgo.format(new Date(comment.commentTimestamp))}</div>*/}
                                        </div>
                                    </div>
                                </div>
                                {/*<BsHeart style={{fontSize:"0.8rem", marginTop:"0.8rem", width:"60px"}}/>*/}
                            </div>)
                        )}




                    </div>


                    <div className="display_card_right_down">
                        <hr/>
                        <div className="postCard_icon">

                            <div className="postCard_iconLeft">
                                <div onClick={() => {
                                    setLiked(!liked);
                                }}>
                                    {liked?
                                        <div style={{color:"red"}} onClick={ async () => {
                                            const formData = {
                                                userId: userInfo.userId,
                                                postId: postInfo.postId,
                                            }
                                            await unlikePost(formData)
                                        }
                                        }><BsHeartFill/></div> : <div onClick={ async () => {
                                            const formData = {
                                                userId: userInfo.userId,
                                                userName: userInfo.userName,
                                                userAvatar: userInfo.avatar,
                                                postId: postInfo.postId,
                                                likeTimestamp: new Date().toISOString()
                                            }
                                            await likePost(formData)
                                        }}><BsHeart/></div>}
                                </div>
                                <BsChat/>

                                <IoPaperPlaneOutline onClick={() => {
                                    setDisplay(false)
                                    navigate("/direct")
                                }}/>
                            </div>

                            {/*<BsThreeDots style={{fontSize:"1.2rem", position:"absolute", left:"50%"}}/>*/}

                            <div className="save"
                                onClick={() => {
                                setSaved(!saved)
                            }}>
                                {saved?
                                    <div onClick={async () => {
                                        const formData = {
                                            userId: userInfo.userId,
                                            postId: postInfo.postId,
                                        }
                                        await unSavePost(formData)
                                    }
                                    }><RiBookmarkFill/></div> : <div onClick={async () => {
                                        const formData = {
                                            userId: userInfo.userId,
                                            postId: postInfo.postId,
                                            saveTimestamp: new Date().toISOString()
                                        }
                                        await savePost(formData)
                                    }}><RiBookmarkLine/></div>}
                            </div>


                        </div>


                        {showOtherLikes()}
                        {/*<span style={{fontSize:"0.5rem", padding:"0 0.7rem 0.7rem 0.7rem", color:"rgb(158,158,158)",fontWeight:"bold"}}>{timeAgo.format(new Date(postInfo.postDate))}</span>*/}
                        <hr/>
                        <div className="postCard_comment">
                            <div className="postCard_commentEmoji">
                                <div style={{fontSize:"1.3rem"}}>
                                    <AiOutlineSmile onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEmoji(!showEmoji);
                                    }}/>
                                </div>

                                <div style={{position:"absolute", transform:"translate(0, -70%)", display:`${showEmoji ? "block" :"none"}`, userSelect:"none"}}>
                                    <Picker onEmojiClick={(event, emojiObject) => {
                                        setCommentInput(commentInput => commentInput += emojiObject.emoji);
                                    }}/>
                                </div>

                                <textarea rows={1} value={commentInput} placeholder="Add a comment..." className="postCard_commentInput" onChange={event => setCommentInput(event.target.value)}/>
                            </div>
                            {
                                commentInput === ''?
                                    <button className="postCard_commentButtonCannotPost">POST</button>
                                    :
                                    <button className="postCard_commentButtonCanPost" onClick={async () => {

                                        const postContent = {

                                            postId:postInfo.postId,
                                            commenterId:userInfo.userId,
                                            commenterName:userInfo.userName,
                                            commentContent:commentInput,
                                            commentTimestamp:new Date().toISOString(),
                                            commenterAvatar:userInfo.avatar
                                        }

                                        await comment(postContent);
                                        await fetchComments();

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