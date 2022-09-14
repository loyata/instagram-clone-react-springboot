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
        },
        updateSuggestionFollow: (state, action)=>{
            const {index, st} = action.payload;
            state.suggestions[index]['followed'] = !st;
        }
    }

})

export const {updateSuggestion, updateSuggestionFollow} = suggestionSlice.actions;
export default suggestionSlice.reducer;