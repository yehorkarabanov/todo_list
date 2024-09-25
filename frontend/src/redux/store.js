import {configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {persistCombineReducers} from 'redux-persist';
import userSlice from "./slices/userSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: ['product']
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        user: userSlice,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})