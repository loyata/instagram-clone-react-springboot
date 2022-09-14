import React from 'react';
import "./SeeAll.css"
import Avatar from "@mui/material/Avatar";
import {followUser, unfollowUser} from "../../../api";
import {useSelector} from "react-redux";

const SeeAll = () => {

    const {suggestions} = useSelector(state => state.suggestion)


    return (
        <div className="seeAll_ct">
            <div style={{marginTop:"5rem"}}>

                <div style={{fontSize:"1.2rem", margin:"0.5rem", fontWeight:"bold"}}>Suggested</div>


                {suggestions.map((suggestion, index) => (
                    <div className="seeAll_list" key={index}>
                        <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                            <div style={{display:"flex", alignItems:"center"}}>
                                <Avatar sx={{height:"45px", width:"45px"}} />
                                <div style={{marginLeft:"0.5rem"}}>
                                    <div style={{fontSize:"0.9rem", fontWeight:"700"}}>Username</div>
                                    <div style={{color:"rgb(160,160,160)", fontSize:"0.85em", fontWeight:"600",whiteSpace:"nowrap", maxWidth:"210px"}}>mutual friends</div>
                                </div>
                            </div>
                            {/*<button className="seeAll_followButton" style={{color:"black"}}>Following</button>*/}
                            <button className="seeAll_followButton" style={{color:"white", backgroundColor:"rgb(65,147,239)"}}>Follow</button>
                        </div>
                    </div>
                ))}







            </div>
        </div>
    );
};

export default SeeAll;