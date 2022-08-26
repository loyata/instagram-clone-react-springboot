import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import "./Footer.css"

const Footer = () => {
    return (
        <div>
                <div className="allTags">
                <span className="tag">Meta</span>
                <span className="tag">About</span>
                <span className="tag">Blog</span>
                <span className="tag">Jobs</span>
                <span className="tag">Help</span>
                <span className="tag">API</span>
                <span className="tag">Privacy</span>
                <span className="tag">Terms</span>
                <span className="tag">Top Accounts</span>
                <span className="tag">Hashtags</span>
                <span className="tag">Locations</span>
                <span className="tag">Instagram Lite</span>
                <span className="tag">Contact Uploading & Non-Users</span>
                <span className="tag">Dance</span>
                <span className="tag">Food & Drink</span>
                <span className="tag">Home & Garden</span>
                <span className="tag">Music</span>
                <span className="tag">Visual Arts</span>
                </div>
                <div className="lineTwo">
                    <select id="selector">
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="fr">Francais</option>
                        <option value="de">Deutsch</option>
                    </select>
                    <div>© 2022 Instagram from Meta</div>
                </div>
        </div>

    );
};




export default Footer;