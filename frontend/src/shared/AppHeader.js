import "../style/AppHeader.css"

import logo from "../asset/logo.png"
import React from "react";
import { useNavigate } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    return (
        <div className="AppHeader" onClick={() => navigate("/home")}>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>amicooked</p>
        </div>
    );
}

export default AppHeader;