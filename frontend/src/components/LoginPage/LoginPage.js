import React from 'react';
import {Grid, Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

import imgContainer from "./images/phoneContainer.png"
import insLogo from "./images/ins_logo.png"
import appleStore from "./images/appleStore.png"
import googlePlay from "./images/googlePlay.png"
import {AiFillFacebook} from "react-icons/ai"

import content1 from "./images/content1.png"
import content2 from "./images/content2.png"
import content3 from "./images/content3.png"
// import content4 from "./images/content4.png"

import Divider from "./Divider/Divider";
import Footer from "./Footer/Footer";
import useWindowDimensions from "../../utilities/useWindowDimension";

import "./LoginPage.css"

const InsTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        // fontSize:'0.5rem',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },

}));


const LoginPage = () => {

    const { width } = useWindowDimensions();

    return (
        <div>
            <div className="loginPage_main">
                {
                    width < 720 ?  <div/> :
                        <div className="imgContainer">
                            <div className="imgBase">
                                <img src={imgContainer} height="100%" />
                            </div>
                            <div className="imgContent">
                                <img src={content1} height="100%" />
                            </div>
                        </div>
                }
                <div className="cardMain">
                    <div className="upperCard">
                        <img src={insLogo} className="insLogo"/>

                        <InsTextField
                            label="Phone number, username, or email"
                            id="reddit-input"
                            variant="filled"
                            size="small"

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

                        <Button variant="contained" id="loginButton" size="small">Log In</Button>
                        <Divider text="or"/>

                        <div className="facebook">
                            <Button><AiFillFacebook fontSize="1.3rem"/>&nbsp;Log in with Facebook</Button>
                        </div>

                        <div className="forgetPassword">
                            <a href="">Forgot password?</a>
                        </div>
                    </div>
                    <div className="bottomCard">
                        <div>Don't have an account? Sign up</div>
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