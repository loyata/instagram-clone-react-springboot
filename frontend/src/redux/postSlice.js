import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    postInfo:{},
    postUserInfo:{}, //for usage of Unfollow component
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        updatePost: (state, action) => {
            state.postInfo = action.payload
        },
        updatePostUser: (state, action) => {
            state.postUserInfo = action.payload
        }
    }

})

export const {updatePost, updatePostUser} = postSlice.actions;
export default postSlice.reducer;