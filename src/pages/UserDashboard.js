import logo from "../asset/logo.png"
import "../style/UserDashboard.css"

import { useNavigate } from "react-router-dom";
import Button from "../shared/Button"

function UserDashboard() {
    const navigate = useNavigate();
    return (
        <div className="UserDashboard">
            <div className="Header"  onClick={() => navigate("/home")}>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>amicooked</p>
            </div>
            <div className="Body">
                <Button theme="primary">Scan for Leaks</Button>
                <Button theme="primary">Safety Lessons</Button>
                <Button theme="primary">Community Forums</Button>
                <Button theme="primary">Edit Profiles</Button>
                <Button theme="primary">Log Out</Button>
            </div>
        </div>
    );
}

export default UserDashboard;