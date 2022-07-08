import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export const loginUserThunk = createAsyncThunk(
    "user/login",
    async(data) => {
        const response = await api.get(`http://localhost:5000/users?email=${data.email}&password=${data.password}`);
        return response.data
    }
);

export const logoutUserThunk = createAsyncThunk(
    "user/logout",
    async() => {
        
    }
);