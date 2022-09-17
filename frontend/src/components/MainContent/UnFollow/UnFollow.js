import React from 'react';
import "./Unfollow.css"
import {Avatar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {unfollowUser} from "../../../api";
import {unfollow} from "../../../redux/followSlice";

const UnFollow = ({setUnfollow}) => {

    const {postInfo, postUserInfo} = useSelector(state => state.post);
    const userInfo = useSelector(state => state.user);

    const dispatch = useDispatch();

    return (
        <div className="unfollow_container" onClick={()=>{setUnfollow(false)}}>
            <div className="unfollow_main" onClick={(event)=>{event.stopPropagation()}}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    padding:"2rem",
                    gap:"1.5rem"
                }}>
                    <Avatar sx={{width:"90px", height:"90px"}} src={postUserInfo.avatar || postInfo.avatar}/>
                    <div>{`Leave @${postUserInfo.userName || postInfo.userName}`}</div>
                </div>
                <div className="unfollow_selections">
                    <div onClick={async () => {
                        const formData = {
                            followerId: userInfo.userId,
                            followeeId: postUserInfo.userId || postInfo.userId,
                        }
                        console.log(formData)
                        await unfollowUser(formData);
                        setUnfollow(false);
                        dispatch(unfollow());

                    }}>Unfollow</div>
                    <div onClick={() => {
                        setUnfollow(false);
                    }}>Cancel</div>
                </div>
            </div>
        </div>
    );
};

export default UnFollow;