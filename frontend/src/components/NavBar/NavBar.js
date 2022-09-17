import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {updateStateSimple, updateStateOuter, updateStateComplex, updateProfile} from "../../redux/navbarStatusSlice"

import {useLocation, useNavigate} from "react-router-dom";

import "./NavBar.css"

import {Grid} from "@mui/material";
import Avatar from '@mui/material/Avatar';

import {BsChevronDown, BsHeartFill, BsHouseDoor, BsHouseDoorFill} from "react-icons/bs"
import {AiFillCompass, AiOutlineCompass} from "react-icons/ai"
import {TiDelete} from "react-icons/ti"
import {BsHeart, BsPlusSquareFill, BsPlusSquare} from "react-icons/bs"
import {IoPaperPlaneOutline, IoPaperPlaneSharp} from "react-icons/io5"

import ins_logo from "./images/ins_logo.png"
import DropDown from "./DropDown/DropDown";
import SearchResult from "./SearchResult/SearchResult";
import useWindowDimensions from "../../utilities/useWindowDimension";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ReportInfo from "./ReportInfo/ReportInfo";
import jwt_decode from "jwt-decode";
import {getUserByName} from "../../api";



const NavBar = ({setSwitchAccount}) => {

    const { width } = useWindowDimensions();
    const [searchContent, setSearchContent] = useState("");
    const [hideDropDown, setHideDropDown] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {navbarStatus, showProfile, inPersonalPage} = useSelector(state => state.navbarStatus);



    const userInfo = useSelector(state => state.user);


    useEffect(() => {
        const token = localStorage.getItem('token')
        const {username} = jwt_decode(token)

    },[])


    const handleSearchInputChange = (e) => {
        setSearchContent(e.target.value);
    }

    useEffect(() => {
        document.addEventListener("click", () => {
            setHideDropDown(true);
            dispatch(updateStateOuter());
            setSearchContent("");
        });
    } )


    // useEffect(() => {
    //     console.log(navbarCache)
    // },[navbarStatus, navbarCache])



    return (
        <div>
            <Grid container className="navbar">
                <Grid item xs={3.5} className="select" >
                    {/*https://www.positronx.io/react-detect-outside-click-to-hide-dropdown-element-tutorial/*/}
                        <img src={ins_logo} height="60%" className="navbar_logo" onClick={() => {
                            dispatch(updateStateSimple('homepage'));
                            navigate("/");
                        }}/>&nbsp;

                        <BsChevronDown
                            onClick={(e) => {
                                setHideDropDown(hideDropDown => !hideDropDown);
                                e.nativeEvent.stopImmediatePropagation();
                            }}
                            className="selectButton"
                        />

                        <div className="navBar_selectBar" hidden={hideDropDown}>
                            <DropDown setHideDropDown={setHideDropDown}/>
                        </div>
                </Grid>

                {
                    width < 650 ?
                        <div/>
                        :
                        <Grid item xs={3.5} className="navBar_search">
                            {
                                searchContent === '' ?
                                    <input type="text" placeholder=" Search" className="navBar_inputFull" value={searchContent} onChange={handleSearchInputChange} onClick={e => e.nativeEvent.stopImmediatePropagation()}/>
                                    :
                                    <>
                                        <input type="text" placeholder=" Search" className="navBar_input" value={searchContent} onChange={handleSearchInputChange} onClick={e => e.nativeEvent.stopImmediatePropagation()}/>
                                        <div className="navBar_inputText">
                                            <TiDelete className="navBar_inputDelete" onClick={() => setSearchContent("")}/>
                                        </div>

                                        <SearchResult content={searchContent} setSearchContent={setSearchContent}/>
                                    </>
                            }
                        </Grid>
                }


                <Grid item xs={3} className="navBar_avatar" onClick={e=>e.nativeEvent.stopImmediatePropagation()}>

                    {navbarStatus.homepage ? <BsHouseDoorFill onClick={() => {navigate("/")}} className="navBar_Click"/> :
                        <BsHouseDoor className="navBar_Click" onClick={()=>{
                            dispatch(updateStateSimple('homepage'));
                            navigate("/");
                    }}/>}

                    {navbarStatus.message ? <IoPaperPlaneSharp className="navBar_Click"/> :
                    <IoPaperPlaneOutline className="navBar_Click" onClick={e => {
                            dispatch(updateStateSimple('message'))
                            navigate("/direct/inbox")

                    }}/>}

                    {navbarStatus.newPost ? <BsPlusSquareFill className="navBar_Click"/> :
                        <BsPlusSquare className="navBar_Click" onClick={() => {
                            dispatch(updateStateComplex('newPost'))
                    }}/>}

                    {navbarStatus.explore ? <AiFillCompass className="navBar_Click" style={{fontSize:"1.8rem", fontWeight:"500"}}/> :
                        <AiOutlineCompass className="navBar_Click" style={{fontSize:"1.8rem", fontWeight:"300"}} onClick={e => {
                            dispatch(updateStateSimple('explore'))
                            navigate("/explore")
                    }}/>}

                    <div style={{position:"relative"}}>
                        {navbarStatus.report ? <BsHeartFill className="navBar_Click" style={{marginTop:"8px"}} onClick={() => dispatch(updateStateComplex('report'))}/> :
                            <BsHeart className="navBar_Click" style={{marginTop:"8px"}} onClick={() => {
                                dispatch(updateStateComplex('report'))
                        }}/>}
                        {navbarStatus.report ?  <ReportInfo/>: <div/>}
                    </div>

                    <div style={{position:"relative"}}>
                        <Avatar src={userInfo.avatar} sx={{height:"28px", width:"28px"}} style={navbarStatus.profile ? {border:"1px solid white",outline:"1px solid black"}:{}} className="navBar_Click"
                                onClick={(e) => {
                                    if(inPersonalPage) dispatch(updateProfile(2))
                                    else dispatch(updateProfile(1))
                        }}/>
                        {/*{navbarStatus.profile?  <ProfileInfo/>: <div/>}*/}
                        {showProfile?  <ProfileInfo setSwitchAccount={setSwitchAccount}/>: <div/>}
                    </div>
                </Grid>


                <Grid item xs={2}/>
            </Grid>


        </div>
    );
};

export default NavBar;