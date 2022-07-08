import { loginUserThunk, logoutUserThunk } from "../thunks/userthunk";
import initialUser from "../data/user";

const userReducer = {
    login: (state, action) => {
        console.log(action.payload)
        state.data.isLoggedIn = true;
        state.data.userId = action.payload.userId;
        state.data.userName = action.payload.userName;
        state.data.userRole = action.payload.userRole;
    },

    logout: (state, action) => {
        state.data.isLoggedIn = false;
        state.data.userId = null;
        state.data.userName = null;
        state.data.userRole = null;
    },
};


export default userReducer;