import React from 'react';
import "./HomePage.css"
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";
import NewPost from "../NewPost/NewPost";
import {useSelector} from "react-redux";


const HomePage = () => {

    const {navbarStatus} = useSelector(state => state.navbarStatus);

    /*
    mainContent's z-index 1-10
    newPost's z-index 10-20
    */

    return (
        <div className="home" style={{
            position:"relative",
            maxHeight:`${navbarStatus.newPost ? '100vh' : 'unset'}`,
            overflow:`${navbarStatus.newPost ? 'hidden' : 'unset'}`
        }}>
            {navbarStatus.newPost ?
                <div style={{position:"absolute",width:"100%", zIndex:10}}>
                    <NewPost/>
                </div>
                :
                <div/>
            }
            <NavBar/>
            <MainContent/>
        </div>
    );
};

export default HomePage;