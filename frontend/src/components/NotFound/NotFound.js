import React from 'react';
import {Outlet} from "react-router-dom";
import "./Not.css"
import Footer from "../LoginPage/Footer/Footer";

const NotFound = () => {
    return (
        <div className="Not_container">
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{margin:"2rem", fontWeight:"bold", fontSize:"1.5rem"}}>Sorry, this page isn't available.</div>
                <div>The link you followed may be broken, or the page may have been removed. <a href="/">Go back to Instagram.</a> </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>

            <Outlet/>
        </div>
    );
};

export default NotFound;