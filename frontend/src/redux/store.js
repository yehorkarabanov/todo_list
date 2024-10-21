import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from 'redux-persist/lib/storage';
import {persistCombineReducers} from 'redux-persist';
import taskSlice from "./slices/taskSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // blacklist: ['user']
};

export const store = configureStore({
    reducer: persistCombineReducers(persistConfig, {
        user: userSlice,
        tasks: taskSlice,
    }),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})