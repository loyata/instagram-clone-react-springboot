import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import "./MainContent.css"

import FriendCard from "./FriendCard/FriendCard";
import PostCard from "./PostCard/PostCard";
import Profile from "./Profile/Profile";
import SuggestionCard from "./SuggestionCard/SuggestionCard";
import MainFooter from "./MainFooter/MainFooter";
import useWindowDimensions from "../../utilities/useWindowDimension";
import {getFavoritePostsPaging, getFriendPostsPaging, getSamplePosts, getSamplePostsExcludingSelf} from "../../api";
import {updateStateOuter} from "../../redux/navbarStatusSlice";
import {useDispatch, useSelector} from "react-redux";
import {BsChevronLeft} from "react-icons/bs";
import {updatePostCategory} from "../../redux/postCategorySlice";

const MainContent = ({display, setDisplay, setSwitchAccount, friendsSuggestion, setFriendsSuggestion, setThreeDots}) => {

    const {width} = useWindowDimensions();
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);


    const categoryMap = {
        0:'random',
        1:'Following',
        2:'Favorites'
    }
    /**
     * 0: random posts
     * 1: friends' posts
     * 2: favourite posts
     */
    const {category} = useSelector(state => state.category)
    const userInfo = useSelector(state => state.user);

    const getRandomPosts = async () => {
        const res = await getSamplePostsExcludingSelf(10, userInfo.userId);
        setPosts(posts => posts.concat(res.data))
    }

    const getFriendPosts = async () => {
        const res = await getFriendPostsPaging(userInfo.userId, startIndex, 10);
        setStartIndex(startIndex => startIndex + 10);
        setPosts(posts => posts.concat(res.data))
    }

    const getFavoritePosts = async () => {
        // console.log(startIndex)
        const res = await getFavoritePostsPaging(userInfo.userId, startIndex, 10);
        setStartIndex(startIndex => startIndex + 10);
        setPosts(posts => posts.concat(res.data))
    }


    useEffect(() => {
        setPosts([]);
        setStartIndex(0);
        if(category === 0) getRandomPosts();
        if(category === 1) getFriendPosts();
        if(category === 2) getFavoritePosts();
    },[category])

    useEffect(() => {
        console.log(`category: ${categoryMap[category]}`)
    }, [category])


    useEffect(() => {
        function handleScrollEvent() {
            if ((window.innerHeight + window.scrollY) +5 >= document.body.offsetHeight) {
                console.log(category)
                if(category === 0) getRandomPosts();
                if(category === 1) getFriendPosts();
                if(category === 2) getFavoritePosts();
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

                        {category === 0 ?
                            <FriendCard />
                            :
                            <div className="mainContent_return" style={{display:"flex", alignItems:"center", marginTop:"1rem"}} onClick={() => dispatch(updatePostCategory(0))}>
                                <span style={{fontSize:"1.8rem", transform:"translate(0, 3px)"}}><BsChevronLeft/></span>&nbsp;
                                <span style={{fontSize:"1.2rem", fontWeight:"bold"}}>{categoryMap[category]}</span>
                            </div>
                        }

                        {posts.map((post,index) =>
                            <PostCard
                                key={index}
                                postInfo={post}
                                display={display}
                                setDisplay={setDisplay}
                                setThreeDots={setThreeDots}
                            />)}
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