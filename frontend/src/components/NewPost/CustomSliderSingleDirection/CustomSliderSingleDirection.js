import React, {useEffect, useRef, useState} from 'react';
import "../CustomSlider/CustomSlider.css"
import blank from "../CustomSlider/img.png";

const CustomSliderSingleDirection = ({adjName, adjValues, setAdjValues}) => {
    const [value, setValue] = useState(0);
    const [startLocation, setStartLocation] = useState(0);
    const [shift, setShift] = useState(0);
    const [move, setMove] = useState(0);
    const [widthLeft, setWidthLeft] = useState(0);
    const [widthRight, setWidthRight] = useState(0);
    const containerRef = useRef(null);
    const ballRef = useRef(null);
    const test = useRef(null);

    let name = adjName || 'Name'

    useEffect(() => {
        setAdjValues({...adjValues, [adjName]:value})
    },[value])

    return (
        <div className="slider">
            <div className="slider_title">
                <div>{name}</div>
                {value !== 0 ?
                    <div className="slider_reset" onClick={() => {
                        setStartLocation(0);
                        setShift(0);
                        setMove(0);
                        setWidthLeft(0);
                        setWidthRight(0);
                        setValue(0);
                    }
                    }>Reset</div>
                    : ''}
            </div>
            <div className="slider_total">
                <div className="slider_container">
                    <div className="slider_container2" ref={containerRef}>

                        <div className="slider_container2_right">
                            <div className="slider_container2_right_left" style={{width:`${widthRight}px`}}>
                                <div className="slider_hr slider_hr_highlight"/>
                            </div>
                            <div className="slider_container2_right_right">
                                <div className="slider_hr"/>
                            </div>
                        </div>


                        <div className="slider_ball slider_ball_sd"
                             draggable="true"
                             ref={ballRef}
                             style={{transform:`translate(calc(${shift}px), 0)`}}
                             onDragStart={(event) => {
                                 document.body.style.cursor = "move"
                                 setStartLocation(event.clientX)
                                 event.dataTransfer.setDragImage(test.current, 0, 0);
                             }}
                             onDrag={(event)=>{
                                 if(event.clientX !== 0){
                                     let diff = event.clientX - startLocation;
                                     const maxMove = containerRef.current.offsetWidth  - ballRef.current.offsetWidth;

                                     let shift = move + diff;
                                     if(shift > maxMove) shift = maxMove;
                                     if(shift < 0) shift = 0;

                                     if(shift < 0) setWidthRight(0)
                                     if(shift >= 0) {
                                         setWidthRight(shift)
                                         setWidthLeft(0)
                                     }

                                     setValue(Math.floor(shift/maxMove * 100))
                                     setShift(shift);
                                 }
                             }}
                             onDragEnd={(e) => {
                                 document.body.style.cursor = "default"
                                 setMove(shift)
                             }}
                        />
                    </div>
                </div>
                <div className="slider_text">{value}</div>
                <img src={blank} width="1px" ref={test}/>
            </div>
        </div>


    );
};

export default CustomSliderSingleDirection;