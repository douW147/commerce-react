import React, {useState} from "react";
import Login from './login/login.jsx';
import Register from './register/Register.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Page404 from './page404/Page404.jsx';
import Store from "./store/Store.jsx";
import {HashRouter, Route, Switch} from "react-router-dom";
import Navbar from './navbar/Navbar.jsx';
import Products from "./Products/Products.jsx";
import { userContext } from './userContext.js';

function App() {

    const [user, setUser] = useState({
        isLoggedIn: false,
        userId: null,
        userName: null,
        userRole: null
    });

    console.log(user);

    return (
        <userContext.Provider value={{user, setUser}}>
            <HashRouter>
                <Navbar/>
                <div className='container-fluid'>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        {user.isLoggedIn ? <Route path="/dashboard" exact component={Dashboard} /> : 
                        window.location.hash="/"}
                        {user.isLoggedIn ? <Route path="/store" exact component={Store} /> : 
                        window.location.hash="/"}
                        {(user.isLoggedIn && user.userRole === "admin") && <Route path="/products" exact component={Products} /> }
                        <Route path="/register" exact component={Register} />
                        <Route path="*" component={Page404}/>
                    </Switch>
                </div>
            </HashRouter>
        </userContext.Provider>
    );
};

export default App;