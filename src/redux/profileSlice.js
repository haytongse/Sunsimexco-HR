import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    is_login: false,
    profile: null,
    access_token: null,
    refresh_token: null,
    user_email: null,
}
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
        setProfile:(state, action)=>{
            state.is_login= true;
            state.profile = action.payload;
            state.access_token= action.payload.access_token;
        },
        logOut: (state)=>{
            state.is_login = false;
            state.profile = null;
            state.access_token = null;
        },
        setAccessToken: ()=>{

    
        }
    }
});
//action export

export const{
    setProfile,
    logOut,
}= profileSlice.actions;
export default profileSlice.reducer