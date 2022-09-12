import React, {useEffect, useRef, useState} from 'react';
import "./Settings.css"
import NavBar from "../NavBar/NavBar";
import {Avatar} from "@mui/material";
import {Buffer} from "buffer";
import { v4 as uuidv4 } from 'uuid';

import * as htmlToImage from 'html-to-image'

import jwt_decode from "jwt-decode";
import {updateAvatar} from "../../api";

const AWS = require('aws-sdk')
const S3_BUCKET ='loyata.images';
const REGION ='us-east-1';
const ACCESS_KEY ='AKIAYYQLTSE2EYA5JA2I';
const SECRET_ACCESS_KEY ='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';
AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
const s3 = new AWS.S3();





const Settings = () => {

    const [state, setState] = useState(0);
    const [avatar, setAvatar] = useState(null)
    const [userName, setUserName] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token')
        const {username} = jwt_decode(token)
        setUserName(username)
    },[avatar])


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


            updateAvatar({
                userName:userName,
                imageUrl:location,
                imageKey:key
            }).then((res)=>{
                console.log(res.data)
            }).catch((e)=>{
                console.log(e)
            })

        })
    }

    return (
        <div>
            <div style={{height:"calc(100vh - 60px)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div className="setting_ct">
                    <div className="setting_left">
                        <div className="setting_s" onClick={() => {setState(0)}} style={{fontWeight:`${state === 0 ? 'bold' : 'unset'}`}}>Edit Profile</div>
                        <div className="setting_s" onClick={() => {setState(1)}} style={{fontWeight:`${state === 1 ? 'bold' : 'unset'}`}}>Change Password</div>
                    </div>
                    <div className="setting_right">
                        <div className="setting_right_li">
                            <div className="setting_right_left" >
                                <Avatar style={{width:"45px", height:"45px"}} src={avatar} ref={imgParentRef}/>
                            </div>
                            <div className="setting_right_right">
                                <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>user_name</div>
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
                            <div className="setting_right_right"><input disabled/></div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">UserName</div>
                            <div className="setting_right_right"><input disabled/></div>
                        </div>


                        <div className="setting_right_li">
                            <div className="setting_right_left">Email</div>
                            <div className="setting_right_right"><input disabled/></div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Phone Number</div>
                            <div className="setting_right_right"><input disabled/></div>
                        </div>

                        <input
                            type="file"
                            ref={hiddenFileInput}
                            style={{display: 'none'}}
                            onChange={handleChange}
                        />

                        <div className="setting_right_li">
                           <div className="setting_button" onClick={handleClick}>
                                Save Change
                            </div>
                        </div>




                    </div>

                </div>
            </div>
        </div>

    );
};

export default Settings;