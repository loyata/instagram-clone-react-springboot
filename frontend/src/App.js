import React, {useEffect} from "react";
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/LoginPage/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import Display from "./components/Display/Display";
import NewPost from "./components/NewPost/NewPost";
import GeneralCard from "./components/GeneralCard/GeneralCard";
import MessagePage from "./components/MessagePage/MessagePage";

import {Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import Settings from "./components/Settings/Settings";
import jwt_decode from "jwt-decode";

import {useDispatch} from "react-redux";
import SwitchAccounts from "./components/MainContent/SwitchAccounts/SwitchAccounts";
import NewMessage from "./components/MessagePage/NewMessage/NewMessage";
import ThreeDots from "./components/MainContent/ThreeDots/ThreeDots";
import UnFollow from "./components/MainContent/UnFollow/UnFollow";
import ThreeDotsSelf from "./components/MainContent/ThreeDotsSelf/ThreeDotsSelf";
import DisplayNewPage from "./components/DisplayNewPage/DisplayNewPage";


function App() {


    const token = localStorage.getItem("token")


  return (
    <div className="App">
        <Routes>
            <Route path="/*" element={token === null ? <LoginPage/> : <HomePage/>}/>
            <Route path="/accounts/emailsignup" element={<SignUp/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>


    </div>

  );
}

export default App;
