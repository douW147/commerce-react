import React, {useState, useReducer} from "react";
import Login from './components/login/login.jsx';
import Register from './components/register/Register.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Page404 from './components/page404/Page404.jsx';
import Main from "./components/main/Main.jsx";
import Store from "./components/store/Store.jsx";
import {HashRouter, Route, Switch} from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import Products from "./components/Products/Products.jsx";
import {useSelector} from "react-redux"

function App() {

    const user = useSelector(state => state.user.data);

    return (
            <HashRouter>
                <Navbar/>
                <div className='container-fluid'>
                    <Switch>
                        <Route path="/" exact component={Main}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/dashboard" exact component={Dashboard} />
                        user.isLoggedIn ? <Route path="/store" exact component={Store} /> 
                        {(user.isLoggedIn && user.userRole === "admin") && <Route path="/products" exact component={Products} /> }
                        <Route path="/register" exact component={Register} />
                        <Route path="*" component={Page404}/>
                    </Switch>
                </div>
            </HashRouter>
    );
};

export default App;