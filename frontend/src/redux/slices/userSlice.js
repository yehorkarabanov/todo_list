import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiInstance from "../../utils/axios";

export const checkRToken = createAsyncThunk('user/checkRToken', async (params, {dispatch, getState}) => {
    const state = getState();
    if (JSON.parse(atob(state.user.refresh.split('.')[1])).exp < Math.floor(Date.now() / 1000)) {
        dispatch(logOut());
    }
});

export const checkAToken = createAsyncThunk('user/checkAToken', async (params, {dispatch, getState}) => {
    await dispatch(checkRToken());
    const state = getState();
    if (JSON.parse(atob(state.user.access.split('.')[1])).exp < Math.floor(Date.now() / 1000)) {
        const res = await apiInstance.post("user/refresh", {
            refresh: state.user.refresh,
        });
        dispatch(setTokens(res.data));
    }
});

export const userlogin = createAsyncThunk('user/userlogin', async (params, {dispatch, getState}) => {
    const res = await apiInstance.post("user/login", {
        email:params.email,
        pasword:params.password,
    });
    console.log(res);
    // dispatch(setTokens(res.data));

});


const initialState = {
    refresh: null,
    access: null,
    email: "",
    isLogin: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.access = action.payload.access_token;
            const data = JSON.parse(atob(action.payload.access_token.split('.')[1]));
            state.email = data.user.email;
            state.isLogin = true;
            if (action.payload.refresh_token) {
                state.refresh = action.payload.refresh_token;
            }
        },
        logOut(state, action) {
            state.refresh = null;
            state.access = null;
            state.email = "";
            state.isLogin = false;
        },
    },
});
export const {setTokens, logOut} = userSlice.actions;
export default userSlice.reducer;