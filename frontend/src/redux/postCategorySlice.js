import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    category:0
}

export const postCategorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        updatePostCategory:(state, action) => {
            state.category = action.payload;
        }
    }

})

export const {updatePostCategory} = postCategorySlice.actions;
export default postCategorySlice.reducer;