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
        <nav className="navbar navbar-expand-lg navbar-edited">
            <NavLink className="navbar-brand" to="/dashboard" exact>07-11</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav mr-auto space-between">
                    <div className="logout">
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
                            <div style={renderExpand()} className="dropdown-menu --width1000" aria-labelledby="dropdownMenuButton">
                                <a href="#" className="dropdown-item">{currentUser.user.userName}</a>
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
