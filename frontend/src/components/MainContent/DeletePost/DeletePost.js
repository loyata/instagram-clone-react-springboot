import React from 'react';
import "./DeletePost.css"
import {useSelector} from "react-redux";
import {deletePost} from "../../../api";


const DeletePost = ({setDeletePost}) => {


    const {postInfo} = useSelector(state => state.post)


    return (
        <div className="delete_container" onClick={()=>{setDeletePost(false)}}>
            <div className="delete_main" onClick={(event)=>{event.stopPropagation()}}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    padding:"2rem",
                    gap:"0.5rem"
                }}>
                    <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>Delete Post?</div>
                    <div style={{color:"rgb(143,143,143)"}}>Are you sure you want to delete this post?</div>
                </div>
                <div className="delete_selections">
                    <div onClick={async () => {
                        await deletePost(postInfo.postId)
                        setDeletePost(false)
                        window.location.reload();
                    }}>Delete</div>
                    <div onClick={() => {
                        setDeletePost(false);
                    }}>Cancel</div>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;