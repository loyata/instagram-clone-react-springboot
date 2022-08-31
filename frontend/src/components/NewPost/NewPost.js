import React, {useEffect, useState} from 'react';
import "./NewPost.css"

import logoImg from "./images/img.png"

import {BsArrowLeft} from "react-icons/bs"

const NewPost = () => {

    const [file, setFile] = useState(null);
    const [start, setStart] = useState([]);
    const [translation, setTranslation] = useState([]);
    const [maxLeft, setMaxLeft] = useState(0);
    const [showGrid, setShowGrid] = useState(false);


    useEffect(() => {
        if(file)  setMaxLeft(document.getElementById("target").clientWidth - document.getElementsByClassName("newPost_crop")[0].clientWidth);
    }, [file])


    const handleOnDragStart = event => {
        setStart([event.clientX, event.clientY]);
        setShowGrid(true);
    }

    const handleOnDrag = (event) => {
        if(event.clientX !== 0 && event.clientY !== 0){
            let left = event.clientX - start[0];
            let top = Math.floor((event.clientY - start[1])/5);
            setTranslation([left, top])
        }
    }

    const handleOnDragEnd = event => {
        let left = event.clientX - start[0];
        let top = 0;
        console.log(left, maxLeft)
        if(left > 0) left = 0;
        if(left < -maxLeft) left = -maxLeft;
        console.log(left)
        setTranslation([left, top]);
        setShowGrid(false);
    }


    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = URL.createObjectURL(event.target.files[0]);
        setFile(file => fileUploaded)
    };

    return (
        <div style={{position:"relative"}} >
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
                                <div style={showGrid?{display:"block"}:{display:"none"}}>
                                    <div className="newPost_grid newPost_gridA"/>
                                    <div className="newPost_grid newPost_gridB"/>
                                    <div className="newPost_grid newPost_gridC"/>
                                </div>
                                {file ?
                                      <img
                                          src={file}
                                          height="100%"
                                          id="target"
                                          onDragStart={handleOnDragStart}
                                          onDrag={handleOnDrag}
                                          onDragEnd={handleOnDragEnd}
                                          style={{top:`${translation[1]}px`, left:`${translation[0]}px`}}
                                      />
                                    :
                                    <div/>
                                }
                            </div>
                        </div>
                        :
                        <div className="newPost_create">
                            <div className="newPost_title">Create New Post</div>
                            <div className="newPost_body">
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