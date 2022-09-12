import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userName:'',
    userId:-1,
    avatar:'',
    email:'',
    fullName:''
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        update: (state, action) => {
            const {userName, userId, avatar, email, fullName} = action.payload
            state.userName = userName;
            state.userId = userId;
            state.avatar = avatar;
            state.email = email;
            state.fullName = fullName;
        }
    }

})

export const {update} = userSlice.actions;
export default userSlice.reducer;