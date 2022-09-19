import React, {useEffect, useRef, useState} from 'react';
import "./Settings.css"
import NavBar from "../NavBar/NavBar";
import {Avatar} from "@mui/material";
import {Buffer} from "buffer";
import { v4 as uuidv4 } from 'uuid';

import * as htmlToImage from 'html-to-image'

import jwt_decode from "jwt-decode";
import {updateAvatar, updateInSettings} from "../../api";
import {useSelector} from "react-redux";

const AWS = require('aws-sdk')
const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY
AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
const s3 = new AWS.S3();





const Settings = () => {

    const userInfo = useSelector(state => state.user)
    const [state, setState] = useState(0);
    const [avatar, setAvatar] = useState(null)
    const [updateInfo, setUpdateInfo] = useState({
        fullName:'',
        website: '',
        bio:'',
        avatar:'',
        phoneNumber:''
    });



    useEffect(() => {
        if(userInfo.userName){
            setAvatar(userInfo.avatar)
            setUpdateInfo({fullName: userInfo.fullName, website: userInfo.website, bio: userInfo.bio, avatar: userInfo.avatar, phoneNumber: userInfo.phoneNumber})
        }
    },[userInfo.userName])


    const imgParentRef = useRef(null);

    const hiddenFileInput = useRef(null);

    const handleChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]))
    }



    const handleClick = async (e) => {
        htmlToImage.toPng(imgParentRef.current).then(async function (dataUrl) {
            // download(dataUrl, "res.png")
            // console.log(dataUrl)
            const base64 = dataUrl

            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = base64.split(';')[0].split('/')[1];
            const userId = 1;
            const params = {
                Bucket: S3_BUCKET,
                Key: uuidv4(), // type is not required
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64', // required
                ContentType: `image/${type}`, // required. Notice the back ticks

            }
            let location = '';
            let key = '';
            try {
                const {Location, Key} = await s3.upload(params).promise();
                location = Location;
                key = Key.split('-')[Key.split('-').length - 1];
            } catch (error) {
                console.log(error)
            }



            const formData = {
                userName:userInfo.userName,
                avatar:location,
                fullName: updateInfo.fullName,
                bio: updateInfo.bio,
                website: updateInfo.website,
                phoneNumber: updateInfo.phoneNumber
            }

            console.log(formData)
            updateInSettings(formData).then((res) => {
                console.log(res)
                alert("Update success.")
                window.location.reload();
            })


        })
    }

    return (
        <div>
            <div style={{height:"calc(100vh - 60px)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div className="setting_ct">
                    <div className="setting_left">
                        <div className="setting_s" onClick={() => {setState(0)}} style={{fontWeight:`${state === 0 ? 'bold' : 'unset'}`}}>Edit Profile</div>
                        {/*<div className="setting_s" onClick={() => {setState(1)}} style={{fontWeight:`${state === 1 ? 'bold' : 'unset'}`}}>Change Password</div>*/}
                    </div>
                    <div className="setting_right">
                        <div className="setting_right_li">
                            <div className="setting_right_left" >
                                <Avatar style={{width:"45px", height:"45px"}} src={avatar} ref={imgParentRef}/>
                            </div>
                            <div className="setting_right_right">
                                <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>{userInfo.userName}</div>
                                <div style={{color:"rgb(66,148,239)", fontWeight:"600"}}
                                     className="change"
                                     onClick={() => {
                                         hiddenFileInput.current.click();
                                     }}
                                >Change profile photo</div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Name</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.fullName} onChange={e=>setUpdateInfo({...updateInfo, fullName: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                                </div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Username</div>
                            <div className="setting_right_right">
                                <input
                                    value={userInfo.userName}
                                disabled/></div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    You are not allowed to change your username in this app.
                                </div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Website</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.website} onChange={e=>setUpdateInfo({...updateInfo, website: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Bio</div>
                            <div className="setting_right_right">
                                <textarea value={updateInfo.bio} onChange={e=>setUpdateInfo({...updateInfo, bio: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    {/*<div style={{transform:"translate(0, -0.8rem)"}}>1/150</div>*/}
                                    <div>
                                        <div style={{fontWeight:"bold"}}>Personal information</div>
                                        <div>Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="setting_right_li">
                            <div className="setting_right_left">Email</div>
                            <div className="setting_right_right"><input value={userInfo.email} disabled/></div>
                        </div>



                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    You are not allowed to change your email in this app.
                                </div>
                            </div>
                        </div>


                        <div className="setting_right_li">
                            <div className="setting_right_left">Phone Number</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.phoneNumber} onChange={e=>setUpdateInfo({...updateInfo, phoneNumber: e.target.value})}/>
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={hiddenFileInput}
                            style={{display: 'none'}}
                            onChange={handleChange}
                        />

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_button" onClick={handleClick}>
                                    Submit
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default Settings;