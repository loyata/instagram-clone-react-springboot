import React, {useEffect, useState} from 'react';
import insLogo from "../images/ins_logo.png";
import Button from "@mui/material/Button";
import Divider from "../Divider/Divider";
import {AiFillFacebook} from "react-icons/ai";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import {InsTextField} from "../LoginPage";


import {useNavigate} from "react-router-dom";

import "./SignUp.css"
import UserPool from "../../../UserPool"

import Footer from "../Footer/Footer";

import {InputAdornment} from "@mui/material";

import {signUp} from "../../../api";


const SignUp = () => {


    const navigate = useNavigate()

    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        fullName:'',
        userName:'',
        password:''
    });

    const [showPassword, setShowPassword] = useState(false)

    // useEffect(() =>{
    //     console.log(signUpInfo)
    // },[signUpInfo])


    const handleOnchange = (type) => (event) => setSignUpInfo({...signUpInfo, [type]:event.target.value})

    const handleSubmit = () => {


        // console.log(signUpInfo)
        signUp(signUpInfo)




    }




    return (
        <div>
            <div className="signUpPage_main">
                <div className="cardMain">
                    <div className="upperCardSignUp">
                        <img src={insLogo} className="insLogo"/>

                        <div className="des">Sign up to see photos and videos from your friends.</div>

                        <Button variant="contained" id="loginButton" size="small"><AiFillFacebook fontSize="1.3rem"/>&nbsp;Log in with Facebook</Button>

                        <Divider text="OR"/>


                        <InsTextField
                            label="Email"
                            variant="filled"
                            size="small"
                            className="inputText"
                            value={signUpInfo.email}
                            onChange = {handleOnchange('email')}
                        />

                        <InsTextField
                            label="Full Name"
                            variant="filled"
                            size="small"
                            margin="dense"
                            className="inputText"
                            value={signUpInfo.fullName}
                            onChange = {handleOnchange('fullName')}
                        />

                        <InsTextField
                            label="Username"
                            variant="filled"
                            size="small"
                            margin="dense"
                            className="inputText"
                            value={signUpInfo.userName}
                            onChange = {handleOnchange('userName')}
                        />

                        <InsTextField
                            label="Password"
                            variant="filled"
                            type={showPassword?"text":"password"}
                            size="small"
                            margin="dense"
                            className="inputText"
                            InputProps={signUpInfo.password !== '' ?
                                {endAdornment:
                                    <InputAdornment
                                        position="end"
                                        style={{userSelect:"none"}}
                                    >
                                    <div className="showPass" onClick={() => {setShowPassword(!showPassword)}}>{showPassword? 'hide':'show'}</div>
                                    </InputAdornment>
                                }:{}
                            }
                            value={signUpInfo.password}
                            onChange = {handleOnchange('password')}
                        />

                        <div className="des2">People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Learn More</a></div>

                        <div className="des2">By signing up, you agree to our <a href="https://www.facebook.com/privacy/policy">Terms , Privacy Policy</a>  and <a href="https://help.instagram.com/1896641480634370?ref=ig">Cookies Policy</a> .</div>

                        <Button variant="contained" id="loginButton" size="small"
                                disabled={signUpInfo.password === '' || signUpInfo.fullName === ''|| signUpInfo.email.indexOf('@') === -1 || signUpInfo.fullName === '' || signUpInfo.email === ''}
                                onClick={handleSubmit}>Sign Up</Button>

                    </div>
                    <div className="bottomCardSignUp">
                        <div>Have an account? Log in</div>
                    </div>
                    <div className="appDownload">
                        <div className="getTheApp">Get the app.</div>
                        <div className="downloadImages">
                            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank"><img src={appleStore} className="downloadImageApple"/></a>
                            <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank"><img src={googlePlay} className="downloadImageGoogle"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;