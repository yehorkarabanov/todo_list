import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {baseAxiosSettings, USER_PATH} from "../../utils/settings";
import {apiLoginInstance} from "../utilsRedux/axios";

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
        const apiInstance = axios.create(baseAxiosSettings);
        const res = await apiInstance.post("user/refresh", {
            refresh_token: state.user.refresh,
        });
        dispatch(setTokens(res.data));
    }
});

export const fullLogOut = createAsyncThunk("user/fullLogOut", async (params, {dispatch, getState}) => {
    const state = getState();
    try {
        const instance = await dispatch(apiLoginInstance());
        const res = await instance.payload.post(USER_PATH + "/logout", {
            refresh_token: state.user.refresh
        });
        dispatch(logOut());
    } catch (e) {
        console.log("Error while logout");
    }
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