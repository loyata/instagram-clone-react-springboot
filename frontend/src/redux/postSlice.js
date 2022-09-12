import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    postInfo:{}
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        updatePost: (state, action) => {
            state.postInfo = action.payload
        }
    }

})

export const {updatePost} = postSlice.actions;
export default postSlice.reducer;