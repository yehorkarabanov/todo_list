import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    refresh: null,
    access: null,
    userdata: {
        gotten: false,
        username: "",
        email: "",
        phone: "",
        last_name: "",
        name: "",
    },
    isLogin: false,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.refresh = action.payload.refresh;
            state.access = action.payload.access;
            const data = JSON.parse(atob(action.payload.refresh.split('.')[1]));
            state.userdata.username = data.username;
            state.userdata.email = data.email;
            state.isLogin = true;
        },
        logOut(state, action) {
            state.refresh = null;
            state.access = null;
            state.userdata = {
                gotten: false,
                username: "",
                email: "",
                phone: "",
                last_name: "",
                name: "",
            };
            state.isLogin = false;
        },
        setExtraUserData(state, action) {
            state.userdata = {
                username: state.userdata.username,
                email: action.payload.email,
                phone: action.payload.phone,
                last_name: action.payload.last_name,
                name: action.payload.name,
                gotten: true,
            };
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(checkRToken.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(checkRToken.fulfilled, (state) => {
    //             state.loading = false;
    //         })
    //         .addCase(checkRToken.rejected, (state) => {
    //             state.loading = false;
    //         })
    // },

});
export const {setTokens, logOut, setExtraUserData} = userSlice.actions;
export default userSlice.reducer;