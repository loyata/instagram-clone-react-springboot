import React, {useEffect, useState} from 'react';
import "./Profile.css"
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import {getUserByName} from "../../../api";

const Profile = () => {

    const {userName} = useSelector(state => state.user);

    const [userInfo, setUserInfo] = useState({});


    useEffect(() => {
        if(userName){
            const test = async () => {
                const res = await getUserByName(userName)
                setUserInfo(res.data);
            }
            test()
        }
    },[userName])



    return (
        <div className="profile_Container">

            <div className="profile_names">
                <Avatar sx={{width:"55px", height:"55px"}} src={userInfo.avatar}/>
                <span className="profile_id">
                    <div>{userName}</div>
                    <div style={{color:"rgb(160,160,160)"}}>{userInfo.fullName}</div>
                </span>
            </div>

            <button className="profile_switchButton">Switch</button>
        </div>
    );
};

export default Profile;