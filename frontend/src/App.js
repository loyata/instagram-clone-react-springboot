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


function App() {


    const token = localStorage.getItem("token")


  return (
    <div className="App">
        <Routes>
            <Route path="/*" element={token === null ? <LoginPage/> : <HomePage/>}/>
            <Route path="/accounts/emailsignup" element={<SignUp/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>

        {/*<SignUp/>*/}
        {/*<HomePage/>*/}
        {/*<PersonalPage/>*/}
        {/*<Display/>*/}
        {/*<NewPost/>*/}
        {/*<MessagePage/>*/}
        {/*<SwitchAccounts/>*/}
    </div>

  );
}

export default App;
