import React from 'react';
import "./Divider.css"

const Divider = ({text}) => {
    return (
        <div className="divider">
            <div className="line"/>
            <div className="text">{text}</div>
            <div className="line"/>
        </div>
    );
};

export default Divider;