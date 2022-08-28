import React, {useState} from 'react';
import "./PersonalContent.css"
import {Avatar, Container, Grid, ImageList, ImageListItem} from "@mui/material";
import {BsGearWide} from "react-icons/bs"

import {BsGrid3X3, BsBookmarkStar, BsFileEarmarkPerson, BsFillChatFill, BsFillHeartFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"


function BsFillHeart() {
    return null;
}

const PersonalContent = () => {

    const [tag, setTag] = useState(0);


    const posts = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];
    const saved = posts;
    const tagged = posts;

    let selected = posts;

    return (
        <div>
            <Container maxWidth="md">
                <div className="personalContent_info">
                    <Avatar sx={{width:"135px", height:"135px"}}/>
                    <div className="personalContent_des">
                        <div className="personalContent_line1">
                            <div>UserName</div>
                            <div className="personalContent_button">Edit Profile</div>
                            <BsGearWide className="personalContent_gear"/>
                        </div>
                        <div className="personalContent_line2">
                            <div><b>22</b> posts</div>
                            <div><b>49</b> followers</div>
                            <div><b>33</b> following</div>
                        </div>
                        <div className="personalContent_line3">Name</div>
                    </div>
                </div>

                <div className="personalContent_selectionTool">
                    <hr className="personalContent_divider"/>
                    <div className="personalContent_selection">
                        <div className={"personalContent_tag".concat(tag === 0 ? " selected":"")} onClick={() => {setTag(0); selected = posts;}}>
                            <BsGrid3X3/>&nbsp;&nbsp;
                            <div>POSTS</div>
                        </div>
                        <div className={"personalContent_tag".concat(tag === 1 ? " selected":"")} onClick={() => {setTag(1); selected = saved;}}>
                            <BsBookmarkStar/>&nbsp;&nbsp;
                            <div>SAVED</div>
                        </div>
                        <div className={"personalContent_tag".concat(tag === 2 ? " selected":"")} onClick={() => {setTag(2); selected = tagged;}}>
                            <BsFileEarmarkPerson/>&nbsp;&nbsp;
                            <div>TAGGED</div>
                        </div>
                    </div>
                </div>


                <ImageList sx={{ width: "100%"}} cols={3} gap={24}>
                    {selected.map((item) => (
                        <ImageListItem key={item.img} style={{position:"relative"}}>
                            <img
                                src={`${item.img}?fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                className="personalContent_imageItem"
                            />
                            <div className="personalContent_iconDetails" >
                                <span className="personalContent_ht"><BsFillHeartFill style={{marginTop:"2px"}}/>&nbsp;{Math.floor(Math.random() * 10) + 1}</span>
                                <span className="personalContent_ct"><BsFillChatFill/>&nbsp;{Math.floor(Math.random() * 10) + 1}</span>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>



            </Container>
        </div>
    );
};

export default PersonalContent;