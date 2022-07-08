import { createSlice } from "@reduxjs/toolkit";
import initialUser from "../data/user";
import userReducer from "../reducers/userReducer";

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: userReducer,
});

export default userSlice;