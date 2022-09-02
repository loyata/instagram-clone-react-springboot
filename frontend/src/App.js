import React from "react";
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/LoginPage/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import Display from "./components/Display/Display";
import NewPost from "./components/NewPost/NewPost";
import GeneralCard from "./components/GeneralCard/GeneralCard";



function App() {
  return (
    <div className="App">
        <div style={{display:"flex", flexDirection:"column"}}>
            {/*<LoginPage/>*/}
            {/*<SignUp/>*/}
            <HomePage/>
            {/*<PersonalPage/>*/}
            {/*<Display/>*/}
            {/*<NewPost/>*/}
        </div>
    </div>

  );
}

export default App;
