import {configureStore} from "@reduxjs/toolkit";
import navbarStatusReducer from "./navbarStatusSlice"
import confirmationReducer from "./confirmationSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer:{
        navbarStatus: navbarStatusReducer,
        confirm: confirmationReducer,
        user:userReducer
    }
})