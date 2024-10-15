import {store} from "../redux/store";
import {checkAToken} from "../redux/slices/userSlice";
import axios from "axios";
import {baseAxiosSettings} from "./axios";

export const apiLoginInstance = async () => {
    await store.dispatch(checkAToken());
    const user = store.getState().user;
    if (user.isLogin) {
        return axios.create({
            ...baseAxiosSettings,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.access,
            }
        });
    }
    return null
};