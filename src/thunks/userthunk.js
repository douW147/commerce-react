import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export const loginUserThunk = createAsyncThunk(
    "user/login",
    async(user) => {

    }
);


// currentUser.dispatch({
//     type: "login", payload: {
//         userName: responseBody[0].fullName,
//         userId: responseBody[0].id,
//         userRole: responseBody[0].role
//     }
// });
// props.history.replace("/dashboard");
// }
// }


export const logoutUserThunk = createAsyncThunk(
    "user/logout",
    async() => {
        
    }
);