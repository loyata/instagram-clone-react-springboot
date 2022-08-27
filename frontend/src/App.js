import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/LoginPage/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import React from "react";
import PersonalPage from "./components/PersonalPage/PersonalPage";



function App() {
  return (
    <div className="App">
        <div style={{display:"flex", flexDirection:"column"}}>
            <LoginPage/>
            <hr/>
            <SignUp/>
            <hr/>
            <HomePage/>
            <PersonalPage/>
        </div>
    </div>

  );
}

export default App;
