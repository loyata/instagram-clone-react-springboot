import React from 'react';
import "./DropDown.css"

import {BsPersonCheck} from "react-icons/bs"
import {AiOutlineStar} from "react-icons/ai"


const DropDown = () => {
    return (

            <div className="selectBar_detail">
                <div className="selectBar_line" onClick={()=>{}}>
                    <BsPersonCheck/>&nbsp;
                    <div>Following</div>
                </div>
                <div className="selectBar_line" onClick={()=>{}}>
                    <AiOutlineStar/>&nbsp;
                    <div>Favorites</div>
                </div>
            </div>

    );
};

export default DropDown;