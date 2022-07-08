import { createSlice } from "@reduxjs/toolkit";
import initialUser from "../data/user";
import userReducer, {userExtraReducer} from "../reducers/userReducer";

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: userReducer,
    extraReducers: userExtraReducer
});

export default userSlice;