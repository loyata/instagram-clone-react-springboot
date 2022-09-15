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
import SwitchAccounts from "../MainContent/SwitchAccounts/SwitchAccounts";
import Explore from "../Explore/Explore";
import SeeAll from "../MainContent/SeeAll/SeeAll";

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
    const [switchAccount, setSwitchAccount] = useState(false);

    useEffect(() => {
        document.addEventListener("click", () => {
            setOpen(false);
        });
    },[])

    const [scrollPosition, setScrollPosition] = useState(0);

    const [friendsSuggestion, setFriendsSuggestion] = useState([]);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };



    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    /*
    mainContent's z-index 1-10
    newPost's z-index 10-20
    */

    return (
        <div className="home" style={{
            // position:"relative",
        }}>
            {navbarStatus.newPost ?
                <div style={{position:"absolute",width:"100%", zIndex:15, transform:`translate(0, ${scrollPosition}px)`}}>
                    <NewPost/>
                </div>
                :
                <div/>
            }

            {display ?
                <div style={{position:"absolute",width:"100%", zIndex:15, transform:`translate(0, ${scrollPosition}px)`}}>
                    <Display display={display} setDisplay={setDisplay}/>
                </div>
                :
                <div/>
            }

            {switchAccount ?
                <div style={{position:"absolute",width:"100%", zIndex:15, transform:`translate(0, ${scrollPosition}px)`}}>
                    <SwitchAccounts switchAccount={switchAccount} setSwitchAccount={setSwitchAccount}/>
                </div>
                :
                <div/>
            }

            <NavBar open={open} setOpen={setOpen}/>

            <Routes>
                <Route path="/" element={
                    <MainContent
                        display={display}
                        setDisplay={setDisplay}
                        setSwitchAccount={setSwitchAccount}
                        friendsSuggestion={friendsSuggestion}
                        setFriendsSuggestion={setFriendsSuggestion}
                />}/>
                <Route path="/:userName/*" element={<PersonalPage display={display} setDisplay={setDisplay}/>}/>
                <Route path="/accounts/edit" element={<Settings/>}/>
                <Route path="/direct/*" element={<MessagePage setSwitchAccount={setSwitchAccount}/>}/>
                <Route path="/explore" element={<Explore display={display} setDisplay={setDisplay}/>}/>
                <Route path="/explore/people" element={<SeeAll friendSuggestion={friendsSuggestion}/>}/>
            </Routes>

            {/*<MainContent/>*/}
        </div>
    );
};

export default HomePage;