import React from 'react';
import "./SearchResult.css"
import {Avatar} from "@mui/material";

const SearchResult = () => {
    return (
        <div className="searchResult_card" onClick={e => e.nativeEvent.stopImmediatePropagation()}>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
            <div className="searchResult_list">
                <Avatar/>
                <div className="searchResult_name">
                    <div style={{fontSize:"1rem", fontWeight:"bolder"}}>Username</div>
                    <div style={{fontSize:"1rem", color:"rgb(175,175,175)"}}>Name</div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;