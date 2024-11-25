import "../style/AppHeader.css"

import logo from "../asset/logo.png"
import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./ProtectedRoute";

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