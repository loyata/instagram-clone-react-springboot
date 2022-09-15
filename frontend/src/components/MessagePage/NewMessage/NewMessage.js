import React, {useEffect, useState} from 'react';
import "./NewMessage.css"
import {useSelector} from "react-redux";
import {Avatar} from "@mui/material";
import {createSession, getUserById, queryUser} from "../../../api";
import { v4 as uuidv4 } from 'uuid';

const NewMessage = ({setShowNewMessage}) => {

    const [searchContent, setSearchContent] = useState('');
    const [users, setUsers] = useState([]);
    const [allowNext, setAllowNext] = useState(false);

    const [selectedUser, setSelectedUser] = useState(-1);

    const userInfo = useSelector(state => state.user);

    const handleSearchInputChange = (e) => {
        setSearchContent(e.target.value)
        setAllowNext(false)
    }

    const query = async (query) => {
        const res = await queryUser(query);
        setUsers(res.data.filter(user => user.userName !== userInfo.userName))
    }

    useEffect(() => {
        if(searchContent.length > 0) query(searchContent);
    },[searchContent])

    return (
        <div className="nm_ct" onClick={() => setShowNewMessage(false)}>
            <div className="nm_box" onClick={(e) => e.stopPropagation()}>
                <div className="nm_first">
                    <span style={{fontSize:"2rem"}}>×</span>
                    <span style={{fontSize:"1.1rem"}}>New Message</span>
                    <span style={{color:`${allowNext? "rgb(64,147,239)": "rgb(198,223,250)"}`}} className="nm_next" onClick={async () => {
                        if(allowNext){
                            const formData = {
                                sessionId:uuidv4(),
                                userAId:userInfo.userId,
                                userAName:userInfo.userName,
                                userAAvatar:userInfo.avatar,
                                userBId:selectedUser.userId,
                                userBName:selectedUser.userName,
                                userBAvatar:selectedUser.avatar,
                                sessionTimestamp:new Date().toISOString(),
                            }
                            await createSession(formData);
                            setShowNewMessage(false);
                        }

                    }}>Next</span>
                </div>
                <div className="nm_second">
                    <div>To:</div>
                    <div>
                        <input type="text" placeholder="Search..." className="nm_input"
                               value={searchContent} onChange={handleSearchInputChange}
                               onClick={e => e.nativeEvent.stopImmediatePropagation()}/>
                    </div>
                </div>

                <div style={{overflow:"auto", flex:"1 1 0"}}>
                    {users.map((user,index) => (
                        <div className="nm_third" key={index}
                            onClick={async () => {
                                setSearchContent(user.userName)
                                setAllowNext(true);
                                setSelectedUser(user);
                            }}
                        >
                            <div style={{display:"flex"}}>
                                <Avatar sx={{width:"45px", height:"45px"}} src={user.avatar}/>&nbsp;&nbsp;
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <div style={{fontSize:"0.9rem", fontWeight:"bold"}}>{user.userName}</div>
                                    <div style={{fontSize:"0.9rem", color:"rgb(160,160,160)", fontWeight:"550"}}>{user.fullName}</div>
                                </div>
                            </div>
                            {/*<div className="nm_round"/>*/}
                        </div>
                    ))}
                </div>




            </div>
        </div>
    );
};

export default NewMessage;