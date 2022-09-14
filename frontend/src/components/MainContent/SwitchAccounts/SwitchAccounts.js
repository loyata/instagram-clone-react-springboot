import React, {useState} from 'react';
import "./SwitchAccounts.css"

import ins_logo from "./ins_logo.png"
import CustomInput from "../../LoginPage/CustomInput/CustomInput";
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import {logIn} from "../../../api";

const SwitchAccounts = ({setSwitchAccount}) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:'',
        // saveLogin: false
    });



    const [errMsg, setErrMsg] = useState('')

    const [checked, setChecked] = useState(false)

    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        setErrMsg('')
        try {
            const response = await logIn(loginInfo);

            if(response.data === "NO_SUCH_ACCOUNT") setErrMsg("The username you entered doesn't belong to an account. Please check your username and try again.")
            else if(response.data === "WRONG PASSWORD") setErrMsg("Sorry, your password was incorrect. Please double-check your password.")
            else {
                localStorage.setItem('token', response.data);
                setSwitchAccount(false)
                window.location.reload();
            }
        }catch (e){
            console.log(e)
        }
    }

    return (
        <div className="sa_ct" onClick={() => {setSwitchAccount(false)}}>
            <div className="sa_box" onClick={(e) =>e.stopPropagation()}>
                <div className="sa_cross" onClick={() => {setSwitchAccount(false)}}>×</div>
                <div className="sa_box_2">
                    <div className="sa_box_3">
                        <div className="sa_img">
                            <img src={ins_logo} width="45%"/>
                        </div>
                        <CustomInput
                            placeholder={"Email or Username"}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"email"}
                            signUpValidate={null}
                        />

                        <CustomInput
                            placeholder={"password"}
                            confidential={true}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"password"}
                            signUpValidate={null}
                        />

                        <div style={{width:"100%", display:"flex", justifyContent:"flex-start"}}>
                            <div  style={{transform:"translate(40%, 0px)", display:"flex", alignItems:"center"}}>
                                <Checkbox {...label} checked={checked} onChange={() => setChecked(!checked)}/>
                                <span style={{color:"rgb(79,79,79)", fontSize:"0.8rem"}}>Save login info</span>
                            </div>

                        </div>


                        <Button variant="contained"
                                id="loginButton"
                                size="small"
                            disabled={loginInfo.email.length === 0 || loginInfo.password.length === 0 }
                            onClick={handleSubmit}
                        >Log In</Button>

                        <div className="err_msg" style={{width:"80%", fontSize:"0.9rem", color:"red", textAlign:"center", padding:"1rem"}}>
                            {errMsg}
                        </div>

                        <div style={{color:"rgb(55,83,126)", fontSize:"0.8rem"}}>Forgot password?</div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SwitchAccounts;