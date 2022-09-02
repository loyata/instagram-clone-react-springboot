import React, {useEffect, useRef, useState} from 'react';
import "./NewPost.css"
import "./cssgram.min.css"

import logoImg from "./images/img.png"
import balloon from "./images/balloon.png"

import {BsArrowLeft, BsArrowsAngleExpand, BsSquare} from "react-icons/bs"
import {BiLayerPlus} from "react-icons/bi"
import {MdOutlinePhotoSizeSelectLarge} from "react-icons/md"
import {FiImage} from "react-icons/fi"
import {TbRectangle, TbRectangleVertical} from "react-icons/tb";
import GeneralCard from "../GeneralCard/GeneralCard";
import CustomSlider from "./CustomSlider/CustomSlider";
import CustomSliderSingleDirection from "./CustomSliderSingleDirection/CustomSliderSingleDirection";

import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from "downloadjs"


const NewPost = () => {


    const imgRef = useRef(null);
    const imgParentRef = useRef(null);
    const imgFilterRef = useRef(null)

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
     * Stage 1 => Crop
     * Stage 2 => Filter
     */
    const [stage, setStage] = useState(0);
    const [showDiscardCard, setShowDiscardCard] = useState(false)



    const [sliderStart, setSliderStart] = useState(0);  // mouse position onDragStart
    const [sliderMove, setSliderMove] = useState(0);
    const [sliderStartInitialized, setSliderStartInitialized] = useState(false)

    /**
     * 0 => Filters
     * 1 => Adjustments
     */
    const [adjustment, setAdjustment] = useState(0);

    const [filter, setFilter] = useState(0);

    const allFilters = ['Original', 'Clarendon', 'Gingham', 'Moon',
                        'Lark', 'Reyes', 'Juno', 'Slumber', 'Crena',
                        'Ludwig', 'Aden','Perpetua']

    const allAdjustments = ['Brightness', 'Contrast', 'Saturation', 'Temperature', 'Fade', 'Vignette']

    const [adjValues, setAdjValues] = useState({
        'Brightness': 0,
        'Contrast': 0,
        'Saturation': 0,
        'Temperature': 0,
        'Fade': 0,
        'Vignette': 0
    });

    const [adjValuesMapping, setAdjValuesMapping] = useState({
        'brightness': 100,
        'contrast': 100,
        'saturate': 100,
        'opacity': 100,
        'vignette': 0,
        'temperature_opacity': 0
    });

    useEffect(() => {
        let brightness, contrast, saturate, opacity, vignette, temperature_opacity;

        const {Brightness, Contrast, Saturation, Temperature, Fade, Vignette} = adjValues;

        brightness = 100 + Math.floor(Brightness/(100 - (-100)) * (140 - 60));
        contrast = 100 + Math.floor(Contrast/(100 - (-100)) * (130 - 70));
        saturate = 100 + Math.floor(Saturation/(100 - (-100)) * (200 - 0));

        temperature_opacity = Math.abs(Temperature) / 800;

        if(Fade >= 0) opacity = 100 + Math.floor(Fade / (100 - 0) * (80 - 100));
        else {
            contrast += Math.floor(Fade / (0 - (-100)) * (100 - 120));
            opacity = 100;
        }

        vignette = 0 + Math.floor(Vignette/(100 - (0)) * (200 - 0));


        setAdjValuesMapping({brightness, contrast, saturate, opacity, vignette, temperature_opacity})
    },[adjValues])


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


    // useEffect(() => {
    //     console.log(adjValues)
    // },[adjValues])


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
        setStage(1);
    };


    const uploadImage = () => {
        htmlToImage.toPng(imgParentRef.current).then(function (dataUrl) {
            download(dataUrl, "res.png")
        })
    }

    return (
        <div style={{position:"relative"}} >
            <div className="newPost_close">×</div>
            <div className="newPost_cardWrapper" style={{display:`${showDiscardCard && stage === 1 ? "block" : "none"}`}}>
                <GeneralCard setShowDiscardCard={setShowDiscardCard} setStage={setStage}/>
            </div>
            <div className="newPost_container">
                <div className="newPost_create" style={{display:`${stage === 0 ? "block" : "none"}`}}>
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
                        <div className="newPost_button" onClick={handleClick}>
                            Select from computer
                        </div>
                    </div>
                </div>
                <div className="newPost_create" style={{display:`${stage === 1 ? "block" : "none"}`}}>
                      <div className="newPost_title newPost_title_crop">
                          <BsArrowLeft className="newPost_bs" onClick={() => {
                                setShowDiscardCard(true)
                          }}/>
                          <span>Crop</span>
                          <span className="newPost_next" onClick={() => setStage(2)}>Next</span>
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
                                          setSliderMove(0);
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
                                          setSliderMove(0);
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
                                          setSliderMove(0);
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
                                          setSliderMove(0);
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
                <div className="newPost_edit" style={{display:`${stage === 2 ? "block" : "none"}`}}>
                    <div className="newPost_title newPost_title_crop">
                        <BsArrowLeft className="newPost_bs" onClick={() => {
                            setAdjValues({
                                'Brightness': 0,
                                    'Contrast': 0,
                                    'Saturation': 0,
                                    'Temperature': 0,
                                    'Fade': 0,
                                    'Vignette': 0
                            })
                            setStage(1)
                        }}/>
                        <span>Edit</span>
                        <span className="newPost_next" onClick={uploadImage}>Next</span>
                    </div>
                    <div className="newPost_editPhoto">
                        <div className="newPost_editPhoto_left">
                            <div
                                id="containerDisplay"
                                className={`newPost_imgContainer ${allFilters[filter].toLowerCase()}`}
                                ref={imgParentRef}
                                style={{
                                    width:`${imageStatus.containerWidth}`,
                                    height:`${imageStatus.containerHeight}`,
                                }}
                            >
                                <img
                                    src={file}
                                    id="imageDisplay"
                                    draggable="false"
                                    ref={imgFilterRef}
                                    style={{
                                        width:`${imageStatus.width}`,
                                        height:`${imageStatus.height}`,
                                        position:`${imageStatus.position}`,
                                        objectFit:`cover`,
                                        transform:`translate(${imageStatus.translationX}px, ${imageStatus.translationY}px) scale(${imageStatus.scale})`,
                                        filter:`brightness(${adjValuesMapping.brightness}%) contrast(${adjValuesMapping.contrast}%) saturate(${adjValuesMapping.saturate}%) opacity(${adjValuesMapping.opacity}%)`,

                                    }}
                                />

                                <div className="newPost_imageCover" style={{
                                    position:`absolute`,
                                    background:`${adjValues.Temperature >= 0 ? `rgba(255,255,0,${adjValuesMapping.temperature_opacity})` : `rgba(0,0,255,${adjValuesMapping.temperature_opacity})`}`,
                                    boxShadow:`inset 0px 0px ${adjValuesMapping.vignette}px black`,
                                    width:`${imgParentRef.current?.offsetWidth || 0}px`,
                                    height:`${imgParentRef.current?.offsetHeight || 0}px`,
                                }}/>

                            </div>
                        </div>
                        <div className="newPost_editPhoto_right">
                            <div className="newPost_editPhoto_right_selectors">
                                <div
                                    className={`newPost_editPhoto_right_selector${adjustment === 0 ? " newPost_highlight" : ""}`}
                                    onClick={() => setAdjustment(0)}
                                >Filters</div>
                                <div
                                    className={`newPost_editPhoto_right_selector${adjustment === 1 ? " newPost_highlight" : ""}`}
                                    onClick={() => setAdjustment(1)}
                                >Adjustments</div>
                            </div>
                            <div>
                                {
                                    adjustment === 0 ?
                                    <div className="newPost_filters" >
                                    {
                                        allFilters.map((singleFilter, id) => (
                                            <div
                                                className={`newPost_filter${filter === id ? " newPost_filter_highlight" : ""}`}
                                                key={id}
                                                onClick={() => setFilter(id)}
                                            >
                                                <div className={`${singleFilter.toLowerCase()}`}>
                                                    <img src={balloon} width="100%" draggable="false"/>
                                                </div>
                                                <div>{singleFilter}</div>
                                            </div>
                                        ))
                                    }
                                </div >:
                                        <div className="newPost_adjustments" >
                                            {
                                                allAdjustments.slice(0, allAdjustments.length - 1).map((adjName, index) => (
                                                    <CustomSlider key={index} adjName={adjName} adjValues={adjValues} setAdjValues={setAdjValues}/>
                                                ))
                                            }
                                            <CustomSliderSingleDirection adjName={allAdjustments[allAdjustments.length - 1]} adjValues={adjValues} setAdjValues={setAdjValues}/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPost;