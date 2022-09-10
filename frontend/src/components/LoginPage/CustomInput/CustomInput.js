import React, {useState} from 'react';
import "./CustomInput.css"


import {BsCheckCircle, BsXCircle} from "react-icons/bs";

const CustomInput = ({placeholder, validation, confidential, setSignUpInfo, setSignUpInfoKey, signUpInfo}) => {

    placeholder = placeholder || 'Email'

    if(!validation) validation = value => value.length >= 10

    confidential = confidential || false


    const setType = () => {
        if(confidential === false) return 'text'
        else{
            if(showPassword) return 'text'
            else return 'password'
        }
    }

    let placeholderStyles1 = {
        transform:`translate(0.6rem, 0)`,
        fontSize: "0.8rem"
    }
    let placeholderStyles2 = {
        transform:`translate(0.6rem, -0.5rem)`,
        fontSize: "0.6rem"
    }

    let inputStyle = {
        transform:`translate(0, 0.5rem)`
    }

    let borderColor = {
        borderColor:"rgb(143,143,143)"
    }



    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState('')
    const [fulfilled, setfulfilled] = useState(false)
    const [showPassword, setShowPassword] = useState(false)


    return (
        <div className="ci_container">
            <div className="ci_ph" style={value.length === 0 ? placeholderStyles1 : placeholderStyles2}>
                {placeholder}
            </div>
            <div className="ci_input" style={focus?borderColor:{}}>
                <input type={setType()}
                       onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)}
                       onChange={(e)=>{
                           setValue(e.target.value)
                           setfulfilled(validation(e.target.value))
                           setSignUpInfo({...signUpInfo, [setSignUpInfoKey]:e.target.value})
                       }}
                       style={value.length === 0 ? {} : inputStyle}
                />
            </div>
            <div className="ci_adorn" style={focus?borderColor:{}}>
                <div style={{display:`${value.length === 0 ? 'none' : 'flex'}`, alignItems:'center'}}>
                    <div className="ci_icon">
                        {fulfilled ? <BsCheckCircle style={{color:"rgb(165,167,170)"}}/> : <BsXCircle style={{color:"red"}}/> }
                    </div>
                </div>
                <div className="showPass" style={{display:`${confidential && value.length > 0 ? 'block' : 'none'}`}} onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword? 'hide':'show'}
                </div>
            </div>
        </div>
    );
};

export default CustomInput;