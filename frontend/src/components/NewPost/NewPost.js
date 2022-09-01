import React, {useEffect, useRef, useState} from 'react';
import "./NewPost.css"

import logoImg from "./images/img.png"

import {BsArrowLeft, BsArrowsAngleExpand, BsSquare} from "react-icons/bs"
import {BiLayerPlus} from "react-icons/bi"
import {MdOutlinePhotoSizeSelectLarge} from "react-icons/md"
import {FiImage} from "react-icons/fi"
import {TbRectangle, TbRectangleVertical} from "react-icons/tb";
import {Slider} from "@mui/material";

const NewPost = () => {


    const imgRef = useRef(null);
    const imgParentRef = useRef(null);

    const [file, setFile] = useState(null); // current image to load



    const [start, setStart] = useState([]);  // mouse position onDragStart
    // const [translation, setTranslation] = useState([]);  // shift from start
    const [imageStatus, setImageStatus] = useState({
                                                    width: "auto",
                                                    height: "100%",
                                                    position: "absolute",
                                                    containerWidth: "100%",
                                                    containerHeight: "100%",
                                                    translationX:0,
                                                    translationY:0,
                                                    translationXBase:0,
                                                    translationYBase:0,
                                                    scale:1,
                                                });

    const [currContainerSize, setCurrContainerSize] = useState([]);
    const [maxShift, setMaxShift] = useState([0,0]);


    const [showGrid, setShowGrid] = useState(false);  // show 3*3 grid when click on the image
    const [showIconAMenu, setShowIconAMenu] = useState(false)
    const [showIconBMenu, setShowIconBMenu] = useState(false)
    const [ratio, setRatio] = useState(1);

    /**
     * Set image crop size
     * Original => 0  (width: 100%)
     * 1:1 => 1 (default)  (height: 100%)
     * 4:5 => 2
     * 16:9 => 3
     */
    const [imageSize, setImageSize] = useState(1);


    /**
     * Stage 0 => Upload
     * Stage 1 => Discard Post
     * Stage 2 => Crop
     * Stage 3 => Filter
     */
    const [stage, setStage] = useState(0);



    const [sliderStart, setSliderStart] = useState(0);  // mouse position onDragStart
    const [sliderMove, setSliderMove] = useState(0);
    const [sliderStartInitialized, setSliderStartInitialized] = useState(false)


    useEffect(() => {
        document.addEventListener("click", () => {
            setShowIconAMenu(false);
            setShowIconBMenu(false);
        });
    }, [])

    // Update maxLeft when a new image is uploaded
    useEffect(() => {
        if(file)  {


            const currImg = document.getElementById("target");
            const container = document.getElementsByClassName("newPost_crop")[0];

            setCurrContainerSize([container.clientWidth, container.clientHeight])
        }
    },[file])


    useEffect(() => {
        console.log(showIconBMenu)
    },[showIconBMenu])


    const calculateMaxShift = () => {
        let containerX = imgParentRef.current.clientWidth;
        let containerY = imgParentRef.current.clientHeight;
        let scale = imageStatus.scale;
        let maxShiftX = Math.floor((imgRef.current.clientWidth * scale - containerX) / 2);
        let maxShiftY = Math.floor((imgRef.current.clientHeight * scale - containerY) / 2);
        return [maxShiftX, maxShiftY]
    }

    const handleOnDragStart = event => {
        setStart([event.clientX, event.clientY]);
        setShowGrid(true);
        setMaxShift(calculateMaxShift());
    }

    const handleOnDrag = (event) => {
        if(event.clientX !== 0 && event.clientY !== 0){
            let left = event.clientX - start[0];
            let top = (event.clientY - start[1]);
            // if shift has exceeded the container edge, slow down the moving speed by 10x
            const [maxShiftX, maxShiftY] = maxShift;
            if(left > maxShiftX || left < -maxShiftX) left /= 10;
            if(top > maxShiftY || top < -maxShiftY) top /= 10;
            setImageStatus({...imageStatus, translationX: left + imageStatus.translationXBase, translationY: top + imageStatus.translationYBase})
        }
    }

    const handleOnDragEnd = event => {

        const [maxShiftX, maxShiftY] = maxShift;

        let actualX = imageStatus.translationX;
        let actualY = imageStatus.translationY;

        if(actualX > maxShiftX) actualX = maxShiftX;
        if(actualX < -maxShiftX) actualX = -maxShiftX;

        if(actualY > maxShiftY) actualY = maxShiftY;
        if(actualY < -maxShiftY) actualY = -maxShiftY;


        setImageStatus({...imageStatus, translationXBase: actualX, translationYBase: actualY, translationX: actualX, translationY: actualY})
        setShowGrid(false);
    }


    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = URL.createObjectURL(event.target.files[0]);
        setFile(file => fileUploaded)

        /**
         * Todo
         * check if the upload is successful
         */
        setStage(2);
    };




    return (
        <div style={{position:"relative"}} >

            {/*<canvas id={"blankCanvas"}/>*/}
            <div className="newPost_close">×</div>
            <div className="newPost_container">
                {
                    file?
                        <div className="newPost_create">
                            <div className="newPost_title newPost_title_crop">
                                <BsArrowLeft style={{fontSize:"1.5rem"}}/>
                                <span>Crop</span>
                                <span style={{fontSize:"0.9rem", color:"rgb(65,147,239)"}}>Next</span>
                            </div>


                            <div className="newPost_crop">

                                <div style={showGrid?{display:"block"}:{display:"none"}} className="newPost_gridContainer">
                                    <div className="newPost_grid newPost_gridA"/>
                                    <div className="newPost_grid newPost_gridB"/>
                                    <div className="newPost_grid newPost_gridC"/>
                                </div>

                                <div className="newPost_iconAMenu"
                                     style={{display:`${showIconAMenu ? "block" : "none"}`}}
                                     onClick={e=>e.nativeEvent.stopImmediatePropagation()}
                                >
                                    <ul className="newPost_iconAMenu_ul">
                                        <li
                                            className={`newPost_iconAMenu_li ${imageSize === 0 ? 'newPost_iconAMenu_highlight' : ''}`}
                                            onClick={() => {
                                                setRatio(Math.floor(document.getElementById("target").clientHeight / document.getElementById("target").clientWidth * 100));
                                                setImageSize(0);
                                                setImageStatus({
                                                    ...imageStatus,
                                                    height:"unset",
                                                    width:"100%",
                                                    containerHeight: `${ratio}%`,
                                                    containerWidth: "100%",
                                                    translationX: 0,
                                                    translationY: 0,
                                                    translationXBase: 0,
                                                    translationYBase: 0,
                                                    scale: 1
                                                })}}
                                        >
                                            <div>Original</div>
                                            <FiImage style={{fontSize:"1.3rem"}}/>
                                        </li>

                                        <li
                                            className={`newPost_iconAMenu_li ${imageSize === 1 ? 'newPost_iconAMenu_highlight' : ''}`}
                                            onClick={() => {
                                                setImageSize(1);
                                                setImageStatus({
                                                    ...imageStatus,
                                                    height:"100%",
                                                    width:"unset",
                                                    containerHeight: "100%",
                                                    containerWidth: "100%",
                                                    translationX: 0,
                                                    translationY: 0,
                                                    translationXBase: 0,
                                                    translationYBase: 0,
                                                    scale: 1
                                                })}}
                                        >
                                            <div>1:1</div>
                                            <BsSquare style={{fontWeight:"bold"}}/>
                                        </li>

                                        <li
                                            className={`newPost_iconAMenu_li ${imageSize === 2 ? 'newPost_iconAMenu_highlight' : ''}`}
                                            onClick={() => {
                                                setImageSize(2);
                                                setImageStatus({
                                                    ...imageStatus,
                                                    height:"100%",
                                                    width:"unset",
                                                    containerHeight: "100%",
                                                    containerWidth: `${currContainerSize[0] * 0.8}px`,
                                                    translationX: 0,
                                                    translationY: 0,
                                                    translationXBase: 0,
                                                    translationYBase: 0,
                                                    scale: 1
                                                })
                                            }}
                                        >
                                            <div>4:5</div>
                                            <TbRectangle style={{fontSize:"1.3rem"}}/>
                                        </li>

                                        <li
                                            className={`newPost_iconAMenu_li ${imageSize === 3 ? 'newPost_iconAMenu_highlight' : ''}`}
                                            onClick={() => {
                                                setImageSize(3);
                                                setImageStatus({
                                                    ...imageStatus,
                                                    height:"unset",
                                                    width:"100%",
                                                    containerHeight: `${currContainerSize[0] * 9 / 16}px`,
                                                    containerWidth: "100%",
                                                    translationX: 0,
                                                    translationY: 0,
                                                    translationXBase: 0,
                                                    translationYBase: 0,
                                                    scale: 1
                                                })}}
                                        >
                                            <div>16:9</div>
                                            <TbRectangleVertical style={{fontSize:"1.3rem"}}/>
                                        </li>
                                    </ul>
                                </div>

                                <div className="newPost_Slider" onClick={e=>e.nativeEvent.stopImmediatePropagation()} style={{display:`${showIconBMenu ? "block" : "none"}`}}>
                                    <div style={{width:"100%", height:"100%", display:"flex"}}>
                                        <div className="newPost_SliderLeft" style={{width:`${sliderMove + 10}px`}}>
                                            <hr id={"leftHr"}/>
                                            <div className="ball"
                                                 draggable="true"
                                                 onDragStart={e=>{
                                                     if(sliderStartInitialized === false){
                                                         setSliderStart(e.clientX)
                                                         setSliderStartInitialized(true)
                                                     }
                                                     // const blankCanvas = document.getElementById("blankCanvas")
                                                        const img = new Image();
                                                     e.dataTransfer.setDragImage(img, 0, 0);
                                                 }}
                                                 onDrag={e=>{
                                                     if(e.clientX !== 0){
                                                         let val = e.clientX - sliderStart;
                                                         if(val < 0) val = 0;
                                                         if(val > 92) val = 92;
                                                         setSliderMove(val);
                                                         setImageStatus({...imageStatus, scale:(1+val/92)});
                                                     }
                                                 }}

                                                 style={{
                                                     left:`${sliderMove}px`
                                                 }}
                                            />
                                        </div>
                                        <div className="newPost_SliderRight">
                                            <hr id="rightHr"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="newPost_icon newPost_iconA" onClick={(e) => {
                                    setShowIconAMenu(!showIconAMenu);
                                    setShowIconBMenu(false)
                                    e.nativeEvent.stopImmediatePropagation();
                                    setRatio(Math.floor(imgRef.current.naturalHeight / imgRef.current.naturalWidth * 100))
                                }}>
                                    <BsArrowsAngleExpand />
                                </div>

                                <div className="newPost_icon newPost_iconB" onClick={
                                    (e) => {
                                        e.nativeEvent.stopImmediatePropagation();
                                        setShowIconBMenu(!showIconBMenu);
                                        setShowIconAMenu(false);
                                    }
                                }>
                                    <MdOutlinePhotoSizeSelectLarge/>
                                </div>

                                <div className="newPost_icon newPost_iconC">
                                    <BiLayerPlus/>
                                </div>

                                <div
                                    className="newPost_imgContainer"
                                    ref={imgParentRef}
                                    style={{
                                    width:`${imageStatus.containerWidth}`,
                                    height:`${imageStatus.containerHeight}`,
                                }}
                                >
                                    <img
                                        src={file}
                                        id="target"
                                        onDragStart={handleOnDragStart}
                                        onDrag={handleOnDrag}
                                        onDragEnd={handleOnDragEnd}
                                        style={{
                                            width:`${imageStatus.width}`,
                                            height:`${imageStatus.height}`,
                                            position:`${imageStatus.position}`,
                                            objectFit:`scale-down`,
                                            transform:`translate(${imageStatus.translationX}px, ${imageStatus.translationY}px) scale(${imageStatus.scale})`,
                                        }}
                                        ref={imgRef}
                                    />
                                </div>

                            </div>
                        </div>
                        :
                        <div className="newPost_create">
                            <div className="newPost_title">Create New Post</div>
                            <div className="newPost_body" >
                                <img src={logoImg} />
                                <div style={{fontSize:"1.3rem"}}>Drag photos and videos here</div>

                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    style={{display: 'none'}}
                                    onChange={handleChange}
                                />
                                {file ? <img src={file} width="100%"/> : <div/>}
                                <div className="newPost_button" onClick={handleClick}>
                                    Select from computer
                                </div>
                            </div>
                        </div>
                }

            </div>

        </div>

    );
};

export default NewPost;