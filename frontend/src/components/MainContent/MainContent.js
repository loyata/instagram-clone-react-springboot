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

const MainContent = ({display, setDisplay, setSwitchAccount, friendsSuggestion, setFriendsSuggestion}) => {

    const {width} = useWindowDimensions();
    const [posts, setPosts] = useState([]);

    const getRandomPosts = async () => {
        const res = await getSamplePosts(10);
        setPosts(posts => posts.concat(res.data))
    }

    useEffect(() => {
        getRandomPosts();
    },[])


    useEffect(() => {
        function handleScrollEvent() {
            if ((window.innerHeight + window.scrollY) +5 >= document.body.offsetHeight) {
                getRandomPosts();
            }

        }
        window.addEventListener('scroll', handleScrollEvent)
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        }
    }, [])


    return (
        <div>
            <Container maxWidth="md" >
                <div className="mainContent_container">
                    <div className="mainContent_left">
                        <FriendCard/>
                        {posts.map((post,index) => <PostCard key={index} postInfo={post} display={display} setDisplay={setDisplay}/>)}
                    </div>

                    {
                        width < 960 ?
                            <div/>
                            :
                            <div className="mainContent_right">
                                <Profile setSwitchAccount={setSwitchAccount}/>
                                <SuggestionCard friendsSuggestion={friendsSuggestion} setFriendSuggestion={setFriendsSuggestion}/>
                                <MainFooter/>
                            </div>
                    }

                </div>
            </Container>
        </div>
    );
};

export default MainContent;