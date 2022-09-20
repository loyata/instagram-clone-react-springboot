import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

import imgContainer from "./images/phoneContainer.png"
import insLogo from "./images/ins_logo.png"
import appleStore from "./images/appleStore.png"
import googlePlay from "./images/googlePlay.png"
import {AiFillFacebook} from "react-icons/ai"


import Divider from "./Divider/Divider";
import Footer from "./Footer/Footer";
import useWindowDimensions from "../../utilities/useWindowDimension";

import "./LoginPage.css"
import PhonePicture from "./PhonePicture/PhonePicture";
import CustomInput from "./CustomInput/CustomInput";
import {checkEmail} from "../../api";
import {logIn} from "../../api";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {


    const sampleAccounts = [
        {
            email:'Dr._Bruce_5579@example.com',
            password: 'Dr._Bruce@password'
        },
        {
            email:'Heather_Smith_9662@example.com',
            password: 'DHeather_Smith@password'
        },
        {
            email:'Diana_Ray_9471@example.com',
            password: 'Diana_Ray@password'
        },
        {
            email:'Stephen_Davis_5887@example.com',
            password: 'Stephen_Davis@password'
        },
        {
            email: 'Evan_Tran_3697@example.com',
            password: 'Evan_Tran@password'
        }
    ]

    const { width } = useWindowDimensions();

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    });

    const [loginDefault, setLoginDefault] = useState({
        email:'',
        password:''
    })



    const [errMsg, setErrMsg] = useState('')

    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        setErrMsg('')
        try {
            const response = await logIn({...loginInfo, lastLogin:new Date().toISOString()});

            if(response.data === "NO_SUCH_ACCOUNT") setErrMsg("The username you entered doesn't belong to an account. Please check your username and try again.")
            else if(response.data === "WRONG PASSWORD") setErrMsg("Sorry, your password was incorrect. Please double-check your password.")
            else {
                localStorage.setItem('token', response.data);
                window.location.reload();
            }
        }catch (e){
            console.log(e)
        }
    }



    return (
        <div>
            <div className="loginPage_main">
                {
                    width < 720 ?  <div/> : <PhonePicture/>
                }
                <div className="cardMain">
                    <div className="upperCard">
                        <img src={insLogo} className="insLogo"/>

                        <div onClick={() => {
                            const index = Math.floor(sampleAccounts.length * Math.random());
                            setLoginDefault(sampleAccounts[index]);
                            setLoginInfo(sampleAccounts[index]);
                        }}>
                            <Button>Use sample accounts to try features</Button>
                        </div>

                        <CustomInput
                            placeholder={"Email or Username"}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"email"}
                            signUpValidate={null}
                            defaultValue={loginDefault['email']}
                        />

                        <CustomInput
                            placeholder={"password"}
                            confidential={true}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"password"}
                            signUpValidate={null}
                            defaultValue={loginDefault['password']}
                        />

                        <Button variant="contained"
                                id="loginButton"
                                size="small"
                                disabled={loginInfo.email.length === 0 || loginInfo.password.length === 0 }
                                onClick={handleSubmit}
                        >Log In</Button>
                        <Divider text="or"/>

                        <div className="facebook">
                            <Button><AiFillFacebook fontSize="1.3rem"/>&nbsp;Log in with Facebook</Button>
                        </div>

                        <div className="err_msg" style={{width:"80%", fontSize:"0.9rem", color:"red", textAlign:"center", padding:"1rem"}}>
                            {errMsg}
                        </div>

                        <div className="forgetPassword">
                            <a href="">Forgot password?</a>
                        </div>
                    </div>
                    <div className="bottomCard">
                        <div>Don't have an account? <a style={{color:"rgb(119,178,242)"}} href="/accounts/emailsignup">Sign up</a></div>
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
            <div className="footer">
                <Footer/>
            </div>

        </div>
    );
};

export default LoginPage;
