import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    suggestions:[]
}

export const suggestionSlice = createSlice({
    name:"suggestion",
    initialState,
    reducers:{
        updateSuggestion:(state, action) => {
            state.suggestions = action.payload;
        }
    }

})

export const {updateSuggestion} = suggestionSlice.actions;
export default suggestionSlice.reducer;