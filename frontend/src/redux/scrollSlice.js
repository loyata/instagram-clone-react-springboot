import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    canScroll:true
}

export const scrollSlice = createSlice({
    name:"scroll",
    initialState,
    reducers:{
        allowScroll:(state) => {
            state.canScroll = true;
        },
        disableScroll:(state) => {
            state.canScroll = false;
        },
    }

})

export const {allowScroll, disableScroll} = scrollSlice.actions;
export default scrollSlice.reducer;