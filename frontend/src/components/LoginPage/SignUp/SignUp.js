import React, {useEffect, useState} from 'react';
import insLogo from "../images/ins_logo.png";
import Button from "@mui/material/Button";
import Divider from "../Divider/Divider";
import {AiFillFacebook} from "react-icons/ai";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import {Navigate, Redirect, useNavigate} from "react-router-dom";
import "./SignUp.css"

import {signUp, checkUserName, checkEmail} from "../../../api";
import CustomInput from "../CustomInput/CustomInput";
import {BsCheckCircle} from "react-icons/bs";
import Footer from "../Footer/Footer";


const SignUp = () => {


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token !== null) navigate("/")
    })


    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        fullName:'',
        userName:'',
        password:''
    });

    const [signUpValidate, setSignUpValidate] = useState({
        email:false,
        fullName:false,
        userName:false,
        password:false
    });


    const [emailWarning, setEmailWarning] = useState('')
    const [usernameWarning, setUsernameWarning] = useState('')
    const [passwordWarning, setPasswordWarning] = useState('')
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [redirectNow, setRedirectNow] = useState(false)

    const canSubmit = signUpInfo.email !== '' &&
            signUpInfo.fullName !== '' &&
            signUpInfo.userName !== '' &&
            signUpInfo.password !== '' &&
            signUpValidate.email === true &&
            signUpValidate.fullName === true &&
            signUpValidate.userName === true &&
            signUpValidate.password === true


    const handleSubmit = async () => {

        try {
            const response = await signUp(signUpInfo)
            if(response.data) {
                setSignUpSuccess(true)
                // localStorage.setItem('token', response.data);

                setTimeout(()=>{
                    console.log("this is timeout")
                    navigate("../../")
                },6000)

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="signUpPage_main">
                <div className="cardMain">
                    {!signUpSuccess ?
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
                                SignUpKey={"email"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={async (value) => {
                                    if(value.length > 0){
                                        if(!value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        )){
                                            setSignUpValidate({...signUpValidate, email:false})
                                            setEmailWarning('Enter a valid email address.')
                                        }

                                        else{
                                            const response = await checkEmail(value)
                                            if (response.data === false) setEmailWarning('The email address is taken.')
                                            setSignUpValidate({...signUpValidate, email:response.data})
                                        }
                                    }
                                }}


                            />
                            <CustomInput
                                placeholder={"Full Name"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"fullName"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={(value) => {
                                    setSignUpValidate({...signUpValidate, fullName:value.length > 0})
                                }}
                            />
                            <CustomInput
                                placeholder={"Username"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"userName"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={async (value) => {
                                    if(value.length > 0){
                                        const response = await checkUserName(value)
                                        if(response.data === false) setUsernameWarning('The username is taken.')
                                        setSignUpValidate({...signUpValidate, userName:response.data})
                                    }
                                }}
                            />
                            <CustomInput
                                placeholder={"Password"}
                                confidential={true}
                                signUpInfo={signUpInfo}
                                setSignUpInfo={setSignUpInfo}
                                SignUpKey={"password"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={(value) => {
                                    if(value.length < 8) setPasswordWarning('Password should contain at least 8 characters.')
                                    setSignUpValidate({...signUpValidate, password:value.length >= 8})
                                }}
                            />

                            <div className="des2">People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank">Learn More</a></div>

                            <div className="des2">By signing up, you agree to our <a href="https://www.facebook.com/privacy/policy" target="_blank">Terms , Privacy Policy</a>  and <a href="https://help.instagram.com/1896641480634370?ref=ig">Cookies Policy</a> .</div>

                            <Button variant="contained" id="loginButton" size="small" disabled={!canSubmit}
                                    onClick={handleSubmit}>Sign Up</Button>

                            <div className="warning">
                                <div style={{display:`${signUpInfo.email.length > 0 && !signUpValidate.email ? 'block' :'none'}`}}>{emailWarning}</div>
                                <div style={{display:`${signUpInfo.userName.length > 0 && !signUpValidate.userName? 'block' :'none'}`}}>{usernameWarning}</div>
                                <div style={{display:`${signUpInfo.password.length > 0 && !signUpValidate.password? 'block' :'none'}`}}>{passwordWarning}</div>
                            </div>


                        </div>:

                        <div className="upperCardSignUp">
                            <img src={insLogo} className="insLogo"/>
                            <div style={{fontSize:"5rem"}}>
                                <BsCheckCircle/>
                            </div>
                            {/*{redirectNow? <Navigate to={"../../" } /> : <div style={{margin:"1rem"}}>Success</div>}*/}
                            <div style={{margin:"1rem"}}>Success</div>
                        </div>
                    }
                    <div className="bottomCardSignUp">
                        <div>Have an account? <a style={{color:"rgb(119,178,242)"}} href="/">Log in</a></div>
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

export default SignUp;