import React, {useEffect, useState} from 'react';
import "./Profile.css"
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import {getUserByName} from "../../../api";
import {useNavigate} from "react-router-dom";

const Profile = ({setSwitchAccount}) => {

    const {userName} = useSelector(state => state.user);

    const [userInfo, setUserInfo] = useState({});

    const navigate = useNavigate();

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
                <Avatar sx={{width:"55px", height:"55px"}} src={userInfo.avatar} onClick={() => {
                    navigate(`/${userInfo.userName}`)
                }}/>
                <span className="profile_id">
                    <div onClick={() => {
                        navigate(`/${userInfo.userName}`)
                    }}>{userName}</div>
                    <div style={{color:"rgb(160,160,160)"}}>{userInfo.fullName}</div>
                </span>
            </div>

            <button className="profile_switchButton" onClick={() => {
                setSwitchAccount(true)
            }}>Switch</button>
        </div>
    );
};

export default Profile;