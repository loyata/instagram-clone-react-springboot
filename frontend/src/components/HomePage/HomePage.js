import React, {useEffect, useState} from 'react';
import "./HomePage.css"
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";
import NewPost from "../NewPost/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import MessagePage from "../MessagePage/MessagePage";
import SignUp from "../LoginPage/SignUp/SignUp";
import PersonalPage from "../PersonalPage/PersonalPage";
import {updateStateOuter} from "../../redux/navbarStatusSlice";
import Settings from "../Settings/Settings";
import jwt_decode from "jwt-decode";
import {update} from "../../redux/userSlice";
import {getUserByName} from "../../api";
import Display from "../Display/Display";

const HomePage = () => {


    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    useEffect(() => {
            const {username} = jwt_decode(token);
            const userInfo = getUserByName(username)
            userInfo.then((res)=>{
                dispatch(update(res.data))
            })

    },[])

    const {navbarStatus} = useSelector(state => state.navbarStatus);
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        document.addEventListener("click", () => {
            setOpen(false);
        });
    },[])



    /*
    mainContent's z-index 1-10
    newPost's z-index 10-20
    */

    return (
        <div className="home" style={{
            // position:"relative",
        }}>
            {navbarStatus.newPost ?
                <div style={{position:"absolute",width:"100%", zIndex:15}}>
                    <NewPost/>
                </div>
                :
                <div/>
            }

            {display ?
                <div style={{position:"absolute",width:"100%", zIndex:15}}>
                    <Display display={display} setDisplay={setDisplay}/>
                </div>
                :
                <div/>
            }

            <NavBar open={open} setOpen={setOpen}/>

            <Routes>
                <Route path="/" element={<MainContent/>}/>
                <Route path="/:userName" element={<PersonalPage display={display} setDisplay={setDisplay}/>}/>
                {/*<Route path="/p/:postIdentifier" element={<PersonalPage display={display} setDisplay={setDisplay}/>}/>*/}
                <Route path="/accounts/edit" element={<Settings/>}/>
                <Route path="/direct/*" element={<MessagePage/>}/>
            </Routes>

            {/*<MainContent/>*/}
        </div>
    );
};

export default HomePage;