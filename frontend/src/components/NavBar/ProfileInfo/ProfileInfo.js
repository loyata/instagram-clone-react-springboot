import React from 'react';
import "./ProfileInfo.css"
import {FaRegUserCircle} from "react-icons/fa";
import {BsGearWide, BsBookmark} from "react-icons/bs";
import {HiSwitchHorizontal} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateStateSimple, closeShowProfile} from "../../../redux/navbarStatusSlice"

const ProfileInfo = () => {

    const {navbarStatus, navbarCache} = useSelector(state => state.navbarStatus);

    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user);

    const userName = userInfo.userName;

    const navigate = useNavigate();

    const handleClick = (name) => {
        return () => {
            if(name === 'Profile') {
                navigate(`/${userName}`);
                dispatch(updateStateSimple('profile'));
                dispatch(closeShowProfile());
            }
            else if(name === 'Saved') navigate(`/${userName}/saved`);
            else if(name === 'Settings') navigate(`/accounts/edit`);
            else if(name === 'Logout') {
                localStorage.clear();
                window.location.href = '/';
            }
            else alert(`Navigating to ${name}`);
        }
    }

    return (
        <div className="profileInfo_container" onClick={e=>e.nativeEvent.stopImmediatePropagation()}>
            <ul className="profileInfo_ul">
                <li className="profileInfo_li" onClick={handleClick("Profile")}>
                    <FaRegUserCircle/>
                    <span className="profileInfo_1">Profile</span>
                </li>
                <li  className="profileInfo_li"onClick={handleClick("Saved")}>
                    <BsBookmark/>
                    <span className="profileInfo_1">Saved</span>
                </li>
                <li  className="profileInfo_li" onClick={handleClick("Settings")}>
                    <BsGearWide/>
                    <span className="profileInfo_1">Settings</span>
                </li>
                <li className="profileInfo_li" onClick={handleClick("Switch")}>
                    <HiSwitchHorizontal/>
                    <span style={{display:"inline"}} className="profileInfo_1">Switch accounts</span>
                </li>
                <hr/>
                <li className="profileInfo_li" onClick={handleClick("Logout")}>
                    Log out
                </li>
            </ul>
        </div>
    );
};

export default ProfileInfo;