import React, {useEffect, useState} from 'react';
import "./ThreeDots.css"
import {useDispatch, useSelector} from "react-redux";
import {allowScroll,disableScroll} from "../../../redux/scrollSlice";
import {useNavigate} from "react-router-dom";
import {checkIsFollowing, followUser, savePost, unSavePost} from "../../../api";
import {updateCheck} from "../../../redux/followSlice";

const ThreeDots = ({setThreeDots, setUnfollow, setDisplay}) => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {postInfo} = useSelector(state => state.post);
    const userInfo = useSelector(state => state.user)

    const [following, setFollowing] = useState(false);
    const [checkNeeded, setCheckNeeded] = useState(false);

    const check = async () => {
        console.log({followerId: userInfo.userId, followeeId:postInfo.userId})
        const res = await checkIsFollowing({followerId: userInfo.userId, followeeId:postInfo.userId})
        setFollowing(res.data)
    }


    useEffect(() => {
        if(userInfo){
            check();
        }
    },[userInfo.userId])


    return (
        <div className="threeDots_container" onClick={
            () => {
                setThreeDots(false)
                dispatch(allowScroll())
            }
        }>
            <div className="threeDots_main" onClick={event => event.stopPropagation()}>
                {/*<div onClick={() => {alert("This functionality has not been implemented yet.")}}>Report</div>*/}
                {following?
                    <div onClick={() => {
                        setThreeDots(false);
                        setUnfollow(true);
                    }}>Unfollow</div>
                    :
                    <div onClick={async () => {
                        await followUser({
                            followerId: userInfo.userId,
                            followeeId: postInfo.userId,
                            followTimestamp: new Date().toISOString()
                        })
                        setThreeDots(false)
                    }
                    }>Follow</div>
                }


                <div onClick={() => {
                    setThreeDots(false);
                    // setDisplay(true);
                    // console.log(postInfo)
                    navigate(`/p/${postInfo.postId}`)
                }}>Go to post</div>
                {/*<div>Share to...</div>*/}
                <div onClick={async () => {
                    await navigator.clipboard.writeText(`${window.location.href}p/${postInfo.postId}`)
                    setThreeDots(false)
                    alert("Link copied to clipboard.")
                }}>Copy link</div>
                {/*<div>Embed</div>*/}
                <div onClick={() => {
                    setThreeDots(false)
                }}>Cancel</div>
            </div>
        </div>
    );
};

export default ThreeDots;