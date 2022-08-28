import React from 'react';
import "./HomePage.css"
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";


const HomePage = () => {
    return (
        <div className="home">
            <NavBar/>
            <MainContent/>
        </div>
    );
};

export default HomePage;