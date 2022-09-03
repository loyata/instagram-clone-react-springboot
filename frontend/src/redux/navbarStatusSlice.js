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
    navbarCache:''
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
            }
        },
        updateStateSimple: (state, action) => {
            state.navbarStatus = {...navbarStatusDefault, [action.payload]:true};
            state.navbarCache = '';
            // alert(`navigate to ${action.payload}`);
        },
        updateStateComplex: (state, action) => {
            //open
            if(!state.navbarStatus[action.payload]){
                const cache = Object.keys(state.navbarStatus).find(status => state.navbarStatus[status] === true);
                if (cache === 'homepage' || cache === 'message' || cache === 'explore') state.navbarCache = cache;
                state.navbarStatus = {...navbarStatusDefault, [action.payload]: true};
            }
            //close
            else{

                state.navbarStatus = {...navbarStatusDefault, [state.navbarCache]:true};
                state.navbarCache = '';

            }
        }
    }
})


export const {updateStateSimple, updateStateComplex, updateStateOuter} = navbarStatusSlice.actions;
export default navbarStatusSlice.reducer;