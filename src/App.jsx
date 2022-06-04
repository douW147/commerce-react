import React, {useState} from "react";
import Login from './login/login.jsx';
import Register from './register/Register.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Page404 from './page404/Page404.jsx';
import {HashRouter, Route, Switch} from "react-router-dom";
import Navbar from './navbar/Navbar.jsx';
import { userContext } from './userContext.js';

function App() {

    const [user, setUser] = useState({
        isLoggedIn: false,
        userId: null,
        userName: null
    });

    return (
        <userContext.Provider value={{user, setUser}}>
            <HashRouter>
                <Navbar/>
                <div className='container-fluid'>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        {user.isLoggedIn ? <Route path="/dashboard" exact component={Dashboard} /> : 
                        window.location.hash="/"}
                        <Route path="/register" exact component={Register} />
                        <Route path="*" component={Page404}/>
                    </Switch>
                </div>
            </HashRouter>
        </userContext.Provider>
    );
};

export default App;