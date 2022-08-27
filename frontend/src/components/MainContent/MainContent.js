import React from 'react';
import FriendCard from "./FriendCard/FriendCard";
import {Container} from "@mui/material";
import "./MainContent.css"
import PostCard from "./PostCard/PostCard";
import Profile from "./Profile/Profile";
import SuggestionCard from "./SuggestionCard/SuggestionCard";
import MainFooter from "./MainFooter/MainFooter";
import useWindowDimensions from "../../utilities/useWindowDimension";

const MainContent = () => {

    const {width} = useWindowDimensions();

    return (
        <div>
            <Container maxWidth="md" >
                <div className="mainContent_container">
                    <div className="mainContent_left">
                        <FriendCard/>
                        <PostCard/>
                        <PostCard/>
                        <PostCard/>
                    </div>

                    {
                        width < 960 ?
                            <div/>
                            :
                            <div className="mainContent_right">
                                <Profile/>
                                <SuggestionCard/>
                                <MainFooter/>
                            </div>
                    }

                </div>
            </Container>
        </div>
    );
};

export default MainContent;