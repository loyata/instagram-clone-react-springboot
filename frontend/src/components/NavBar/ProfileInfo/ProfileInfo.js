import React from 'react';
import "./ProfileInfo.css"
import {FaRegUserCircle} from "react-icons/fa";
import {BsGearWide, BsBookmark} from "react-icons/bs";
import {HiSwitchHorizontal} from "react-icons/hi";


const ProfileInfo = () => {

    const handleClick = (name) => {
        return () => {
            alert(`Navigating to ${name}`)
        }
    }

    return (
        <div className="profileInfo_container" onClick={e=>e.nativeEvent.stopImmediatePropagation()}>
            <ul className="profileInfo_ul">
                <li onClick={handleClick("Profile")}>
                    <FaRegUserCircle/>
                    <span>Profile</span>
                </li>
                <li onClick={handleClick("Saved")}>
                    <BsBookmark/>
                    <span>Saved</span>
                </li>
                <li onClick={handleClick("Settings")}>
                    <BsGearWide/>
                    <span>Settings</span>
                </li>
                <li onClick={handleClick("Switch")}>
                    <HiSwitchHorizontal/>
                    <span style={{display:"inline"}}>Switch accounts</span>
                </li>
                <hr/>
                <li onClick={handleClick("Logout")}>
                    Log out
                </li>
            </ul>
        </div>
    );
};

export default ProfileInfo;