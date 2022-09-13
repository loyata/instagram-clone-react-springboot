import React, {useEffect, useState} from 'react';
import "./FriendCard.css"
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import {getFolloweesById, getUserById} from "../../../api";
import {useNavigate} from "react-router-dom";

const FriendCard = () => {


    const userInfo = useSelector(state => state.user);
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();

    const getAllFriends = async () => {
        const res = await getFolloweesById(userInfo.userId);
        const users = []
        if(res.data.length > 0){
            for(let follower of res.data){
                const user = await getUserById(follower.followeeId);
                users.push(user.data)
            }
            setFriends(users)
        }
    }

    useEffect(() => {
        if(userInfo.userId > 0){
            getAllFriends()
        }
    }, [userInfo.userId])



    return (
        <div className="friendCard_container">
            {friends.map((friend, index) => (
                <div className="friendCard_person" key={index} onClick={() => {
                    navigate(`/${friends[index].userName}`)
                }}>
                    <Avatar sx={{width:"55px", height:"55px"}} src={friends[index].avatar}/>
                    <div className="friendCard_text">{friends[index].userName}</div>
                </div>
            ))}
        </div>
    );
};

export default FriendCard;