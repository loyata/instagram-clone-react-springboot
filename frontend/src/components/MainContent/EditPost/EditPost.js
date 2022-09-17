import React, {useEffect, useState} from 'react';
import "./EditPost.css"
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";
import {AiOutlineSmile} from "react-icons/ai";
import Picker from "emoji-picker-react";
import {GrClose} from "react-icons/gr";
import {GoLocation} from "react-icons/go";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {navigation, updatePost} from "../../../api";
import {AntSwitch} from "../../NewPost/NewPost";

const EditPost = ({setEditPost}) => {

    const {postInfo} = useSelector(state => state.post)
    const [disableLocation, setDisableLocation] = useState(false)
    const [locationContent, setLocationContent] = useState('')
    const [timer, setTimer] = useState(0);
    const [locationFocus, setLocationFocus] = useState(false)
    const [locationResult, setLocationResult] = useState([]);
    const [accessOpen, setAccessOpen] = useState(false);
    const [accessContent, setAccessContent] = useState('');

    const [captionContent, setCaptionContent] = useState('')





    useEffect(()=>{
        if(locationFocus && locationContent.length >= 3){
            const temp = setInterval(() => {
                setTimer(timer => timer + 1)
            },1000)
            return () => clearInterval(temp);
        }
    })

    useEffect(()=>{
        if(timer === 2){
            navigation(locationContent).then(data=>{
                setLocationResult(data.data.features.map(feature => feature.place_name))
            }).catch(error => console.log(error))
        }
    },[timer])

    useEffect(() => {
        if(postInfo){
            setCaptionContent(postInfo.postCaption)
            setAccessContent(postInfo.postAlt)
            // setLocationContent(postInfo.postLocation)
        }
    },[postInfo])

    const handleEditSubmit = async () => {
        const formData = {
            postId: postInfo.postId,
            postLocation: locationContent,
            postCaption: captionContent,
            postAlt: accessContent
        }

        await updatePost(formData);
        alert("Update success.");
        window.location.reload();
    }


    return (
        <div className="editPost_ct" onClick={() => {setEditPost(false)}}>
            <div className="editPost_main" onClick={e=>e.stopPropagation()}>
                <div className="editPost_title" >
                    <span style={{fontSize:"0.9rem"}} onClick={() => setEditPost(false)}>Cancel</span>
                    <span style={{fontWeight:"bold"}}>Edit info</span>
                    <span style={{fontSize:"0.9rem", color:"rgb(65,147,239)", fontWeight:"700"}} onClick={handleEditSubmit}>Done</span>
                </div>
                <div className="editPost_body">
                    <div className="editPost_bodyLeft">
                        <img src={postInfo.imageUrl} width="100%"/>
                    </div>
                    <div className="editPost_bodyRight">
                        <div className="newPost_editPhoto_caption" style={{width:"100%"}}>
                            <div className="newPost_captionContainer">
                                <div className="newPost_avatar">
                                    <Avatar sx={{width:"30px", height:"30px"}} src={postInfo.avatar}/>
                                    <div><b>{postInfo.userName}</b></div>
                                </div>

                                <textarea
                                    placeholder="Write a caption..."
                                    value={captionContent}
                                    onChange={e=>setCaptionContent(e.target.value)}
                                />


                            </div>
                            <div className="newPost_location">
                                {
                                    disableLocation?
                                        <div className="newPost_locationDisabled">
                                            {locationContent}
                                        </div>
                                        :
                                        <input
                                            className="newPost_inputA"
                                            placeholder="Add location"
                                            type="text"
                                            value={locationContent}
                                            onChange={e => {
                                                setLocationContent(e.target.value);
                                                setTimer(0);
                                            }}
                                            onFocus={() => setLocationFocus(true)}
                                            onBlur={() =>{
                                                setLocationFocus(false);
                                                setTimer(0);
                                            }}

                                        />
                                }
                                <div className="GoLocation">
                                    {locationContent.length !== 0 ?
                                        <GrClose onClick={() => {
                                            setLocationContent('');
                                            setDisableLocation(false)
                                        }}/>
                                        :
                                        <GoLocation/>
                                    }
                                </div>
                            </div>

                            <div className="newPost_remain">
                                {locationContent !== '' && disableLocation === false ?
                                    <div className="editPost_searchResults">
                                        <ul className="newPost_location_ul">
                                            {
                                                locationResult.map(
                                                    (result, index) =>
                                                        <li
                                                            className="newPost_location_li"
                                                            key={index}
                                                            onClick={() => {
                                                                setLocationContent(locationResult[index]);
                                                                setDisableLocation(true)
                                                            }}
                                                        >
                                                            {result}
                                                        </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>

                            <div className="newPost_access" style={{display:`${locationContent !== '' && disableLocation === false ? 'none':'block'}`}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div style={{fontWeight:`${accessOpen? 'bold':'unset'}`}}>Accessibility</div>
                                    <div
                                        className="newPost_up_and_down"
                                        onClick={() => setAccessOpen(!accessOpen)}
                                    >{accessOpen?<BsChevronUp/>:<BsChevronDown/>}</div>
                                </div>

                                <div style={{display:`${accessOpen ? 'block':'none'}`}}>
                                    <div style={{margin:"0.8rem 0", fontSize:"0.8rem", color:"rgb(143,143,143)"}}>
                                        Alt text describes your photos for people with visual impairments. Alt text will be automatically created for your photos or you can choose to write your own.
                                    </div>
                                    <div style={{display:"flex", alignItems:"center"}}>
                                        <img src={postInfo.imageUrl} width="40px" height="40px"/>&nbsp;&nbsp;
                                        <input type="text"
                                               className="newPost_inputB"
                                               placeholder="Write alt text..."
                                               value={accessContent}
                                               onChange={e=>setAccessContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;