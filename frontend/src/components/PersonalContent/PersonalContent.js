import React, {useEffect, useState} from 'react';
import "./PersonalContent.css"
import {Avatar, Container, Grid, ImageList, ImageListItem} from "@mui/material";
import {BsGearWide} from "react-icons/bs"

import {BsGrid3X3, BsBookmarkStar, BsFileEarmarkPerson, BsFillChatFill, BsFillHeartFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux";
import {
    checkIsFollowing,
    followUser,
    getFolloweesById,
    getFollowersById,
    getPostsById,
    getPostsByName,
    getUserByName,
    unfollowUser
} from "../../api";
import {useNavigate} from "react-router-dom";
import Display from "../Display/Display";

import {checkUserName} from "../../api";
import NotFound from "../NotFound/NotFound";
import Footer from "../LoginPage/Footer/Footer";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {BsPersonCheckFill} from "react-icons/bs";

import {updatePost} from "../../redux/postSlice";



const PersonalContent = ({setDisplay, userName, display}) => {

    const [tag, setTag] = useState(0);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.user);

    const [otherUser, setOtherUser] = useState({});

    const [allPosts, setAllPosts] = useState([]);

    const [follow, setFollow] = useState(false);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    

    /**
     * 0 self
     * 1 other user
     * 2 no such user in the database
     */
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        const checkUserNameAsync = async () => {
            if(userName.toLowerCase() === userInfo.userName.toLowerCase()) {
                setUserType(0);
                getPostsById(userInfo.userId).then((res)=>{
                    setAllPosts(res.data)
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


                    getFollowersById(userId).then(res => {
                        setFollowers(res.data.map(follower => follower.followerId))
                    })

                    getFolloweesById(userId).then(res => {
                        setFollowings(res.data.map(followee => followee.followerId))
                    })

                    checkIsFollowing({followerId:userInfo.userId, followeeId:userId}).then((res) => {
                        setFollow(res.data)
                    })

                }
            }
        }
        if (userInfo.userName) checkUserNameAsync();
    },[userName, userInfo, follow, display])



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
                                        <div className="personalContent_button">Message</div>
                                        {
                                            follow === false ?
                                                <div className="personalContent_button2" onClick={async () => {
                                                    setFollow(true)
                                                    const formData = {
                                                        followerId: userInfo.userId,
                                                        followeeId: otherUser.userId,
                                                        followTimestamp: new Date().toISOString()
                                                    }
                                                    const res = await followUser(formData);
                                                }
                                                }>Follow</div>
                                                :
                                                <div className="personalContent_button"
                                                     onClick={async () => {
                                                         setFollow(false)
                                                         const formData = {
                                                             followerId: userInfo.userId,
                                                             followeeId: otherUser.userId,
                                                         }
                                                         const res = await unfollowUser(formData);
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
                            <div className={"personalContent_tag".concat(tag === 0 ? " selected":"")} onClick={() => {setTag(0);}}>
                                <BsGrid3X3/>&nbsp;&nbsp;
                                <div>POSTS</div>
                            </div>
                            <div className={"personalContent_tag".concat(tag === 1 ? " selected":"")} onClick={() => {setTag(1);}}>
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


                    <ImageList sx={{ width: "100%"}} cols={3} gap={24}>
                        {allPosts.map((item) => (
                            <ImageListItem key={item.imageUrl} style={{position:"relative"}}>
                                <img
                                    src={`${item.imageUrl}?fit=crop&auto=format`}
                                    srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.postAlt}
                                    loading="lazy"
                                    className="personalContent_imageItem"
                                    onClick={() => {
                                        setDisplay(true)
                                        if(userType === 0) dispatch(updatePost({...item, ...userInfo}));
                                        else dispatch(updatePost({...item, ...otherUser}));
                                    }}
                                />
                                <div className="personalContent_iconDetails" >
                                    <span className="personalContent_ht"><BsFillHeartFill style={{marginTop:"2px"}}/>&nbsp;{item.postLikes}</span>
                                    <span className="personalContent_ct"><BsFillChatFill/>&nbsp;{item.postComments}</span>
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>



                </Container>
            </div>


    );
};

export default PersonalContent;