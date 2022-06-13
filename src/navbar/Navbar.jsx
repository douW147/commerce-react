import React, { Component, useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { userContext } from "../userContext.js";

function Navbar() {
    const [isExpand, setIsExpand] = useState("false");
    const currentUser = useContext(userContext);

    const onDropdownClick = () => {
        if (isExpand === "false"){
            setIsExpand("true");
        } else {
            setIsExpand("false");
        } 
        
    }

    const renderExpand = () => {
        if (isExpand === "true"){
            return {display: "block"}
        } else {
            return {display: "none"}
        }
    };

    const onLogout = (event) => {
        event.preventDefault()
        currentUser.setUser({
            isLoggedIn: false,
            userName: null,
            userId: null
        });
        setIsExpand("false");
        window.location.hash="/";
    }

    return (
        <nav className="navbar navbar-edited justify-content-start">
            <div className="--width100 flex">
                <NavLink className="navbar-brand" to="/dashboard" exact>07-11</NavLink>
                <div className="navbar-nav mr-auto space-between">
                    <div className="items">
                        {currentUser.user.isLoggedIn &&
                        <li className="nav-item">
                            <NavLink to="/dashboard" className="nav-link" activeClassName="active">Dashboard</NavLink>
                        </li>
                        }
                        {currentUser.user.isLoggedIn &&
                        <li className="nav-item">
                            <NavLink to="/store" className="nav-link" activeClassName="active">Store</NavLink>
                        </li>
                        }
                        {(currentUser.user.isLoggedIn && currentUser.user.userRole === "admin") &&
                        <li className="nav-item">
                            <NavLink to="/products" className="nav-link" activeClassName="active">Products</NavLink>
                        </li>
                        }
                        {!currentUser.user.isLoggedIn &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact activeClassName="active">Login</NavLink>
                        </li>
                        }
                        {!currentUser.user.isLoggedIn &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register" exact activeClassName="active">Register</NavLink>
                        </li>
                        }
                    </div>
                    {currentUser.user.isLoggedIn &&
                    <div className="logout">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle --width100" onClick={onDropdownClick} type="button" id="dropdownMenuButton">
                                {currentUser.user.userName}
                            </button>
                            <div style={renderExpand()} className="dropdown-menu-own --width1000" >
                                <a className="dropdown-item">{currentUser.user.userName}</a>
                                <a href="#" className="dropdown-item" onClick={(event) => {onLogout(event)}}>Logout</a>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
