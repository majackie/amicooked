import "../style/AppHeader.css"

import logo from "../asset/logo.png"
import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./ProtectedRoute";

/**
 * An AppHeader component that dynamically redirects user to /logout if logged in,
 * or /home if not logged in.
 * This is visible only to users with accounts.
 */
function AppHeader() {
    const navigate = useNavigate();
    return (
        <div className="AppHeader" onClick={() => navigate((isAuthenticated()) ? "/logout" : "/home")}>
            <img src={logo} className="App-logo" alt="logo"/>
            <p className="App-name">
                amicooked
            </p>
        </div>
    );
}

export default AppHeader;