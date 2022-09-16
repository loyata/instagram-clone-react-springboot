import React, {useEffect, useRef} from 'react';
import "./DropDown.css"

import {BsPersonCheck} from "react-icons/bs"
import {AiOutlineStar} from "react-icons/ai"
import {useDispatch} from "react-redux";
import {updatePostCategory} from "../../../redux/postCategorySlice";





const DropDown = ({setHideDropDown}) => {


    const dispatch = useDispatch()

    const handleFollowing = (e) => {
        dispatch(updatePostCategory(1))
        setHideDropDown(true)
    }

    const handleFavs = (e) => {
        dispatch(updatePostCategory(2))
        setHideDropDown(true)
    }

    return (

            <div className="selectBar_detail" onClick={e => e.nativeEvent.stopImmediatePropagation()}>
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