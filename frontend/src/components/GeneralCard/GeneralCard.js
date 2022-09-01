import React from 'react';
import "./GeneralCard.css"

const GeneralCard = () => {
    return (
        <div className="generalCard_container">
            <div className="generalCard_general">
                <div className="generalCard_first">
                    <div style={{fontWeight:"800", fontSize:"1.1rem"}}>Discard Post</div>
                    <div style={{marginTop:"0.4rem", fontSize:"0.9rem", color:"rgb(142,142,142)"}}>If you leave, your edits won't be saved.</div>
                </div>
                <div className="generalCard_rest">
                    <div className="generalCard_selection" style={{color:"rgb(219,86,91)"}}>Discard</div>
                    <div className="generalCard_selection">Cancel</div>
                </div>
            </div>
        </div>
    );
};

export default GeneralCard;