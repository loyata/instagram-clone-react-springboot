import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from "react-redux";
import {updateStateSimple, updateStateOuter, updateStateComplex} from "../../redux/navbarStatusSlice"

import "./NavBar.css"

import {Grid} from "@mui/material";
import Avatar from '@mui/material/Avatar';

import {BsChevronDown, BsHouseDoor, BsHouseDoorFill} from "react-icons/bs"
import {AiFillCompass, AiOutlineCompass} from "react-icons/ai"
import {TiDelete} from "react-icons/ti"
import {BsHeart, BsPlusSquareFill, BsPlusSquare} from "react-icons/bs"
import {IoPaperPlaneOutline, IoPaperPlaneSharp} from "react-icons/io5"

import ins_logo from "./images/ins_logo.png"
import DropDown from "./DropDown/DropDown";
import SearchResult from "./SearchResult/SearchResult";
import useWindowDimensions from "../../utilities/useWindowDimension";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const NavBar = () => {

    const { width } = useWindowDimensions();
    const [searchContent, setSearchContent] = useState("");
    const [hideDropDown, setHideDropDown] = useState(true);


    const [navbarStatus, setNavbarStatus] = useState({
        homepage: true,
        message: false,
        newPost: false,
        explore: false,
        profile: false
    })

    const navbarStatusDefault = {
        homepage: false,
        message: false,
        newPost: false,
        explore: false,
        profile: false
    }
    const [navBarCache, setNavBarCache] = useState('');

    const handleSearchInputChange = (e) => {
        setSearchContent(e.target.value);
    }

    useEffect(() => {
        document.addEventListener("click", () => {
            console.log(navBarCache)
            setHideDropDown(true);

            if (navBarCache !== '') {
                setNavbarStatus({...navbarStatusDefault, [navBarCache]:true});
                setNavBarCache('');
            }


            setSearchContent("");
        });
    } )

    useEffect(() => {
        // console.log(navbarStatus)
        console.log(navBarCache)
    },[navbarStatus])



    return (
        <div>
            <Grid container className="navbar">
                <Grid item xs={3.5} className="select" >
                    {/*https://www.positronx.io/react-detect-outside-click-to-hide-dropdown-element-tutorial/*/}
                        <img src={ins_logo} height="60%" />&nbsp;

                        <BsChevronDown
                            onClick={(e) => {
                                setHideDropDown(hideDropDown => !hideDropDown);
                                e.nativeEvent.stopImmediatePropagation();
                            }}
                            className="selectButton"
                        />

                        <div className="navBar_selectBar" hidden={hideDropDown}>
                            <DropDown setHideDropDown={setHideDropDown}/>
                        </div>
                </Grid>

                {
                    width < 650 ?
                        <div/>
                        :
                        <Grid item xs={3.5} className="navBar_search">
                            {
                                searchContent === '' ?
                                    <input type="text" placeholder=" 🔍 Search" className="navBar_inputFull" value={searchContent} onChange={handleSearchInputChange} onClick={e => e.nativeEvent.stopImmediatePropagation()}/>
                                    :
                                    <>
                                        <input type="text" placeholder=" 🔍 Search" className="navBar_input" value={searchContent} onChange={handleSearchInputChange} onClick={e => e.nativeEvent.stopImmediatePropagation()}/>
                                        <div className="navBar_inputText">
                                            <TiDelete className="navBar_inputDelete" onClick={() => setSearchContent("")}/>
                                        </div>

                                        <SearchResult/>
                                    </>

                            }
                        </Grid>
                }


                <Grid item xs={3} className="navBar_avatar" onClick={e=>e.nativeEvent.stopImmediatePropagation()}>

                    {navbarStatus.homepage ? <BsHouseDoorFill className="navBar_Click"/> :
                        <BsHouseDoor className="navBar_Click" onClick={e=>{
                            setNavbarStatus({...navbarStatusDefault, homepage: true});
                            setNavBarCache('');
                            alert("Navigate to HomePage")
                    }}/>}

                    {navbarStatus.message ? <IoPaperPlaneSharp className="navBar_Click"/> :
                    <IoPaperPlaneOutline className="navBar_Click" onClick={e => {
                        setNavbarStatus({...navbarStatusDefault, message: true});
                        setNavBarCache('');
                        alert("Navigate to Message")
                    }}/>}

                    {navbarStatus.newPost ? <BsPlusSquareFill className="navBar_Click"/> :
                        <BsPlusSquare className="navBar_Click" onClick={() => {
                            //open
                            if(!navbarStatus['newPost']){
                                const cache = Object.keys(navbarStatus).find(status => navbarStatus[status] === true);
                                setNavBarCache(cache);
                                setNavbarStatus({...navbarStatusDefault, newPost: true})
                            }
                            //close
                            else{
                                setNavbarStatus({...navbarStatusDefault, [navBarCache]:true});
                                setNavBarCache('')
                            }
                    }}/>}


                    {navbarStatus.explore ? <AiFillCompass className="navBar_Click"/> :
                        <AiOutlineCompass className="navBar_Click" onClick={e => {
                            setNavbarStatus({...navbarStatusDefault, explore: true});
                            setNavBarCache('');
                            alert("Navigate to Explore")
                        }}/>}
                    <BsHeart className="navBar_Click"/>
                    <div style={{position:"relative"}}>
                        <Avatar src="" sx={{height:"28px", width:"28px"}} style={navbarStatus.profile ? {border:"1px solid white",outline:"1px solid black"}:{}} className="navBar_Click" onClick={(e) => {
                            //open
                            if(!navbarStatus['profile']){
                                const cache = Object.keys(navbarStatus).find(status => navbarStatus[status] === true);
                                setNavBarCache(cache);
                                setNavbarStatus({...navbarStatusDefault, profile: true})
                            }
                            //close
                            else{
                                setNavbarStatus({...navbarStatusDefault, [navBarCache]:true});
                                setNavBarCache('')
                            }
                        }}/>
                        {navbarStatus.profile ?  <ProfileInfo/>: <div/>}
                    </div>

                </Grid>





                <Grid item xs={2}/>
            </Grid>


        </div>
    );
};

export default NavBar;