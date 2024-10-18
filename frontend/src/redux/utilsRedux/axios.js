import {createAsyncThunk} from "@reduxjs/toolkit";
import {checkAToken} from "../slices/userSlice";
import axios from "axios";
import {baseAxiosSettings} from "../../utils/settings";


export const apiLoginInstance = createAsyncThunk("axios", async (params, {dispatch, getState}) => {
    await dispatch(checkAToken());
    const state = getState();
    if (state.user.isLogin) {
        return axios.create({
            ...baseAxiosSettings,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + state.user.access,
            }
        });
    }
    return null
})