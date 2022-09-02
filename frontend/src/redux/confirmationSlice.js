import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    showDiscardCard: false
}

export const confirmationSlice = createSlice({
    name:"confirm",
    initialState,
    reducers:{
        update: state => state.showDiscardCard = !state.showDiscardCard
    }
})

export const {update} = confirmationSlice.actions;
export default confirmationSlice.reducer;