import React from 'react';
import {ImageList, ImageListItem} from "@mui/material";
import {updatePost} from "../../../redux/postSlice";
import {BsFillChatFill, BsFillHeartFill} from "react-icons/bs";
import {useDispatch} from "react-redux";

const PersonalPosts = ({allPosts, setDisplay, userType, userInfo, otherUser}) => {

    const dispatch = useDispatch();

    return (
        <div>
            <ImageList sx={{ width: "100%"}} cols={3} gap={24}>
                {allPosts.map((item) => (
                    <ImageListItem key={item.imageUrl} style={{position:"relative"}}>
                        <img
                            src={`${item.imageUrl}?fit=crop&auto=format`}
                            srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.postAlt}
                            loading="lazy"
                            className="personalContent_imageItem"
                            onClick={() => {
                                setDisplay(true)
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