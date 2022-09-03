import React from 'react';
import {Outlet} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            Page not found!
            <Outlet/>
        </div>
    );
};

export default NotFound;