import userSlice from "../slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const allReducers = {
    user: userSlice.reducer
};

const store = configureStore({
    reducer: allReducers,
    devTools: true,
    middleware: (getDefaultMiddleware) => [ ...getDefaultMiddleware(), logger]
});

export default store;