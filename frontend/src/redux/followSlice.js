import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userDidUnfollowed:false
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
        }
    }
})

export const {unfollow, cancelUnfollow} = followSlice.actions;
export default followSlice.reducer;