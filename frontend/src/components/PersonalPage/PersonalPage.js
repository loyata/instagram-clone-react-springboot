import React from 'react';
import "./PersonalPage.css"
import NavBar from "../NavBar/NavBar";
import {Container} from "@mui/material";
import PersonalContent from "../PersonalContent/PersonalContent";
import Footer from "../LoginPage/Footer/Footer";

import {useParams} from "react-router-dom";

const PersonalPage = ({display, setDisplay}) => {

    const {userName} = useParams();

    return (
        <div style={{minHeight:"100vh", transform:"translate(0, 62px)"}}>
            <PersonalContent display={display} setDisplay={setDisplay} userName={userName}/>
        </div>
    );
};

export default PersonalPage;