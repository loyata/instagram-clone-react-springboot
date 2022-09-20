import React, {useEffect, useState} from 'react';
import "./SuggestionCard.css"
import Avatar from "@mui/material/Avatar";
import {followUser, getMutualFollowsByUserId, getRandomUsers, unfollowUser} from "../../../api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {updateSuggestion, updateSuggestionFollow} from "../../../redux/suggestionSlice";


export const setText = function(mutual){
    if(mutual.length == 1) return <div style={{textOverflow:"ellipsis", overflow:"hidden"}}>Followed by <b>{mutual[0].userName}</b></div>
    else if(mutual.length == 2) return <div style={{textOverflow:"ellipsis", overflow:"hidden"}}>Followed by <b>{mutual[0].userName}</b>, <b>{mutual[1].userName}</b></div>
    else return <div style={{textOverflow:"ellipsis", overflow:"hidden"}}>Followed by <b>{mutual[0].userName}</b>, <b>{mutual[1].userName}</b> +{mutual.length - 2} more</div>
}

const SuggestionCard = () => {

    const dispatch = useDispatch()

    const {suggestions} = useSelector(state => state.suggestion)
    const [friendsSuggestion, setFriendsSuggestion] = useState([]);



    const userInfo = useSelector(state => state.user);

    const navigate = useNavigate();


    const getRandomSuggestions = async () => {
        const res = await getMutualFollowsByUserId(userInfo.userId)
        if(res.data.length > 0) {
            // setFriendsSuggestion(res.data.map(suggest => ({...suggest, followed:false})))
            dispatch(updateSuggestion(res.data.map(suggest => ({...suggest, followed:false}))))
        }
    }

    useEffect(() => {
        if(userInfo.userId) getRandomSuggestions();
    },[userInfo])





    return (
        <div className="suggestionCard_container" style={{display:`${suggestions.length === 0 ? 'none' : 'block'}`}}>
            <div className="suggestionCard_title">
                <div style={{color:"rgb(142,142,142)", fontWeight:"bolder"}}>Suggestions For You</div>
                <button className="suggestionCard_seeAllButton" onClick={() =>{
                    navigate("/explore/people")
                }}>See All</button>
            </div>

            {suggestions.slice(0,5).map((suggestion, index) => (
                <div className="suggestionCard_suggestions" key={index}>
                    <div className="suggestionCard_names">
                        <Avatar sx={{height:"35px", width:"35px"}} src={suggestion.userAvatar} onClick={() => navigate(`/${suggestion.userName}`)}/>
                        <span className="suggestionCard_id">
                        <div style={{fontSize:"0.8rem", fontWeight:"700"}} className="suggestionCard_userName" onClick={() => navigate(`/${suggestion.userName}`)}>{suggestion.userName}</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.75em", fontWeight:"600",whiteSpace:"nowrap", maxWidth:"210px"}}>{setText(suggestion.mutual)}</div>
                        </span>
                    </div>
                    <div onClick={() =>
                        {
                            const payload = {index, st:suggestions[index]['followed']}
                            dispatch(updateSuggestionFollow(payload));
                        }
                    }
                    >
                        {suggestion.followed?
                            <button className="suggestionCard_followButton" style={{color:"black"}} onClick={async () => {
                                const formData = {
                                    followerId: userInfo.userId,
                                    followeeId: suggestion.userId,
                                }
                                await unfollowUser(formData);
                            }
                            }>Following</button>
                            :
                            <button className="suggestionCard_followButton" onClick={async ()=>{
                                const formData = {
                                    followerId: userInfo.userId,
                                    followeeId: suggestion.userId,
                                    followTimestamp: new Date().toISOString()
                                }
                                await followUser(formData);
                            }
                            }>Follow</button>
                        }
                    </div>

                </div >
            ))}




        </div>
    );
};

export default SuggestionCard;

