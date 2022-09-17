import React, {useEffect, useState} from 'react';
import "./ReportInfo.css"
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {checkIsFollowing, followUser, getFolloweesById, getRecentFollows} from "../../../api";
import moment from "moment";

const ReportInfo = () => {


    const [noticesThisMonth, setNoticesThisMonth] = useState([]);
    const [noticesEarlier, setNoticesEarlier] = useState([]);

    function getDateOneMonthAgo() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30).toISOString();
    }

    const userInfo = useSelector(state => state.user);

    useEffect(() => {
        const getFollowees = async () => {
            const res = await getRecentFollows(userInfo.userId, 10);
            const thisMonth = res.data.filter((follow) => follow.followTimestamp >= getDateOneMonthAgo())
            const temp = []
            for(let follow of thisMonth){
                const isFollowed = await checkIsFollowing({followerId: userInfo.userId, followeeId: follow.userId})
                follow = {...follow, isFollowed: isFollowed.data}
                temp.push(follow)
            }
            setNoticesThisMonth(temp);

            const earlier = res.data.filter((follow) => follow.followTimestamp < getDateOneMonthAgo())
            const temp2 = []
            for(let follow of earlier){
                const isFollowed = await checkIsFollowing({followerId: userInfo.userId, followeeId: follow.userId})
                follow = {...follow, isFollowed: isFollowed.data}
                temp2.push(follow)
            }
            setNoticesEarlier(temp2);
        }
        getFollowees();
    },[])



    return (
        <div className="reportInfo_container">
            <div>
                <div style={{fontSize:"0.9rem", fontWeight:"bold", margin:"0.5rem"}}>This Month</div>
                {noticesThisMonth.map((notice,index) => (
                    <div className="reportInfo_detail" key={index}>
                        <div className="reportInfo_avatar">
                            <Avatar sx={{width:"35px", height:"35px"}} src={notice.avatar}/>
                        </div>
                        <div style={{fontSize:"0.9rem"}} className="reportInfo_text">
                            <b>{notice.userName}</b> started following you. <span style={{color:"rgb(154,154,154)", whiteSpace:"no-wrap"}}>&nbsp;{moment(new Date(notice.followTimestamp)).fromNow()}</span>
                        </div>
                        {
                            notice.isFollowed ?
                                <div className="reportInfo_button" style={{backgroundColor:"white", color:"black"}}>
                                    <div>Following</div>
                                </div>
                                :
                                <div className="reportInfo_button" onClick={async () => {
                                    await followUser({
                                        followerId: userInfo.userId,
                                        followeeId: notice.userId,
                                        followTimestamp: new Date().toISOString()
                                    });
                                    const copy = noticesThisMonth.slice()
                                    copy[index]['isFollowed'] = true;
                                    setNoticesThisMonth(copy)
                                }
                                }>
                                    <div>Follow</div>
                                </div>
                        }

                    </div>
                ))}

            </div>
            <div>
                <div style={{fontSize:"0.9rem", fontWeight:"bold", margin:"0.5rem"}}>Earlier</div>
                {noticesEarlier.map((notice,index) => (
                    <div className="reportInfo_detail" key={index}>
                        <div className="reportInfo_avatar">
                            <Avatar sx={{width:"35px", height:"35px"}} src={notice.avatar}/>
                        </div>
                        <div style={{fontSize:"0.9rem"}} className="reportInfo_text">
                            <b>{notice.userName}</b> started following you. <span style={{color:"rgb(154,154,154)", whiteSpace:"no-wrap"}}>&nbsp;{moment(new Date(notice.followTimestamp)).fromNow()}</span>
                        </div>
                        {
                            notice.isFollowed ?
                                <div className="reportInfo_button" style={{backgroundColor:"white", color:"black"}}>
                                    <div>Following</div>
                                </div>
                                :
                                <div className="reportInfo_button" onClick={async () => {
                                    await followUser({
                                        followerId: userInfo.userId,
                                        followeeId: notice.userId,
                                        followTimestamp: new Date().toISOString()
                                    });
                                    const copy = noticesThisMonth.slice()
                                    copy[index]['isFollowed'] = true;
                                    setNoticesThisMonth(copy)
                                }
                                }>
                                    <div>Follow</div>
                                </div>
                        }

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportInfo;