import React, {useEffect, useRef, useState} from 'react';
import "./NewPost.css"
import "./cssgram.min.css"

import logoImg from "./images/img.png"
import balloon from "./images/balloon.png"

import {BsArrowLeft, BsArrowsAngleExpand, BsChevronDown,BsChevronUp, BsSquare} from "react-icons/bs"
import {BiLayerPlus} from "react-icons/bi"
import {MdOutlinePhotoSizeSelectLarge} from "react-icons/md"
import {FiImage} from "react-icons/fi"
import {TbRectangle, TbRectangleVertical} from "react-icons/tb";
import GeneralCard from "../GeneralCard/GeneralCard";
import CustomSlider from "./CustomSlider/CustomSlider";
import CustomSliderSingleDirection from "./CustomSliderSingleDirection/CustomSliderSingleDirection";

import * as htmlToImage from 'html-to-image'

import {useSelector, useDispatch} from "react-redux";
import {updateStateOuter} from "../../redux/navbarStatusSlice"

import {Buffer} from 'buffer';
import {Avatar} from "@mui/material";
import {AiOutlineSmile} from "react-icons/ai";
import {GoLocation} from "react-icons/go";

import {navigation} from "../../api";
import {GrClose} from "react-icons/gr";
import Picker from 'emoji-picker-react'

import {createPost} from "../../api";


import { v4 as uuidv4 } from 'uuid';
/**
 * switch
 */
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import jwt_decode from "jwt-decode";

export const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));


