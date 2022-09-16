import React from 'react';
import imgLogo from "../img.png";
import Button from "@mui/material/Button";
import "../MessagePage.css"
import {useNavigate} from "react-router-dom";

const Inbox = () => {

    const navigate = useNavigate();

    return (
        <div className="messagePage_right2">
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <img src={imgLogo}/>
                <div style={{fontSize:"1.3rem"}}>Your Messages</div>
                <div style={{color:"rgb(154,154,154)", fontSize:"0.9rem", margin:"0.5rem 0"}}>Send private photos and messages to a friend or group.</div>
                <div style={{width:"60%", display:"flex", justifyContent:"center"}}>
                    <Button variant="contained"
                            id="loginButton"
                            size="small"
                            onClick={() => {navigate("/direct/new")}}
                    >Send Message</Button>
                </div>

            </div>
        </div>
    );
};

export default Inbox;