import React, {useEffect, useState} from 'react';
import "./SearchResult.css"
import {Avatar} from "@mui/material";
import {queryUser} from "../../../api";
import {useNavigate} from "react-router-dom";

const SearchResult = ({content, setSearchContent}) => {


    const [results, setresults] = useState([]);

    const query = async ()=>{
        const res = await queryUser(content);
        setresults(res.data)
    }

    const navigate = useNavigate()

    useEffect(() => {
        query();
    },[content])


    if(results.length === 0) return (
        <div className="searchResult_card" style={{display:"flex", alignItems:"center", justifyContent:"center", color:"rgb(170,170,170)", fontSize:"0.9rem"}}>
            No results found.
        </div>
    )

    return (
        <div className="searchResult_card" onClick={e => e.nativeEvent.stopImmediatePropagation()}>



                {results.map(result => (
                    <div className="searchResult_list" onClick={() => {
                        navigate(`/${result.userName}`)
                        setSearchContent('')
                    }}>
                        <Avatar src={result.avatar}/>
                        <div className="searchResult_name">
                            <div style={{fontSize:"1rem", fontWeight:"bolder"}}>{result.userName}</div>
                            <div style={{fontSize:"0.85rem", color:"rgb(175,175,175)", fontWeight:"bold"}}>{result.fullName}</div>
                        </div>
                    </div>
                ))}


        </div>
    );
};

export default SearchResult;