const AWS = require('aws-sdk')
const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY
AWS.config.update({ accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
const s3 = new AWS.S3();

const NewPost = () => {
    const imgRef = useRef(null);
    const imgParentRef = useRef(null);
    const imgFilterRef = useRef(null)

    const userInfo = useSelector(state => state.user);

    const [file, setFile] = useState(null); // current image to load
    const dispatch = useDispatch();
    const {navbarStatus, navbarCache} = useSelector(state => state.navbarStatus);

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

    /**
     * final stage
     */
    const [captionStage, setCaptionStage] = useState(false);
    const [captionContent, setCaptionContent] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [locationContent, setLocationContent] = useState('');
    const [locationFocus, setLocationFocus] = useState(false)
    const [timer, setTimer] = useState(0);
    const [locationResult, setLocationResult] = useState([]);
    const [disableLocation, setDisableLocation] = useState(false);
    const [accessOpen, setAccessOpen] = useState(false);
    const [accessContent, setAccessContent] = useState('');

    const [advancedOn, setAdvancedOn] = useState(false);
    const [hideLikeAndView, setHideLikeAndView] = useState(false);
    const [disableComment, setDisableComment] = useState(false);

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const {userId} = jwt_decode(token)
        setUserName(userId)
    },[])
    // const testLocationResult = ['Toronto, Ontario, Canada', 'Toronto Street, Ottawa, Ontario K1S 0N3, Canada', 'Toronto, Ohio, United States', 'Toronto, South Dakota, United States', 'Toronto, Iowa, United States', 'Toronto, Kansas, United States', 'Toronto Mbugani, Tanga, Tanzania', 'Toronto Street, Kingston, Ontario K7L 4A9, Canada', 'Toronto Road, Colborne, Ontario K0K 1S0, Canada', 'Toronto Road, Port Hope, Ontario L1A 3V5, Canada']


    useEffect(()=>{
        if(locationFocus && locationContent.length >= 3){
            const temp = setInterval(() => {
                setTimer(timer => timer + 1)
            },1000)
            return () => clearInterval(temp);
        }
    })

    useEffect(()=>{
        if(timer === 2){
            navigation(locationContent).then(data=>{
                setLocationResult(data.data.features.map(feature => feature.place_name))
            }).catch(error => console.log(error))
        }
    },[timer])



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
            setShowEmoji(false);
        });
    },[])

    // Update maxLeft when a new image is uploaded
    useEffect(() => {
        if(file)  {
            const container = document.getElementsByClassName("newPost_crop")[0];
            setCurrContainerSize([container.clientWidth, container.clientHeight])
        }
    },[file])


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


    const uploadImage = async () => {
        htmlToImage.toPng(imgParentRef.current).then(async function (dataUrl) {
            // download(dataUrl, "res.png")
            // console.log(dataUrl)
            const base64 = dataUrl

            const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = base64.split(';')[0].split('/')[1];
            const userId = 1;
            const params = {
                Bucket: S3_BUCKET,
                Key: uuidv4(), // type is not required
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64', // required
                ContentType: `image/${type}`, // required. Notice the back ticks

            }
            let location = '';
            let key = '';
            try {
                const {Location, Key} = await s3.upload(params).promise();
                location = Location;
                key = Key.split('-')[Key.split('-').length - 1];
            } catch (error) {
                console.log(error)
            }

            const postData = {
                postIdentifier:uuidv4().split('-')[uuidv4().split('-').length - 1],
                imageUrl:location,
                userId:userInfo.userId,
                postDate:new Date().toISOString(),
                postLocation:locationContent,
                postCaption:captionContent,
                postAlt:accessContent,
                postComments:0,
                postLikes:0,
                allowComment:disableComment,
                allowLike:hideLikeAndView
            }

            console.log(postData)

            await createPost(postData)

        })
    }

    const handleDiscard = () => {
        // alert("discard")
        if(stage === 0){
            dispatch(updateStateOuter());
        }
        setShowDiscardCard(true)


    }

    return (
        <div style={{position:"relative"}} onClick={e=> e.nativeEvent.stopImmediatePropagation()}>
            <div className="newPost_close" onClick={handleDiscard}>×</div>

            <div className="newPost_cardWrapper" style={{display:`${showDiscardCard && (stage !== 0) ? "block" : "none"}`}}>
                <GeneralCard setShowDiscardCard={setShowDiscardCard} setStage={setStage} setFile={setFile}/>
            </div>

            <div className="newPost_container" onClick={handleDiscard}>
                <div className="newPost_create" style={{display:`${stage === 0 ? "block" : "none"}`}}
                     onClick={e=> {e.stopPropagation()}}>
                    <div className="newPost_title" >Create New Post</div>
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
                <div className="newPost_create" style={{display:`${stage === 1 ? "block" : "none"}`}} onClick={e=> {
                    e.stopPropagation();
                }}>
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
                               onClick={e => e.stopPropagation()}
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

                          <div className="newPost_Slider" onClick={e=>e.stopPropagation()} style={{display:`${showIconBMenu ? "block" : "none"}`}}>
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
                              e.stopPropagation();
                              setShowIconAMenu(!showIconAMenu);
                              setShowIconBMenu(false)
                              setRatio(Math.floor(imgRef.current.naturalHeight / imgRef.current.naturalWidth * 100))
                          }}>
                              <BsArrowsAngleExpand />
                          </div>

                          <div className="newPost_icon newPost_iconB" onClick={
                              (e) => {
                                  e.stopPropagation();
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
                              onClick={() => {
                                  setShowIconAMenu(false);
                                  setShowIconBMenu(false);
                              }}
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

                <div className="newPost_edit" style={{display:`${stage === 2 ? "block" : "none"}`}} onClick={e=> {
                    setShowEmoji(false);
                    setShowIconAMenu(false);
                    setShowIconBMenu(false);
                    e.stopPropagation()
                }}>
                    <div className="newPost_title newPost_title_crop">
                        <BsArrowLeft className="newPost_bs" onClick={() => {
                            if(captionStage) setCaptionStage(false);
                            else {
                                setAdjValues({
                                    'Brightness': 0,
                                    'Contrast': 0,
                                    'Saturation': 0,
                                    'Temperature': 0,
                                    'Fade': 0,
                                    'Vignette': 0
                                })
                                setStage(1)
                            }
                        }}/>
                        <span>{captionStage? "Create New Post": "Edit"}</span>
                        <span className="newPost_next" onClick={(e)=>{
                            if(!captionStage) setCaptionStage(true)
                            else{
                                uploadImage();
                                alert("Success")
                                // setShowDiscardCard(false);
                                dispatch(updateStateOuter());
                                setFile(null)
                                e.nativeEvent.stopImmediatePropagation();

                            }
                        }}>{captionStage? "Share": "Next"}</span>
                    </div>
                    <div className="newPost_editPhoto">
                        <div className="newPost_editPhoto_left">
                            <div
                                id="containerDisplay"
                                className={`newPost_imgContainer ${allFilters[filter].toLowerCase()}`}
                                ref={imgParentRef}
                                onClick={() => {
                                    setShowIconAMenu(false);
                                    setShowIconBMenu(false);
                                }}
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
                        {
                            captionStage?
                                <div className="newPost_editPhoto_caption">
                                    <div className="newPost_captionContainer">
                                        <div className="newPost_avatar">
                                            <Avatar sx={{width:"30px", height:"30px"}} src={userInfo.avatar}/>
                                            <div><b>{userInfo.userName}</b></div>
                                        </div>

                                        <textarea
                                            placeholder="Write a caption..."
                                            onChange={event => setCaptionContent(event.target.value)}
                                            value={captionContent}
                                        />

                                        <div className="newPost_count">
                                            <div className="newPost_smile">
                                                <AiOutlineSmile onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowEmoji(!showEmoji);
                                                }}/>
                                                <div style={{position:"absolute", display:`${showEmoji?'block':'none'}`}} onClick={e=>e.stopPropagation()}>
                                                    <Picker onEmojiClick={(event, emojiObject) => {
                                                        setCaptionContent(captionContent => captionContent += emojiObject.emoji);
                                                    }}/>
                                                </div>
                                                 </div>
                                             <div style={{fontSize:"0.8rem"}}>{`${captionContent.length}/2,200`}</div>
                                        </div>
                                    </div>
                                    <div className="newPost_location">
                                        {
                                            disableLocation?
                                                <div className="newPost_locationDisabled">
                                                    {locationContent}
                                                </div>
                                                :
                                                <input
                                                    className="newPost_inputA"
                                                    placeholder="Add location"
                                                    type="text"
                                                    value={locationContent}
                                                    onChange={e => {
                                                        setLocationContent(e.target.value);
                                                        setTimer(0);
                                                    }}
                                                    onFocus={() => setLocationFocus(true)}
                                                    onBlur={() =>{
                                                        setLocationFocus(false);
                                                        setTimer(0);
                                                    }}

                                                />
                                        }
                                        <div className="GoLocation">
                                            {locationContent.length !== 0 ?
                                                <GrClose onClick={() => {
                                                    setLocationContent('');
                                                    setDisableLocation(false)
                                                }}/>
                                                :
                                                <GoLocation/>
                                            }
                                        </div>
                                    </div>

                                    <div className="newPost_remain">
                                        {locationContent !== '' && disableLocation === false ?
                                            <div className="newPost_searchResults">
                                                <ul className="newPost_location_ul">
                                                    {
                                                        locationResult.map(
                                                            (result, index) =>
                                                                <li
                                                                    className="newPost_location_li"
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setLocationContent(locationResult[index]);
                                                                        setDisableLocation(true)
                                                                    }}
                                                                >
                                                                    {result}
                                                                </li>
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                            :
                                            <div/>
                                        }
                                    </div>

                                    <div className="newPost_access"
                                         style={{display:`${locationContent !== '' && disableLocation === false ? 'none':'block'}`}}>
                                        <div style={{display:"flex", justifyContent:"space-between"}}>
                                            <div style={{fontWeight:`${accessOpen? 'bold':'unset'}`}}>Accessibility</div>
                                            <div
                                                className="newPost_up_and_down"
                                                onClick={() => setAccessOpen(!accessOpen)}
                                            >{accessOpen?<BsChevronUp/>:<BsChevronDown/>}</div>
                                        </div>

                                        <div style={{display:`${accessOpen ? 'block':'none'}`}}>
                                            <div style={{margin:"0.8rem 0", fontSize:"0.8rem", color:"rgb(143,143,143)"}}>
                                                Alt text describes your photos for people with visual impairments. Alt text will be automatically created for your photos or you can choose to write your own.
                                            </div>
                                            <div style={{display:"flex", alignItems:"center"}}>
                                                <img src={file} width="40px" height="40px"/>&nbsp;&nbsp;
                                                <input type="text"
                                                       className="newPost_inputB"
                                                       placeholder="Write alt text..."
                                                       value={accessContent}
                                                       onChange={e=>setAccessContent(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="newPost_access"
                                         style={{display:`${locationContent !== '' && disableLocation === false ? 'none':'block'}`}}
                                    >
                                        <div style={{display:"flex", justifyContent:"space-between"}}>
                                            <div style={{fontWeight:`${advancedOn? 'bold':'unset'}`}}>Advanced Settings</div>
                                            <div
                                                className="newPost_up_and_down"
                                                onClick={() => setAdvancedOn(!advancedOn)}
                                            >{advancedOn?<BsChevronUp/>:<BsChevronDown/>}</div>
                                        </div>

                                        <div style={{display:`${advancedOn ? 'block':'none'}`}}>
                                            <div style={{display:"flex", alignItems:"spaceBetween"}} className="newPost_switch">
                                                <div style={{margin:"0.3rem 0"}}>Hide like and view counts on this post</div>
                                                <div><AntSwitch
                                                    inputProps={{ 'aria-label': 'ant design' }}
                                                    checked={hideLikeAndView}
                                                    onChange={() => setHideLikeAndView(!hideLikeAndView)}
                                                /></div>
                                            </div>
                                            <div style={{fontSize:"0.8rem", color:"rgb(143,143,143)"}}>
                                                <div>
                                                    Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings.
                                                </div>
                                                <a className="newPost_href" target="_blank" href="https://help.instagram.com/113355287252104">Learn more</a>
                                            </div>

                                            <div style={{display:"flex", alignItems:"spaceBetween"}} className="newPost_switch">
                                                <div style={{margin:"0.5rem 0"}}>Turn off commenting</div>
                                                <div><AntSwitch
                                                    inputProps={{ 'aria-label': 'ant design' }}
                                                    checked={disableComment}
                                                    onChange={() => setDisableComment(!disableComment)}
                                                /></div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                :
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
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPost;