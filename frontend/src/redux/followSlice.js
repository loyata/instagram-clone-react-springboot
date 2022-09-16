import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userDidUnfollowed:false,
    isSaved:false,
    formData:{},
    checkNeeded:false
}

export const followSlice = createSlice({
    name:"unfollow",
    initialState,
    reducers:{
        unfollow: state => {
            state.userDidUnfollowed = true
        },
        cancelUnfollow: state => {
            state.userDidUnfollowed = false
        },
        savePostUpdate: state => {
            state.isSaved = true
        },
        unSavePostUpdate: state => {
            state.isSaved = false
        },
        updateFormData: (state, action) => {
            state.formData = action.payload
        },
        updateCheck: state => {
            console.log("check!")
            state.checkNeeded = !state.checkNeeded
        }
    }
})

export const {unfollow, cancelUnfollow, savePostUpdate, unSavePostUpdate, updateFormData, updateCheck} = followSlice.actions;
export default followSlice.reducer;