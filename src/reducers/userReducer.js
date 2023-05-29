import { loginUserThunk } from "../thunks/userthunk";
import  {v4 as uuid } from "uuid"

const userReducer = {
    login: (state, action) => {
        console.log(action.payload)
        state.data.isLoggedIn = true;
        state.data.userId = action.payload.userId;
        state.data.userName = action.payload.userName;
        state.data.userRole = action.payload.userRole;
        state.redirect = "";
    },

    logout: (state, action) => {
        state.data.isLoggedIn = false;
        state.data.userId = uuid();
        state.data.userName = "Guest";
        state.data.userRole = "guest"
        state.redirect = "";
    },
};

export const userExtraReducer = {
    [loginUserThunk.pending]: (state, action) => {
        state.status = action.meta.requestStatus;
        state.redirect = ""
    },

    [loginUserThunk.fulfilled]: (state, action) => {
        state.status = action.meta.requestStatus;
        if (action.payload.length > 0){
            state.data.isLoggedIn = true;
            state.data.userId = action.payload[0].id;
            state.data.userName = action.payload[0].fullName;
            state.data.userRole = action.payload[0].role;
            state.error = ""
            state.redirect = "/"
        } else{
            state.error = "This user does not exist"
            state.redirect = ""
        }
        
    },

    [loginUserThunk.rejected]: (state, action) => {
        state.status = action.meta.requestStatus;
        state.error = action.payload.error;
        state.redirect = ""
    },
}


export default userReducer;