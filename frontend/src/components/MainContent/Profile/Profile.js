import React from 'react';
import "./Profile.css"
import Avatar from "@mui/material/Avatar";

const Profile = () => {
    return (
        <div className="profile_Container">

            <div className="profile_names">
                <Avatar sx={{width:"55px", height:"55px"}}/>
                <span className="profile_id">
                    <div>username</div>
                    <div style={{color:"rgb(160,160,160)"}}>name</div>
                </span>
            </div>

            <button className="profile_switchButton">Switch</button>
        </div>
    );
};

export default Profile;