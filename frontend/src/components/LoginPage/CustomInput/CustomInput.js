import React, {useEffect, useRef, useState} from 'react';
import "./CustomInput.css"


import {BsCheckCircle, BsXCircle} from "react-icons/bs";

const CustomInput = ({placeholder, confidential, setSignUpInfo, SignUpKey, signUpInfo, signUpValidate,setSignUpValidate,validation, defaultValue}) => {

    placeholder = placeholder || 'Email'

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
    const [showPassword, setShowPassword] = useState(false)
    const ref = useRef(null);

    useEffect(() => {
        if(defaultValue !== '' && defaultValue !== undefined){
            ref.current.value = defaultValue
            setValue('x')
        }
    },[defaultValue])


    return (
        <div className="ci_container">
            <div className="ci_ph" style={value.length === 0 ? placeholderStyles1 : placeholderStyles2}>
                {placeholder}
            </div>
            <div className="ci_input" style={focus?borderColor:{}}>
                <input type={setType()}
                       ref={ref}
                       onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)}
                       onChange={(e)=>{
                           setValue(e.target.value)
                           setSignUpInfo({...signUpInfo, [SignUpKey]:e.target.value})
                           if(signUpValidate !== null) validation(e.target.value)
                       }}
                       style={value.length === 0 ? {} : inputStyle}
                />
            </div>

                <div className="ci_adorn" style={focus?borderColor:{}}>
                    {signUpValidate === null ? <div/> :
                        <div style={{display: `${value.length === 0 ? 'none' : 'flex'}`, alignItems: 'center'}}>
                            <div className="ci_icon">
                                {signUpValidate[SignUpKey] ? <BsCheckCircle style={{color: "rgb(165,167,170)"}}/> :
                                    <BsXCircle style={{color: "red"}}/>}
                            </div>
                        </div>
                    }
                    <div className="showPass" style={{display:`${confidential && value.length > 0 ? 'block' : 'none'}`}} onClick={() => {setShowPassword(!showPassword)}}>
                        {showPassword? 'hide':'show'}
                    </div>
                </div>


        </div>
    );
};

export default CustomInput;