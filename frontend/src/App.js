import React from "react";
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



function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/direct/*" element={<MessagePage/>}/>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
        {/*<LoginPage/>*/}
        {/*<SignUp/>*/}
        {/*<HomePage/>*/}
        {/*<PersonalPage/>*/}
        {/*<Display/>*/}
        {/*<NewPost/>*/}
        {/*<MessagePage/>*/}
    </div>

  );
}

export default App;
