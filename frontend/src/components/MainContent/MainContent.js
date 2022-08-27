import React from 'react';
import FriendCard from "./FriendCard/FriendCard";
import {Container} from "@mui/material";
import "./MainContent.css"
import PostCard from "./PostCard/PostCard";

const MainContent = () => {
    return (
        <div>
            <Container maxWidth="md" >
                <div className="mainContent_container">
                    <div className="mainContent_left">
                        <FriendCard className="mainContent-fc"/>
                        <PostCard/>
                    </div>
                    <div className="mainContent_right">

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default MainContent;