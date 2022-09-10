import React, {useEffect} from 'react';
import "./HomePage.css"
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";
import NewPost from "../NewPost/NewPost";
import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import MessagePage from "../MessagePage/MessagePage";
import SignUp from "../LoginPage/SignUp/SignUp";
import PersonalPage from "../PersonalPage/PersonalPage";


const HomePage = () => {

    const {navbarStatus} = useSelector(state => state.navbarStatus);

    useEffect(() => {

    },[])


    /*
    mainContent's z-index 1-10
    newPost's z-index 10-20
    */

    return (
        <div className="home" style={{
            position:"relative",
        }}>
            {navbarStatus.newPost ?
                <div style={{position:"absolute",width:"100%", zIndex:10}}>
                    <NewPost/>
                </div>
                :
                <div/>
            }
            <NavBar/>
            <Routes>
                <Route path="/" element={<MainContent/>}/>
                <Route path="/alex_loyata" element={<PersonalPage/>}/>
                <Route path="/direct/*" element={<MessagePage/>}/>
            </Routes>

            {/*<MainContent/>*/}
        </div>
    );
};

export default HomePage;