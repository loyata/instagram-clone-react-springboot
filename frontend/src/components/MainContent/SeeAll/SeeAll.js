import React from 'react';
import "./SeeAll.css"
import Avatar from "@mui/material/Avatar";
import {followUser, unfollowUser} from "../../../api";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setText} from "../SuggestionCard/SuggestionCard";
import Footer from "../../LoginPage/Footer/Footer";
import {updateSuggestionFollow} from "../../../redux/suggestionSlice";

const SeeAll = () => {

    const {suggestions} = useSelector(state => state.suggestion)
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div>
            <div className="seeAll_ct">
                <div style={{marginTop:"5rem"}}>
                    <div style={{fontSize:"1.2rem", margin:"0.5rem", fontWeight:"bold"}}>Suggested</div>
                    {suggestions.map((suggestion, index) => (
                        <div className="seeAll_list" key={index}>
                            <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                                <div style={{display:"flex", alignItems:"center"}}>
                                    <Avatar sx={{height:"45px", width:"45px"}} src={suggestion.userAvatar} onClick={() => navigate(`/${suggestion.userName}`)}/>
                                    <div style={{marginLeft:"0.5rem"}}>
                                        <div style={{fontSize:"0.9rem", fontWeight:"700"}} onClick={() => navigate(`/${suggestion.userName}`)}>{suggestion.userName}</div>
                                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em", fontWeight:"600",whiteSpace:"nowrap", maxWidth:"420px"}}>{setText(suggestion.mutual)}</div>
                                    </div>
                                </div>

                                <div onClick={() => {
                                    const payload = {index, st:suggestions[index]['followed']}
                                    dispatch(updateSuggestionFollow(payload));
                                }}>
                                    {suggestion.followed?
                                        <button className="seeAll_followButton" style={{color:"black"}} onClick={async () => {
                                            const formData = {
                                                followerId: userInfo.userId,
                                                followeeId: suggestion.userId,
                                            }
                                            await unfollowUser(formData);
                                        }
                                        }>Following</button>
                                        :
                                        <button className="seeAll_followButton" style={{color:"white", backgroundColor:"rgb(65,147,239)"}} onClick={async () => {
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

                            </div>
                        </div>
                    ))}
                </div>
                <div style={{fontSize:"0.8rem"}}>
                    <Footer/>
                </div>
            </div>

        </div>

    );
};

export default SeeAll;