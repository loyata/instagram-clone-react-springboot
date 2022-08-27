import React, {useEffect, useState} from 'react';
import "./NavBar.css"
import {Grid} from "@mui/material";
import {BsChevronDown} from "react-icons/bs"
import {AiOutlineSearch} from "react-icons/ai"
import {TiDelete} from "react-icons/ti"

import {BsFillHouseDoorFill} from "react-icons/bs"
import {IoPaperPlaneOutline} from "react-icons/io5"
import {FiPlusSquare} from "react-icons/fi"
import {ImCompass2} from "react-icons/im"
import {BsHeart} from "react-icons/bs"
import Avatar from '@mui/material/Avatar';
import {BsHeartFill} from "react-icons/bs"





import ins_logo from "./images/ins_logo.png"
import DropDown from "./DropDown/DropDown";
import SearchResult from "./SearchResult/SearchResult";
import useWindowDimensions from "../../utilities/useWindowDimension";

const NavBar = () => {

    const { width } = useWindowDimensions();


    const [hideDropDown, setHideDropDown] = useState(true);
    const [searchContent, setSearchContent] = useState("");

    const handleSearchInputChange = (e) => {
        setSearchContent(e.target.value);
    }

    // useEffect(() => {
    //     console.log(searchContent);
    // },[searchContent])


    return (
        <div>
            <Grid container className="navbar">
                <Grid item xs={3.5} className="select">
                    {/*https://www.positronx.io/react-detect-outside-click-to-hide-dropdown-element-tutorial/*/}
                        <img src={ins_logo} height="60%" />&nbsp;
                        <BsChevronDown onClick={() => {
                            setHideDropDown(hideDropDown => !hideDropDown)}
                        } className="selectButton"/>
                        <div className="navBar_selectBar" hidden={hideDropDown}>
                            <DropDown/>
                        </div>
                </Grid>

                {
                    width < 650 ?
                        <div/>
                        :
                        <Grid item xs={3.5} className="navBar_search">
                            {
                                searchContent === '' ?
                                    <input type="text" placeholder=" 🔍 Search" className="navBar_inputFull" value={searchContent} onChange={handleSearchInputChange}/>
                                    :
                                    <>
                                        <input type="text" placeholder=" 🔍 Search" className="navBar_input" value={searchContent} onChange={handleSearchInputChange}/>
                                        <div className="navBar_inputText">
                                            <TiDelete className="navBar_inputDelete" onClick={() => setSearchContent("")}/>
                                        </div>

                                        <SearchResult/>
                                    </>

                            }
                        </Grid>
                }


                <Grid item xs={3} className="navBar_avatar">
                    <BsFillHouseDoorFill/>
                    <IoPaperPlaneOutline/>
                    <FiPlusSquare/>
                    <ImCompass2/>
                    <BsHeart/>
                    <Avatar alt="Donald Trump" src="" sx={{height:"30px", width:"30px"}}/>
                </Grid>

                <Grid item xs={2}/>
            </Grid>
        </div>
    );
};

export default NavBar;