import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import "./MainContent.css"

import FriendCard from "./FriendCard/FriendCard";
import PostCard from "./PostCard/PostCard";
import Profile from "./Profile/Profile";
import SuggestionCard from "./SuggestionCard/SuggestionCard";
import MainFooter from "./MainFooter/MainFooter";
import useWindowDimensions from "../../utilities/useWindowDimension";
import {getSamplePosts} from "../../api";
import {updateStateOuter} from "../../redux/navbarStatusSlice";

const MainContent = () => {

    const {width} = useWindowDimensions();
    const [posts, setPosts] = useState([]);

    const [showEmoji, setShowEmoji] = useState(false)

    const getRandomPosts = async (num) => {
        const res = await getSamplePosts(10);
        console.log(res.data)
        setPosts(res.data)
    }

    useEffect(() => {
        getRandomPosts();
    },[])

    // useEffect(() => {
    //     document.addEventListener("click", () => {
    //         setShowEmoji(false)
    //     });
    // },[])

    return (
        <div>
            <Container maxWidth="md" >
                <div className="mainContent_container">
                    <div className="mainContent_left">
                        <FriendCard/>
                        {posts.map((post,index) => <PostCard key={index} postInfo={post}/>)}
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