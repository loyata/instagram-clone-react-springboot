import React from 'react';
import "./SuggestionCard.css"
import Avatar from "@mui/material/Avatar";

const SuggestionCard = () => {
    return (
        <div className="suggestionCard_container">
            <div className="suggestionCard_title">
                <div style={{color:"rgb(142,142,142)", fontWeight:"bolder"}}>Suggestions For You</div>
                <button className="suggestionCard_seeAllButton">See All</button>
            </div>

            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>
            <div className="suggestionCard_suggestions">
                <div className="suggestionCard_names">
                    <Avatar sx={{height:"35px", width:"35px"}}/>
                    <span className="suggestionCard_id">
                        <div>username</div>
                        <div style={{color:"rgb(160,160,160)", fontSize:"0.8em"}}>Followed by ??? + ? more</div>
                </span>
                </div>
                <button className="suggestionCard_followButton">Follow</button>
            </div>

        </div>
    );
};

export default SuggestionCard;