import {configureStore} from "@reduxjs/toolkit";
import navbarStatusReducer from "./navbarStatusSlice"
import confirmationReducer from "./confirmationSlice"

export const store = configureStore({
    reducer:{
        navbarStatus: navbarStatusReducer,
        confirm: confirmationReducer
    }
})