import React from 'react';
import "./ThreeDots.css"
import {useDispatch, useSelector} from "react-redux";
import {allowScroll,disableScroll} from "../../../redux/scrollSlice";
import {useNavigate} from "react-router-dom";

const ThreeDots = ({setThreeDots, setUnfollow, setDisplay}) => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {postInfo} = useSelector(state => state.post);

    return (
        <div className="threeDots_container" onClick={
            () => {
                setThreeDots(false)
                dispatch(allowScroll())
            }
        }>
            <div className="threeDots_main" onClick={event => event.stopPropagation()}>
                {/*<div onClick={() => {alert("This functionality has not been implemented yet.")}}>Report</div>*/}
                <div onClick={() => {
                    setThreeDots(false);
                    setUnfollow(true);
                }}>Unfollow</div>
                <div>Add to Favorites</div>
                <div onClick={() => {
                    setThreeDots(false);
                    // setDisplay(true);
                    // console.log(postInfo)
                    navigate(`/p/${postInfo.postId}`)

                }}>Go to post</div>
                {/*<div>Share to...</div>*/}
                <div onClick={() => {
                    navigator.clipboard.writeText(`${window.location.href}p/${postInfo.postId}`)
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