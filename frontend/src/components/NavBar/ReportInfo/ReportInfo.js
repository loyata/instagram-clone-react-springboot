import React from 'react';
import "./ReportInfo.css"
import {Avatar} from "@mui/material";

const ReportInfo = () => {
    return (
        <div className="reportInfo_container">
            <div>
                <div style={{fontSize:"0.9rem", fontWeight:"bold", margin:"0.5rem"}}>This Month</div>
                <div className="reportInfo_detail">
                    <Avatar style={{margin:"0.5rem 0.5rem"}} className="reportInfo_avatar"/>
                    <div style={{fontSize:"0.9rem"}} className="reportInfo_text">
                        <b>userName</b> started following you. <span style={{color:"rgb(154,154,154)"}}>&nbsp;1w</span>
                    </div>
                    <div className="reportInfo_button">
                        <div>Follow</div>
                    </div>
                </div>

            </div>
            <div>
                <div style={{fontSize:"0.9rem", fontWeight:"bold", margin:"0.5rem"}}>Earlier</div>
            </div>
        </div>
    );
};

export default ReportInfo;