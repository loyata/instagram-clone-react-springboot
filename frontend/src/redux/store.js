import {configureStore} from "@reduxjs/toolkit";
import navbarStatusReducer from "./navbarStatusSlice"
import confirmationReducer from "./confirmationSlice"
import userReducer from "./userSlice"
import postReducer from "./postSlice"
import suggestionReducer from "./suggestionSlice"
import scrollReducer from "./scrollSlice"
import followReducer from "./followSlice"
import postCategoryReducer from "./postCategorySlice"

export const store = configureStore({
    reducer:{
        navbarStatus: navbarStatusReducer,
        confirm: confirmationReducer,
        user:userReducer,
        post:postReducer,
        suggestion:suggestionReducer,
        scroll:scrollReducer,
        follow:followReducer,
        category:postCategoryReducer
    }
})