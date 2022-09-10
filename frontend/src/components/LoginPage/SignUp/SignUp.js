import React, {useEffect, useState} from 'react';
import insLogo from "../images/ins_logo.png";
import Button from "@mui/material/Button";
import Divider from "../Divider/Divider";
import {AiFillFacebook} from "react-icons/ai";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import {useNavigate} from "react-router-dom";
import "./SignUp.css"

import {signUp} from "../../../api";
import CustomInput from "../CustomInput/CustomInput";


const SignUp = () => {


    const navigate = useNavigate()

    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        fullName:'',
        userName:'',
        password:''
    });


    useEffect(() => {
        console.log(signUpInfo)
    },[signUpInfo])


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

                        <div style={{marginBottom:"0.7rem", fontSize:"0.9rem"}}>
                            <Divider text="OR"/>
                        </div>


                        <CustomInput
                            placeholder={"Email"}
                            setSignUpInfo={setSignUpInfo}
                            signUpInfo={signUpInfo}
                            setSignUpInfoKey={"email"}

                        />
                        <CustomInput
                            placeholder={"Full Name"}
                            setSignUpInfo={setSignUpInfo}
                            signUpInfo={signUpInfo}
                            setSignUpInfoKey={"fullName"}

                            validation={(value) => value.length > 0}
                        />
                        <CustomInput
                            placeholder={"Username"}
                            setSignUpInfo={setSignUpInfo}
                            signUpInfo={signUpInfo}
                            setSignUpInfoKey={"userName"}
                        />
                        <CustomInput
                            placeholder={"Password"}
                            confidential={true}
                            signUpInfo={signUpInfo}
                            setSignUpInfo={setSignUpInfo}
                            setSignUpInfoKey={"password"}

                            validation={(value) => value.length > 7}
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