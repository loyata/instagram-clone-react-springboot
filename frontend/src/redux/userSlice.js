import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userName:'',
    userId:-1,
    avatar:'',
    email:'',
    fullName:'',
    website:'',
    bio:'',
    phoneNumber:''
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        update: (state, action) => {
            const {userName, userId, avatar, email, fullName, website, bio, phoneNumber} = action.payload
            state.userName = userName;
            state.userId = userId;
            state.avatar = avatar;
            state.email = email;
            state.fullName = fullName;
            state.website = website;
            state.bio = bio;
            state.phoneNumber = phoneNumber
        }
    }

})

export const {update} = userSlice.actions;
export default userSlice.reducer;