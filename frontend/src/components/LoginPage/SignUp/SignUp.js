import React from 'react';
import insLogo from "../images/ins_logo.png";
import Button from "@mui/material/Button";
import Divider from "../Divider/Divider";
import {AiFillFacebook} from "react-icons/ai";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import {InsTextField} from "../LoginPage";


import "./SignUp.css"
import Footer from "../Footer/Footer";

const SignUp = () => {
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
                            label="Phone number, username, or email"
                            id="reddit-input"
                            variant="filled"
                            size="small"

                            className="inputText"
                        />

                        <InsTextField
                            label="Full Name"
                            id="reddit-input"
                            variant="filled"
                            size="small"
                            margin="dense"
                            className="inputText"
                        />

                        <InsTextField
                            label="Username"
                            id="reddit-input"
                            variant="filled"
                            size="small"
                            margin="dense"
                            className="inputText"
                        />

                        <InsTextField
                            label="Password"
                            id="reddit-input"
                            variant="filled"
                            size="small"
                            margin="dense"
                            className="inputText"
                        />

                        <div className="des2">People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Learn More</a></div>

                        <div className="des2">By signing up, you agree to our <a href="https://www.facebook.com/privacy/policy">Terms , Privacy Policy</a>  and <a href="https://help.instagram.com/1896641480634370?ref=ig">Cookies Policy</a> .</div>

                        <Button variant="contained" id="loginButton" size="small">Sign Up</Button>

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