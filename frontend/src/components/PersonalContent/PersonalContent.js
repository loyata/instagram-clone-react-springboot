import React, {useEffect, useState} from 'react';
import "./PersonalContent.css"
import {Avatar, Container, Grid, ImageList, ImageListItem} from "@mui/material";
import {BsGearWide} from "react-icons/bs"

import {BsGrid3X3, BsBookmarkStar, BsFileEarmarkPerson, BsFillChatFill, BsFillHeartFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux";
import {
    checkIsFollowing, createSession,
    followUser,
    getFolloweesById,
    getFollowersById,
    getPostsById,
    getPostsByName, getSavedPostsByUserId,
    getUserByName,
    unfollowUser
} from "../../api";
import {Routes, useNavigate, Route, useLocation} from "react-router-dom";
import Display from "../Display/Display";

import {checkUserName} from "../../api";
import NotFound from "../NotFound/NotFound";
import Footer from "../LoginPage/Footer/Footer";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {BsPersonCheckFill} from "react-icons/bs";

import { v4 as uuidv4 } from 'uuid';


import PersonalPosts from "./PersonalPosts/PersonalPosts";


import {closeShowProfile, updateProfile, updateStateSimple} from "../../redux/navbarStatusSlice";
import {updatePost} from "../../redux/postSlice";
import {cancelUnfollow} from "../../redux/followSlice";



const PersonalContent = ({setDisplay, userName, display, setUnfollow}) => {

    const [tag, setTag] = useState(0);

    const location = useLocation();
    const {from, pathname} = location;


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.user);

    const [otherUser, setOtherUser] = useState({});

    const [allPosts, setAllPosts] = useState([]);
    const [allSavedPosts, setAllSavedPosts] = useState([]);

    const [follow, setFollow] = useState(false);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const [check, setCheck] = useState(true)
    
    const {userDidUnfollowed} = useSelector(state=>state.follow)


    useEffect(() => {
        console.log(userDidUnfollowed)
    },[userDidUnfollowed])


    /**
     * 0 self
     * 1 other user
     * 2 no such user in the database
     */
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        dispatch(updateStateSimple('profile'));
        dispatch(closeShowProfile());
    },[])

    useEffect(() => {
        const checkUserNameAsync = async () => {
            if(userName.toLowerCase() === userInfo.userName.toLowerCase()) {
                setUserType(0);
                getPostsById(userInfo.userId).then((res)=>{
                    setAllPosts(res.data)
                })

                getSavedPostsByUserId(userInfo.userId).then((res)=>{
                    setAllSavedPosts(res.data)
                })


                getFollowersById(userInfo.userId).then(res => {
                    setFollowers(res.data.map(follower => follower.followerId))
                })

                getFolloweesById(userInfo.userId).then(res => {
                    setFollowings(res.data.map(followee => followee.followerId))
                })

            }
            else{
                const response = await checkUserName(userName)
                if(response.data === true) {
                    setUserType(2);
                }
                else {
                    setUserType(1);
                    const user = await getUserByName(userName)
                    setOtherUser(user.data)
                    const userId = user.data.userId
                    getPostsById(userId).then((res)=>{
                        setAllPosts(res.data)
                    })

                    getSavedPostsByUserId(userId).then((res)=>{
                        setAllSavedPosts(res.data)
                    })

                    getFollowersById(userId).then(res => {
                        setFollowers(res.data.map(follower => follower.followerId))
                    })

                    getFolloweesById(userId).then(res => {
                        setFollowings(res.data.map(followee => followee.followerId))
                    })

                    checkIsFollowing({followerId:userInfo.userId, followeeId:userId}).then((res) => {
                        setFollow(res.data)
                    })

                    dispatch(updatePost({...otherUser}));

                }
            }
        }
        if (userInfo.userName) checkUserNameAsync();
    },[userName, userInfo, follow, display, userDidUnfollowed])



    if(userType === 2) return <NotFound/>;

    return (
        <div style={{position:"relative"}}>
                <Container maxWidth="md">
                    <div className="personalContent_info">
                        <Avatar sx={{width:"135px", height:"135px"}} src={userType === 0 ? userInfo.avatar : otherUser.avatar}/>
                        <div className="personalContent_des">
                            <div className="personalContent_line1">
                                <div>{userName}</div>

                                {userType === 0 ?
                                    <div style={{display:"flex"}}>
                                        <div className="personalContent_button" onClick={() => {
                                            navigate("/accounts/edit")
                                        }}>Edit Profile</div>
                                        <BsGearWide className="personalContent_gear"/>
                                    </div>
                                    :
                                    <div style={{display:"flex"}}>
                                        <div className="personalContent_button" onClick={async () => {
                                            const uuId = uuidv4();
                                            const formData = {
                                                sessionId:uuId,
                                                userAId:userInfo.userId,
                                                userAName:userInfo.userName,
                                                userAAvatar:userInfo.avatar,
                                                userBId:otherUser.userId,
                                                userBName:otherUser.userName,
                                                userBAvatar:otherUser.avatar,
                                                sessionTimestamp:new Date().toISOString(),
                                            }
                                            await createSession(formData);
                                            navigate(`/direct/t/${uuId}`)
                                        }
                                        }>Message</div>
                                        {
                                            follow === false ?
                                                <div className="personalContent_button2" onClick={async () => {
                                                    setFollow(true)
                                                    const formData = {
                                                        followerId: userInfo.userId,
                                                        followeeId: otherUser.userId,
                                                        followTimestamp: new Date().toISOString()
                                                    }
                                                    await followUser(formData);
                                                    dispatch(cancelUnfollow())
                                                }
                                                }>Follow</div>
                                                :
                                                <div className="personalContent_button"
                                                     onClick={async () => {
                                                         setUnfollow(true)
                                                     }
                                                }>
                                                    <div style={{transform:"translate(0, 4px) scale(1.5)"}}>
                                                        <BsPersonCheckFill/>
                                                    </div>
                                                </div>
                                        }
                                        <div className="personalContent_dot">
                                            <HiOutlineDotsHorizontal/>
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className="personalContent_line2">
                                <div><b>{allPosts.length}</b> posts</div>
                                <div><b>{followers.length}</b> followers</div>
                                <div><b>{followings.length}</b> following</div>
                            </div>
                            <div className="personalContent_line3">{userType === 0 ? userInfo.fullName : otherUser.fullName}</div>
                        </div>
                    </div>

                    <div className="personalContent_selectionTool">
                        <hr className="personalContent_divider"/>
                        <div className="personalContent_selection">
                            <div className={"personalContent_tag".concat(tag === 0 ? " selected":"")} onClick={() => {
                                setTag(0);
                                navigate(`/${userName}`)

                            }}>
                                <BsGrid3X3/>&nbsp;&nbsp;
                                <div>POSTS</div>
                            </div>
                            <div className={"personalContent_tag".concat(tag === 1 ? " selected":"")} onClick={() => {
                                setTag(1);
                                navigate(`/${userName}/saved`)

                            }}>
                                <BsBookmarkStar/>&nbsp;&nbsp;
                                <div>SAVED</div>
                            </div>
                            {userType === 0 ?
                                <div className={"personalContent_tag".concat(tag === 2 ? " selected":"")} onClick={() => {setTag(2);}}>
                                    <BsFileEarmarkPerson/>&nbsp;&nbsp;
                                    <div>TAGGED</div>
                                </div>
                                :
                                <div/>
                            }

                        </div>
                    </div>


                    <Routes>
                        <Route path="/" element={<PersonalPosts allPosts={allPosts} setDisplay={setDisplay} userType={userType} userInfo={userInfo} otherUser={otherUser}/>}/>
                        <Route path="/saved" element={<PersonalPosts allPosts={allSavedPosts} setDisplay={setDisplay} userType={userType} userInfo={userInfo} otherUser={otherUser}/>}/>
                    </Routes>



                </Container>
            </div>


    );
};

export default PersonalContent;