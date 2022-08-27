import React, {useEffect, useState} from 'react';


import imgContainer from "../images/phoneContainer.png";

import content1 from "../images/content1.png";
import content2 from "../images/content2.png";
import content3 from "../images/content3.png";
import content4 from "../images/content4.png";

import "./PhonePicture.css"



const PhonePicture = () => {

    const pictures = [content1, content2, content3, content4]

    const [index, setIndex] = useState(0);

    //https://stackoverflow.com/questions/69860978/how-to-increment-a-state-variable-every-second-in-react
    //setState直接写和回调写法有什么区别?

    useEffect(()=>{
        const timer = setInterval(()=>{
            setIndex((index) => index + 1 < 4 ? index + 1 : 0)
        }, 1500)
        return ()=>clearInterval(timer)
    }, [])


    return (
        <div>
            <div className="imgContainer">
                <div className="imgBase">
                    <img src={imgContainer} height="100%" />
                </div>
                {/*<div className="imgContent">*/}
                {/*    <img src={pictures[index]} height="100%" className="scale-in-center"/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default PhonePicture;