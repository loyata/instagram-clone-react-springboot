import React, {useEffect, useState} from 'react';
import {ImageList, ImageListItem} from "@mui/material";
import {updatePost} from "../../../redux/postSlice";
import {BsFillChatFill, BsFillHeartFill} from "react-icons/bs";
import {useDispatch} from "react-redux";

import "../PersonalContent.css"
import useWindowDimensions from "../../../utilities/useWindowDimension";

const PersonalPosts = ({allPosts, setDisplay, userType, userInfo, otherUser}) => {

    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const [cols, setCols] = useState(3);

    useEffect(() => {
        if(width < 600) setCols(2)
        else setCols(3)
    },[width])



    return (
        <div>
            <ImageList sx={{width: "100%"}} cols={cols} gap={24}>
                {allPosts.map((item) => (
                    <ImageListItem key={item.imageUrl} style={{position:"relative"}} sx={{

                    }}>
                        <img
                            src={`${item.imageUrl}`}
                            srcSet={`${item.imageUrl}`}
                            alt={item.postAlt}
                            loading="lazy"
                            className="personalContent_imageItem"
                            onClick={() => {
                                setDisplay(true)
                                // console.log({...item, ...otherUser})


                                if(userType === 0) dispatch(updatePost({...item, ...userInfo}));
                                else dispatch(updatePost({...item, ...otherUser}));
                            }}

                        />
                        <div className="personalContent_iconDetails" >
                            <span className="personalContent_ht"><BsFillHeartFill style={{marginTop:"2px"}}/>&nbsp;{item.postLikes}</span>
                            <span className="personalContent_ct"><BsFillChatFill/>&nbsp;{item.postComments}</span>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default PersonalPosts;