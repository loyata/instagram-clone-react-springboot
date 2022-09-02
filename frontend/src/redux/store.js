import {configureStore} from "@reduxjs/toolkit";
import navbarStatusReducer from "./navbarStatusSlice"

export const store = configureStore({
    reducer:{
        navbarStatus: navbarStatusReducer
    }
})