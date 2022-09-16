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


import Picker from 'emoji-picker-react'

import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'

import links from "./images/links.png"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    checkIsLiked, checkIsSaved,
    fetchCommentsByPostId,
    getLikesByPostId,
    likePost,
    savePost,
    unlikePost,
    unSavePost
} from "../../../api";
import {AiOutlineSmile} from "react-icons/ai";
import {updatePost} from "../../../redux/postSlice";
import {disableScroll} from "../../../redux/scrollSlice";
import {savePostUpdate, unSavePostUpdate, updateFormData} from "../../../redux/followSlice";

const PostCard = ({postInfo, setDisplay, setThreeDots}) => {

    const [commentInput, setCommentInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const dispatch = useDispatch()

    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const userInfo = useSelector(state => state.user);
    const {checkNeeded} = useSelector(state => state.follow)



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
            setAllLikes(res.data)
        }
    }

    const checkLikeAndSave = async () => {
        if(postInfo.postId){

            dispatch(updateFormData({
            userId: userInfo.userId,
            postId: postInfo.postId
        }))

            const res = await checkIsLiked({userId: userInfo.userId, postId: postInfo.postId});
            const res2 = await checkIsSaved({userId: userInfo.userId, postId: postInfo.postId});
            setLiked(res.data);
            setSaved(res2.data);
            if(res2.data === true) {
                dispatch(savePostUpdate())
            }
        }
    }

    useEffect(() => {
        fetchComments();
        fetchLikes();
    },[])

    useEffect(() => {
        console.log("carried")
        checkLikeAndSave();
    },[postInfo, liked, saved, allLikes, checkNeeded])


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
        <div className="postCard_container">
            <div className="postCard_header">
                <div className="postCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}} src={postInfo.userAvatar} onClick={() => {
                        navigate(`/${postInfo.userName}`)
                    }}/>
                    <span style={{marginLeft:"0.2rem"}}>
                        <div style={{fontSize:"16px", fontWeight:"bold"}} className="postCard_username" onClick={() => {
                            navigate(`/${postInfo.userName}`)
                        }}>{postInfo.userName}</div>
                        <div style={{fontSize:"12px"}}>{postInfo.postLocation || 'unknown location'}</div>
                    </span>
                </div>
                <BsThreeDots
                    style={{fontSize:"1.2rem"}} className="pc_threedots" onClick={() => {
                    setThreeDots(true)
                    dispatch(updatePost({...postInfo, avatar: postInfo.userAvatar}));
                    dispatch(disableScroll())
                }}/>
            </div>

            <img src={postInfo.imageUrl} width="100%" className="postCard_image" onClick={() => {
                // setDisplay(true)
                navigate(`/p/${postInfo.postId}`)
                dispatch(updatePost({...postInfo, avatar: postInfo.userAvatar}));
            }}/>

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
                                await unlikePost(formData);
                                fetchLikes();
                            }
                            }><BsHeartFill/></div> : <div onClick={ async () => {
                                const formData = {
                                    userId: userInfo.userId,
                                    userName: userInfo.userName,
                                    userAvatar: userInfo.avatar,
                                    postId: postInfo.postId,
                                    likeTimestamp: new Date().toISOString()
                                }
                                await likePost(formData);
                                fetchLikes();
                            }}><BsHeart/></div>}
                    </div>
                    <BsChat onClick={() => setDisplay(true)}/>

                    <IoPaperPlaneOutline onClick={() => {
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
                            dispatch(unSavePostUpdate())
                            dispatch(updateFormData({
                                userId: userInfo.userId,
                                postId: postInfo.postId
                            }))
                        }
                        }><RiBookmarkFill/></div> : <div onClick={async () => {
                            const formData = {
                                userId: userInfo.userId,
                                postId: postInfo.postId,
                                saveTimestamp: new Date().toISOString()
                            }
                            await savePost(formData)
                            dispatch(savePostUpdate())
                            dispatch(updateFormData({
                                userId: userInfo.userId,
                                postId: postInfo.postId
                            }))
                        }}><RiBookmarkLine/></div>}
                </div>

            </div>
            <div className="postCard_like">
                {/*<Avatar sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;*/}
                {/*<span>like</span>*/}
                {showOtherLikes()}
            </div>
            <span style={{fontSize:"0.7rem", padding:"0 0.7rem 0.7rem 0.7rem", color:"rgb(158,158,158)",fontWeight:"bold"}}>
                {timeAgo.format(new Date(postInfo.postDate))}</span>
            <hr/>

            <div className="postCard_comment">
                <div className="postCard_commentEmoji">
                    <div style={{position:"relative"}}>
                        <div style={{fontSize:"1.3rem"}}>
                            <AiOutlineSmile onClick={(e) => {
                                e.stopPropagation();
                                setShowEmoji(!showEmoji);
                            }}/>
                        </div>
                        <div style={{position:"absolute", transform:"translate(0, -110%)", display:`${showEmoji ? "block" :"none"}`, userSelect:"none"}}>
                            <Picker onEmojiClick={(event, emojiObject) => {
                                event.stopPropagation();
                                setCommentInput(commentInput => commentInput += emojiObject.emoji);
                            }}/>
                        </div>
                    </div>

                    <div>
                        <input type="text" value={commentInput} placeholder="Add a comment..." className="postCard_commentInput" onChange={event => setCommentInput(event.target.value)}/>
                    </div>
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