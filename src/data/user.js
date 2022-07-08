import {v4 as uuid} from 'uuid'

const initialUser = {
    data: {
        isLoggedIn: false,
        userId: uuid(),
        userName: "Guest",
        userRole: "guest"
    },
    status: "",
    error: "",
    redirect: ""
};

export default initialUser;