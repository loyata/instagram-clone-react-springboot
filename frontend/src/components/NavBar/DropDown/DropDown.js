import React, {useEffect, useRef} from 'react';
import "./DropDown.css"

import {BsPersonCheck} from "react-icons/bs"
import {AiOutlineStar} from "react-icons/ai"





const DropDown = ({setHideDropDown}) => {

    const handleFollowing = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        alert("navigate to following")
        setHideDropDown(true)
    }

    const handleFavs = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        alert("navigate to favorites")
        setHideDropDown(true)
    }

    return (

            <div className="selectBar_detail">
                <div className="selectBar_line" onClick={handleFollowing}>
                    <BsPersonCheck/>&nbsp;
                    <div>Following</div>
                </div>
                <div className="selectBar_line" onClick={handleFavs}>
                    <AiOutlineStar/>&nbsp;
                    <div>Favorites</div>
                </div>
            </div>

    );
};

export default DropDown;