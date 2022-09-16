import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    navbarStatus:{
        homepage: true,
        message: false,
        newPost: false,
        explore: false,
        report: false,
        profile: false
    },
    navbarCache:'',
    showProfile:false,
    inPersonalPage:false
}

const navbarStatusDefault = {
    homepage: false,
    message: false,
    newPost: false,
    explore: false,
    report: false,
    profile: false
}

export const navbarStatusSlice = createSlice({
    name:"status",
    initialState,
    reducers:{
        updateStateOuter: (state) => {

            if (state.navbarCache !== '') {
                state.navbarStatus = {...navbarStatusDefault, [state.navbarCache]:true};
                state.navbarCache = '';
                state.showProfile = false;
            }

            if(state.inPersonalPage) {
                state.showProfile = false;
            }
        },
        updateStateSimple: (state, action) => {
            state.navbarStatus = {...navbarStatusDefault, [action.payload]:true};
            state.navbarCache = '';


            if (action.payload === 'profile') {
                state.inPersonalPage = true;
            }
            else state.inPersonalPage = false;
            // alert(`navigate to ${action.payload}`);
        },
        updateStateComplex: (state, action) => {
            //open
            if(!state.navbarStatus[action.payload]){

                const cache = Object.keys(state.navbarStatus).find(status => state.navbarStatus[status] === true);
                if (cache === 'homepage' || cache === 'message' || cache === 'explore') state.navbarCache = cache;
                if (state.inPersonalPage) state.navbarCache = 'profile'
                state.navbarStatus = {...navbarStatusDefault, [action.payload]: true};
            }
            //close
            else{
                state.navbarStatus = {...navbarStatusDefault, [state.navbarCache]:true};
                state.navbarCache = '';
            }
        },
        updateProfile:(state, action) => {
            // 1: request from non-personal page
            // 2: request from personal page
            if(action.payload === 1) {
                if(state.navbarStatus['profile'] === false){
                    const cache = Object.keys(state.navbarStatus).find(status => state.navbarStatus[status] === true);
                    if (cache === 'homepage' || cache === 'message' || cache === 'explore') state.navbarCache = cache;
                    state.navbarStatus = {...navbarStatusDefault, ['profile']: true};
                    state.showProfile = true;
                }
                else{
                    state.navbarStatus = {...navbarStatusDefault, [state.navbarCache]:true};
                    state.navbarCache = '';
                    state.showProfile = false;
                }
            }else{
                state.showProfile = !state.showProfile;
            }
        },
        closeShowProfile: (state) => {
            state.showProfile = false;
        },
        openShowProfile: (state) => {
            state.showProfile = true
        },
        clearAll:(state) => {
            state.navbarStatus = navbarStatusDefault;
        }

    }
})


export const {updateStateSimple, updateStateComplex, updateStateOuter, updateProfile, closeShowProfile, openShowProfile, clearAll} = navbarStatusSlice.actions;
export default navbarStatusSlice.reducer;