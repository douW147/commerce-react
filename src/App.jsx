import React, {useState, useReducer} from "react";
import Login from './components/login/login.jsx';
import Register from './components/register/Register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Page404 from './components/page404/Page404.jsx';
import Store from "./components/store/Store.jsx";
import {HashRouter, Route, Switch} from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import Products from "./components/Products/Products.jsx";
import {useSelector} from "react-redux"

function App() {

    const user = useSelector(state => state.user.data);
    console.log(user)

    return (
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
    );
};

export default App;